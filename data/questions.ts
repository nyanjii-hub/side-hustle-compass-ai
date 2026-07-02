// data/questions.ts
import type { Question } from "@/lib/types";

export const questions: Question[] = [
  {
    id: "q1",
    text: "子どもの頃、放課後や休みに自然とやっていたことは？",
    options: [
      { id: "q1_a", text: "図工・工作・絵を描く", tags: ["creative", "visual"] },
      { id: "q1_b", text: "本を読む・調べ物をする", tags: ["research", "analytical", "collecting"] },
      { id: "q1_c", text: "友達の相談に乗る・話を聞く", tags: ["helping", "communicating"] },
      { id: "q1_d", text: "ゲームやパズルを攻略する", tags: ["problem_solving", "systematic"] },
      { id: "q1_e", text: "収集や記録をする（切手・カードなど）", tags: ["collecting", "detail_oriented", "patient"] },
    ],
  },
  {
    id: "q2",
    text: "休日に何も予定がないとき、気づいたらやっていることは？",
    options: [
      { id: "q2_a", text: "ネットで気になることを調べ続ける", tags: ["research", "analytical"] },
      { id: "q2_b", text: "部屋の整理や仕組みを考える", tags: ["organizing", "systematic"] },
      { id: "q2_c", text: "何かを作ったり描いたりする", tags: ["creative", "visual"] },
      { id: "q2_d", text: "文章を書く・ブログや日記をつける", tags: ["writing", "patient"] },
      { id: "q2_e", text: "知人・友人に連絡をとって話す", tags: ["communicating", "helping"] },
    ],
  },
  {
    id: "q3",
    text: "職場や友人から「よく頼まれること」は？",
    options: [
      { id: "q3_a", text: "情報収集・資料まとめ", tags: ["research", "organizing", "detail_oriented"] },
      { id: "q3_b", text: "文章の確認・添削", tags: ["writing", "detail_oriented"] },
      { id: "q3_c", text: "パソコン・アプリの操作サポート", tags: ["technical", "problem_solving"] },
      { id: "q3_d", text: "悩みや相談を聞く", tags: ["helping", "communicating"] },
      { id: "q3_e", text: "スケジュール管理・段取り", tags: ["organizing", "systematic"] },
    ],
  },
  {
    id: "q4",
    text: "仕事でよく任される役割は？",
    options: [
      { id: "q4_a", text: "資料作成・レポートのまとめ", tags: ["writing", "organizing"] },
      { id: "q4_b", text: "チェック・確認・品質管理", tags: ["detail_oriented", "analytical", "systematic"] },
      { id: "q4_c", text: "新しいツール・システムの検証・導入", tags: ["technical", "problem_solving"] },
      { id: "q4_d", text: "後輩・メンバーの指導・サポート", tags: ["teaching", "communicating"] },
      { id: "q4_e", text: "企画・アイデア出し・提案", tags: ["creative", "analytical"] },
      { id: "q4_f", text: "資料・プレゼンの見た目を整える", tags: ["visual", "organizing"] },
    ],
  },
  {
    id: "q5",
    text: "副業で「やりたくないこと」は？（複数選択可）",
    multiSelect: true,
    options: [
      { id: "q5_a", text: "知らない人への営業・売り込み", tags: [], aversionTags: ["sales_averse"] },
      { id: "q5_b", text: "毎日同じ単純作業の繰り返し", tags: [], aversionTags: ["repetition_averse"] },
      { id: "q5_c", text: "文章を大量に書く作業", tags: [], aversionTags: ["writing_averse"] },
      { id: "q5_d", text: "PCやデジタルツールをたくさん使う作業", tags: [], aversionTags: ["technical_averse"] },
      { id: "q5_e", text: "特になし（どれも我慢できる）", tags: [], aversionTags: [] },
    ],
  },
  {
    id: "q6",
    text: "これまでお金や時間を一番使ってきたものは？",
    options: [
      { id: "q6_a", text: "趣味・習い事（音楽・スポーツ・料理など）", tags: ["creative", "patient"] },
      { id: "q6_b", text: "本・セミナー・資格・勉強", tags: ["research", "analytical", "teaching"] },
      { id: "q6_c", text: "ガジェット・デジタルツール・アプリ", tags: ["technical", "systematic"] },
      { id: "q6_d", text: "旅行・体験・人との交流", tags: ["communicating", "creative"] },
      { id: "q6_e", text: "データ管理・記録・コレクション", tags: ["collecting", "detail_oriented", "organizing"] },
    ],
  },
  {
    id: "q7",
    text: "文章を書くことへの得意度は？",
    options: [
      { id: "q7_a", text: "得意で好き", tags: ["writing"], weight: 2 },
      { id: "q7_b", text: "苦手ではない・まあまあ", tags: ["writing"], weight: 1 },
      { id: "q7_c", text: "どちらでもない", tags: [] },
      { id: "q7_d", text: "苦手・なるべく避けたい", tags: [], aversionTags: ["writing_averse"] },
    ],
  },
  {
    id: "q8",
    text: "パソコン・デジタルツールの得意度は？",
    options: [
      { id: "q8_a", text: "得意（新しいツールもすぐ使いこなせる）", tags: ["technical"], weight: 2 },
      { id: "q8_b", text: "普通（ビジネス用途は問題ない）", tags: ["technical"], weight: 1 },
      { id: "q8_c", text: "やや苦手（基本操作はできる）", tags: [] },
      { id: "q8_d", text: "苦手（PCはほぼ使わない）", tags: [], aversionTags: ["technical_averse"] },
    ],
  },
  {
    id: "q9",
    text: "副業に使える時間（1日あたり平均）は？",
    options: [
      { id: "q9_a", text: "30分〜1時間", tags: [] },
      { id: "q9_b", text: "1〜2時間", tags: [] },
      { id: "q9_c", text: "3時間以上", tags: [] },
      { id: "q9_d", text: "平日は難しい・休日にまとめて", tags: [] },
    ],
  },
  {
    id: "q10",
    text: "副業を始める一番の目的は？",
    options: [
      { id: "q10_a", text: "月数万円の安定した収入が欲しい", tags: [] },
      { id: "q10_b", text: "スキルアップしながら稼ぎたい", tags: [] },
      { id: "q10_c", text: "将来的に独立・自由な働き方がしたい", tags: [] },
      { id: "q10_d", text: "自分の作品・コンテンツを世に出したい", tags: [] },
    ],
  },
  {
    id: "q11",
    text: "自分の「継続力」をどう評価する？",
    options: [
      { id: "q11_a", text: "コツコツ続けるのが得意", tags: ["patient"], weight: 2 },
      { id: "q11_b", text: "結果が見え始めると続けられる", tags: ["patient"], weight: 1 },
      { id: "q11_c", text: "最初は頑張るが飽きやすい", tags: [] },
    ],
  },
  {
    id: "q12",
    text: "細かいチェック・確認作業への得意度は？",
    options: [
      { id: "q12_a", text: "得意でよく任される", tags: ["detail_oriented", "analytical"], weight: 2 },
      { id: "q12_b", text: "普通（必要であればできる）", tags: ["detail_oriented"], weight: 1 },
      { id: "q12_c", text: "苦手・向いていない", tags: [] },
    ],
  },
];
