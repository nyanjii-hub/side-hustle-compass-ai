# 診断ロジック設計（タグ＋プロファイル方式）

## 概要

診断の目的は「向いている副業名を当てる」ことではなく、
「ユーザーの行動特性・強みを言語化し、向いている働き方を提示する」こと。

そのため、スコアベースではなく**タグ＋プロファイル方式**を採用する。

---

## アーキテクチャ全体像

```
回答データ
    ↓
[Step 1] タグ付与（回答 → 行動特性タグのセット）
    ↓
[Step 2] プロファイル生成（タグの集計・頻度分析）
    ↓
[Step 3] 働き方タイプスコアリング（プロファイル → 5タイプのスコア）
    ↓
[Step 4] 副業マッチング（タイプ × タグ → ランキング）
    ↓
[Step 5] テキスト生成（強みの言語化・今日やること・ロードマップ）
```

将来的にはStep 2のプロファイルJSON をそのままClaude APIに渡すことで
ルールベースからAIベースへの移行が容易になる。

---

## Step 1: 行動特性タグ定義

### タグ一覧

| タグID | 日本語ラベル | 説明 |
|--------|------------|------|
| `writing` | 文章力 | 文章を書くのが得意・好き |
| `teaching` | 教える力 | 知識・スキルを人に伝えるのが得意 |
| `creative` | 創造力 | アイデアを生み出す・ゼロから作るのが好き |
| `visual` | 視覚センス | デザイン・レイアウト・見た目への感度が高い |
| `systematic` | 仕組み化 | 体系的に整理・仕組みを作るのが得意 |
| `organizing` | 整理整頓 | 情報・モノ・スケジュールを管理するのが得意 |
| `detail_oriented` | 細かさ | 細部を見逃さない・チェックが得意 |
| `analytical` | 分析力 | 論理的に考える・データや情報を整理するのが得意 |
| `research` | 調べる力 | 情報を深掘り・収集するのが得意・好き |
| `patient` | 継続力 | コツコツ長期間続けることが得意 |
| `problem_solving` | 問題解決力 | 課題を発見・解決するのが得意 |
| `collecting` | 収集力 | 情報・データ・コンテンツを集めるのが得意 |
| `helping` | サポート力 | 人をサポート・助けるのが得意 |
| `communicating` | コミュニケーション | 人と話す・伝えることが得意 |
| `technical` | デジタル適性 | PCツール・アプリを使いこなすのが得意 |

### 回避タグ（マッチング除外に使用）

| タグID | 日本語ラベル | 説明 |
|--------|------------|------|
| `sales_averse` | 営業苦手 | 知らない人への売り込みが苦手 |
| `writing_averse` | 文章苦手 | 文章を書くのが苦手・避けたい |
| `technical_averse` | IT苦手 | PC・デジタルツールが苦手 |
| `repetition_averse` | 単純作業苦手 | 同じ作業の繰り返しが苦手 |

---

## Step 2: プロファイル生成

回答から収集したタグを集計し、`UserProfile` を生成する。

```typescript
interface UserProfile {
  tags: Record<string, number>;     // タグID → 出現回数
  aversionTags: Set<string>;        // 回避タグのセット
  purpose: string;                  // 副業の目的（income / growth / independence / creator）
  timeAvailable: string;            // 利用可能時間（limited / moderate / generous / weekend）
  patientLevel: number;             // 継続力レベル（0〜2）
  technicalLevel: number;           // デジタル適性レベル（0〜2）
  writingLevel: number;             // 文章力レベル（0〜2）
}
```

タグの出現回数が多いほど、そのユーザーにとって強い特性とみなす。

---

## Step 3: 働き方タイプスコアリング

### 働き方タイプ定義（5タイプ）

#### 1. 資産構築型
```
説明: じっくりコンテンツを積み上げ、長期的な収入源を作る人
強み: 継続力・文章力・リサーチ力
向いている副業: ブログ・note販売・アフィリエイト・YouTube解説
向いていない場面: すぐに稼ぎたい・対人業務が中心
```

#### 2. 受託スキル型
```
説明: 自分のスキルを使ってクライアントから直接仕事をもらう人
強み: 細かさ・整理力・文章力または技術力
向いている副業: Webライティング・LP制作・QAテスター・データ入力
向いていない場面: 自分のペースで作業したい・クライアント対応が苦手
```

#### 3. 販売・コンテンツ型
```
説明: 自分の知識や成果物を商品化して販売する人
強み: 創造力・教える力・文章力
向いている副業: テンプレート販売・AIプロンプト販売・BOOTH販売・note販売
向いていない場面: 積み上げが必要・即収入が欲しい
```

#### 4. 代行・サポート型
```
説明: 企業や個人の業務を代わりに引き受けてサポートする人
強み: サポート力・整理力・技術力
向いている副業: MEO運用代行・AI活用代行・データ入力
向いていない場面: 単独で完結させたい・人との関わりが苦手
```

