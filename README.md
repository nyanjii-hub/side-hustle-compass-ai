# 副業コンパスAI

副業を「診断」するのではなく、あなたの行動特性・強みを言語化して、向いている副業と最初の一歩を提案するWebアプリです。

## デモURL

**https://side-hustle-compass-ai.vercel.app/**

登録不要・完全無料・スマホ対応

---

## サービス概要

30〜50代の会社員で「副業を始めたいけど何から始めればいいかわからない」という方向けに作られたWebアプリです。

12問の選択式質問に答えるだけで、AIが自分でも気づいていない行動特性・強みを言語化し、向いている副業とその日から実行できる具体的なアクションを提案します。

- **対象ユーザー**：副業初心者・AI初心者・営業が苦手な会社員
- **所要時間**：約5分
- **価格**：完全無料・登録不要

---

## 主な機能

| 機能 | 説明 |
|------|------|
| 行動特性の言語化 | 12問の回答から「文章力」「継続力」「細かさ」など強みタグを抽出・表示 |
| 無意識にできていることの言語化 | 働き方タイプ×強みの組み合わせから、自分でも気づいていない強みをテキストで提示 |
| 働き方タイプ判定 | 5タイプ（資産構築型・受託スキル型・販売コンテンツ型・代行サポート型・自動化仕組み化型）から最適なタイプを判定 |
| おすすめ副業ランキング | 18種類の副業をスコアリングして上位5件を理由付きで提示 |
| おすすめしない副業 | 苦手・不向きな副業2件を理由付きで明示 |
| 今日やること | その日すぐに実行できる具体的なアクション1つを最上部に表示 |
| 7日間ロードマップ | 最初の1週間で取り組む行動計画をDay 1〜Day 7で提示 |
| Xシェア | 診断結果をワンタップでXにシェア |
| やり直し機能 | 「もう一度診断する」で最初からやり直し可能 |

---

## 使用技術

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js 16.2.10（App Router） |
| 言語 | TypeScript（strict mode） |
| スタイリング | Tailwind CSS v4 |
| テスト | Vitest |
| デプロイ | Vercel |
| データ保持 | localStorage（登録不要） |
| 将来的に | Anthropic Claude API（Phase 2） |

---

## 診断ロジックの概要

ルールベースの5ステップパイプラインで動作します。

```
回答 → タグ付与 → スコアリング → タイプ判定 → 副業マッチング → 結果生成
```

### 1. タグ付与（`lib/tagging.ts`）
12問の回答から15種類の行動タグ（`writing`, `research`, `patient` など）と4種類の苦手タグ（`sales_averse` など）を集計し、UserProfile を生成します。

### 2. スコアリング（`lib/scoring.ts`）
15タグ × 5タイプの重みマトリクスで各タイプのスコアを計算し、最高値を100に正規化します。最スコアのタイプを primaryType、2位を secondaryType とします。

### 3. 強みテキスト生成（`lib/strength-text.ts`）
primaryType と上位タグの組み合わせからテンプレートを選択し、「無意識にできていること」として言語化します。

### 4. 副業マッチング（`lib/matching.ts`）
18種類の副業を以下の式でスコアリングして順位付けします。
- タイプ一致ボーナス: +20
- タグ一致スコア: タグ値 × 2（マッチタグ分累積）
- 苦手タグペナルティ: -15（一致する苦手タグごと）

### 5. 結果統合（`lib/result-generator.ts`）
上記すべてを統合し、`DiagnosisResult` オブジェクトとして localStorage に保存。結果ページで読み込んで表示します。

> Phase 2 では UserProfile JSON を Claude API に渡し、より精度の高い自然言語での強み分析を実装予定です。

---

## ローカル起動方法

```bash
# リポジトリをクローン
git clone https://github.com/nyanjii-hub/side-hustle-compass-ai.git
cd side-hustle-compass-ai

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

http://localhost:3000 で起動します。

---

## テスト実行方法

```bash
# 全テストを実行（21テスト）
npm test

# ウォッチモードで実行
npm run test:watch

# TypeScriptの型チェック
npx tsc --noEmit

# ESLintチェック
npm run lint

# プロダクションビルド確認
npm run build
```

### テストカバレッジ

| テストファイル | テスト数 | 対象 |
|--------------|---------|------|
| `lib/tagging.test.ts` | 9 | タグ付与・プロファイル生成ロジック |
| `lib/scoring.test.ts` | 6 | スコアリング・タイプ判定ロジック |
| `lib/matching.test.ts` | 4 | 副業マッチング・ランキングロジック |
| `lib/result-generator.test.ts` | 2 | 結果生成パイプライン統合 |
| **合計** | **21** | |

---

## 今後の改善予定

### Phase 2（3〜6ヶ月）
- Claude API 連携による AI 強み分析（UserProfile JSON をそのまま渡す設計済み）
- 英語版での Gumroad グローバル展開
- B2B 向け診断ツール展開

### 機能追加候補
- 診断結果の PDF 出力・保存
- 副業ごとの詳細ガイドページ
- ユーザー属性（年代・職種）による推薦精度向上
- A/B テストによる質問・結果表示の最適化
- 診断履歴の管理（アカウント機能）

---

## 設計ドキュメント

| ドキュメント | 内容 |
|-------------|------|
| [PROJECT.md](PROJECT.md) | プロジェクト概要・目的・フェーズ計画 |
| [docs/requirements.md](docs/requirements.md) | 要件定義 |
| [docs/screen-design.md](docs/screen-design.md) | 画面設計 |
| [docs/diagnosis-logic.md](docs/diagnosis-logic.md) | 診断ロジック詳細 |
| [docs/questions.md](docs/questions.md) | 質問一覧・タグマッピング |
| [docs/side-hustles.md](docs/side-hustles.md) | 副業データ一覧（18種） |
