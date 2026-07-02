# 質問一覧

## 設計方針

- 「あなたの強みは何ですか？」のような抽象的な自己評価は避ける
- ユーザーが過去の事実・行動を思い出して答えられる質問にする
- 選択式（カード形式）を基本とし、自由入力は使わない
- 全12問・5分以内で完了できる量にする
- 将来の詳細診断用質問は別ファイルで管理する

---

## 質問一覧

### Q1: 子どもの頃、放課後や休みに自然とやっていたことは？

> 過去の行動から根底にある傾向を見る

| 選択肢 | 付与タグ |
|-------|---------|
| A. 図工・工作・絵を描く | `creative`, `visual` |
| B. 本を読む・図鑑や辞典で調べ物をする | `research`, `analytical`, `collecting` |
| C. 友達の相談に乗る・話を聞く | `helping`, `communicating` |
| D. ゲームやパズルを攻略する | `problem_solving`, `systematic` |
| E. 集めたり記録したりする（切手・カードなど） | `collecting`, `detail_oriented`, `patient` |

---

### Q2: 休日に何も予定がないとき、気づいたらやっていることは？

> 現在の自然な行動パターンを見る

| 選択肢 | 付与タグ |
|-------|---------|
| A. ネットで気になることを調べ続ける | `research`, `analytical` |
| B. 部屋の整理や収納の仕組みを考える | `organizing`, `systematic` |
| C. 何かを作ったり描いたりする | `creative`, `visual` |
| D. 文章を書く・ブログや日記をつける | `writing`, `patient` |
| E. 知人・友人に連絡をとって話す | `communicating`, `helping` |

---

### Q3: 職場や友人から「よく頼まれること」は？

> 他者からの評価で客観的な強みを見る

| 選択肢 | 付与タグ |
|-------|---------|
| A. 情報収集・資料まとめ | `research`, `organizing`, `detail_oriented` |
| B. 文章の確認・添削 | `writing`, `detail_oriented` |
| C. パソコン・アプリの操作サポート | `technical`, `problem_solving` |
| D. 悩みや相談を聞く | `helping`, `communicating` |
| E. スケジュール管理・段取り | `organizing`, `systematic` |

---

### Q4: 仕事でよく任される役割は？

> 職場での評価から実際の強みを見る

| 選択肢 | 付与タグ |
|-------|---------|
| A. 資料作成・レポートのまとめ | `writing`, `organizing` |
| B. チェック・確認・品質管理 | `detail_oriented`, `analytical`, `systematic` |
| C. 新しいツール・システムの検証・導入 | `technical`, `problem_solving` |
| D. 後輩・メンバーのサポート・指導 | `teaching`, `communicating` |
| E. 企画・アイデア出し・提案 | `creative`, `analytical` |

---

### Q5: 副業で「絶対やりたくない」ことは？

> 回避タグの付与に使用する（向いていない副業の絞り込みに使う）

| 選択肢 | 付与タグ |
|-------|---------|
| A. 知らない人への営業・売り込み | `sales_averse` |
| B. 毎日同じ単純作業の繰り返し | `repetition_averse` |
| C. 文章を大量に書く作業 | `writing_averse` |
| D. PC・デジタルツールをたくさん使う作業 | `technical_averse` |
| E. どれも我慢できる（特になし） | （タグなし） |

---

### Q6: これまでお金や時間を一番使ってきたものは？

> 自覚していない情熱・関心領域を見る

| 選択肢 | 付与タグ |
|-------|---------|
| A. 趣味・習い事（音楽・スポーツ・料理など） | `creative`, `patient` |
| B. 本・セミナー・資格・勉強 | `research`, `analytical`, `teaching` |
| C. ガジェット・デジタルツール・アプリ | `technical`, `systematic` |
| D. 旅行・体験・人との交流 | `communicating`, `creative` |
| E. データ管理・記録・コレクション | `collecting`, `detail_oriented`, `organizing` |

---

### Q7: 文章を書くことへの得意度は？

> 文章系副業とのマッチングに直接使用する

| 選択肢 | 付与タグ |
|-------|---------|
| A. 得意で好き | `writing`（重み 2） |
| B. 苦手ではない・まあまあ | `writing`（重み 1） |
| C. どちらでもない | （タグなし） |
| D. 苦手・なるべく避けたい | `writing_averse` |