#### 5. 自動化・仕組み化型
```
説明: ツールや仕組みを作り、継続的に価値を生み出す人
強み: 技術力・仕組み化・問題解決力
向いている副業: 業務自動化ツール・AIツール販売・ノーコード制作
向いていない場面: 文章が苦手・コツコツより仕組みで解決したい
```

---

### タイプスコア計算ロジック

各タグの出現回数に以下の重み付けを乗算してスコアを算出する。

| タグID | 資産構築型 | 受託スキル型 | 販売・コンテンツ型 | 代行・サポート型 | 自動化・仕組み化型 |
|--------|----------|------------|-----------------|---------------|----------------|
| writing | 3 | 2 | 2 | 0 | 0 |
| teaching | 2 | 0 | 3 | 1 | 0 |
| creative | 1 | 0 | 3 | 0 | 1 |
| visual | 0 | 1 | 2 | 0 | 0 |
| systematic | 1 | 2 | 0 | 1 | 3 |
| organizing | 1 | 2 | 0 | 2 | 1 |
| detail_oriented | 0 | 3 | 0 | 1 | 2 |
| analytical | 2 | 1 | 1 | 0 | 2 |
| research | 3 | 0 | 2 | 0 | 1 |
| patient | 3 | 1 | 2 | 1 | 1 |
| problem_solving | 0 | 1 | 0 | 1 | 3 |
| collecting | 2 | 0 | 2 | 0 | 1 |
| helping | 0 | 0 | 1 | 3 | 1 |
| communicating | 0 | 0 | 1 | 2 | 0 |
| technical | 0 | 1 | 0 | 2 | 3 |

```
スコア計算式:
typeScore[タイプ] = Σ (tags[タグID] × weight[タグID][タイプ])
```

最終的に最もスコアが高いタイプが「向いている働き方タイプ」となる。
2位以降は「サブタイプ」として参考表示に使用できる。

---

## Step 4: 副業マッチング

### マッチングスコア計算

```
sideHustleScore[副業] = 
  typeMatchBonus（タイプが一致なら +20）
  + Σ (tags[タグID] × sideHustleTagWeight[副業][タグID])
  - aversionPenalty（回避タグが一致するたびに -10）
```

- スコアが高い順にランキング表示（上位3〜5件）
- 回避タグでスコアが大きく下がった副業は「おすすめしない副業」として抽出

### マッチング結果の構造

```typescript
interface DiagnosisResult {
  profile: UserProfile;
  primaryType: WorkStyleType;
  secondaryType: WorkStyleType;
  traitLabels: string[];           // 行動特性タグのラベル（表示用）
  strengthText: string;            // 強みの言語化テキスト
  notSuitedText: string;           // 向いていない働き方の説明
  rankedSideHustles: RankedSideHustle[];
  notRecommendedSideHustles: SideHustle[];
  todayAction: string;             // 今日やること（テキスト）
  weekRoadmap: string[];           // 7日間ロードマップ（7要素の配列）
}
```

---

## Step 5: テキスト生成

MVPではルールベースのテンプレート文から生成する。
タグの組み合わせによって、より自然な文章を組み立てる。

### 強みテキストのテンプレート例

```
writing + patient + research → 
「あなたは情報を丁寧に調べ上げ、わかりやすく伝える力があります。
 継続して積み上げることが得意なため、コツコツ成果を出すタイプです。」

technical + systematic + problem_solving → 
「あなたは仕組みを作り、問題を効率的に解決することが得意です。
 デジタルツールを使いこなす力があり、自動化・効率化の分野で力を発揮します。」

helping + communicating + organizing → 
「あなたはサポートが得意で、人の役に立つことに喜びを感じるタイプです。
 整理力もあるため、相手の業務を代わりに引き受ける仕事と相性が良いです。」
```

### 将来のAI連携への移行

Phase 2以降では、以下のJSON を Claude API に渡すだけで高品質なテキスト生成に切り替えられる。

```json
{
  "tags": { "writing": 3, "research": 2, "patient": 2 },
  "aversionTags": ["sales_averse"],
  "primaryType": "asset_builder",
  "purpose": "income_stability",
  "timeAvailable": "moderate"
}
```

---

## 今日やること・7日間ロードマップの生成ロジック

副業タイプ別に「今日やること」と「7日間ロードマップ」をデータとして定義する。
（詳細は `docs/side-hustles.md` の各副業データを参照）

```typescript
// 副業データに today_action と week_roadmap を持たせる
interface SideHustle {
  id: string;
  today_action: string;       // 今日やること（10分〜30分で完了するレベル）
  week_roadmap: string[];     // 7要素（Day1〜Day7の行動）
  // ...
}
```

ランキング1位の副業の `today_action` と `week_roadmap` を結果画面に表示する。

---

## 拡張ポイント

| 将来機能 | 対応設計 |
|---------|---------|
| 詳細診断 | 質問セットを追加するだけでStep 1に組み込める |
| Claude API連携 | Step 2のUserProfile JSONをそのまま投入できる |
| 複数タイプ対応 | primaryType / secondaryType を持たせているため複数提示が容易 |
| A/Bテスト | テンプレート文を差し替えるだけで検証できる |