---

### Q8: パソコン・デジタルツールの得意度は？

> IT系・ノーコード・AI系副業とのマッチングに使用する

| 選択肢 | 付与タグ |
|-------|---------|
| A. 得意（新しいツールもすぐ使いこなせる） | `technical`（重み 2） |
| B. 普通（ビジネス用途は問題ない） | `technical`（重み 1） |
| C. やや苦手（基本操作はできる） | （タグなし） |
| D. 苦手（PCはほぼ使わない） | `technical_averse` |

---

### Q9: 副業に使える時間（1日あたり平均）は？

> 副業タイプ別の現実的な選択肢を絞るために使用する

| 選択肢 | UserProfileへの設定 |
|-------|------------------|
| A. 30分〜1時間 | `timeAvailable: "limited"` |
| B. 1〜2時間 | `timeAvailable: "moderate"` |
| C. 3時間以上 | `timeAvailable: "generous"` |
| D. 平日は難しい、休日にまとめて | `timeAvailable: "weekend"` |

---

### Q10: 副業を始める一番の目的は？

> ロードマップ・今日やることのメッセージトーンを調整するために使用する

| 選択肢 | UserProfileへの設定 |
|-------|------------------|
| A. 月数万円の安定した収入が欲しい | `purpose: "income_stability"` |
| B. スキルアップしながら稼ぎたい | `purpose: "growth"` |
| C. 将来的に独立・自由な働き方がしたい | `purpose: "independence"` |
| D. 自分の作品・コンテンツを世に出したい | `purpose: "creator"` |

---

### Q11: 自分の「継続力」をどう評価する？

> patient タグの重みと「資産構築型」スコアに影響する

| 選択肢 | 付与タグ / UserProfileへの設定 |
|-------|------------------------------|
| A. コツコツ続けるのが得意 | `patient`（重み 2）、`patientLevel: 2` |
| B. 結果が見え始めると続けられる | `patient`（重み 1）、`patientLevel: 1` |
| C. 最初は頑張るが飽きやすい | `patientLevel: 0` |

---

### Q12: 細かいチェック・確認作業への得意度は？

> QAテスター・データ入力・受託スキル型とのマッチングに使用する

| 選択肢 | 付与タグ |
|-------|---------|
| A. 得意でよく任される | `detail_oriented`（重み 2）, `analytical` |
| B. 普通（必要であればできる） | `detail_oriented`（重み 1） |
| C. 苦手・向いていない | （タグなし） |

---

## 質問フロー

全12問を固定順で表示する（MVPでは分岐なし）。

```
Q1 → Q2 → Q3 → Q4 → Q5 → Q6 → Q7 → Q8 → Q9 → Q10 → Q11 → Q12 → 結果へ
```

### 将来の詳細診断（Phase 2以降）
- 「もっと詳しく分析する」ボタンで追加質問（10問程度）に進む
- 追加質問はYouTube系・技術系・コーチング系など専門分野を深掘りする内容

---

## タグ付与ロジックの実装イメージ

```typescript
// questions.ts（データファイル）
const questions: Question[] = [
  {
    id: "q1",
    text: "子どもの頃、放課後や休みに自然とやっていたことは？",
    options: [
      { id: "q1_a", text: "図工・工作・絵を描く", tags: ["creative", "visual"] },
      { id: "q1_b", text: "本を読む・調べ物をする", tags: ["research", "analytical", "collecting"] },
      { id: "q1_c", text: "友達の相談に乗る", tags: ["helping", "communicating"] },
      { id: "q1_d", text: "ゲームやパズルを攻略する", tags: ["problem_solving", "systematic"] },
      { id: "q1_e", text: "収集・記録をする", tags: ["collecting", "detail_oriented", "patient"] },
    ]
  },
  // ...
];

// lib/tagging.ts（ロジックファイル）
function collectTags(answers: Answer[]): Record<string, number> {
  const tagCounts: Record<string, number> = {};
  for (const answer of answers) {
    const tags = answer.option.tags;
    const weight = answer.option.weight ?? 1;
    for (const tag of tags) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + weight;
    }
  }
  return tagCounts;
}
```
