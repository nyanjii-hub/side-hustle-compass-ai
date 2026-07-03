// data/glossary.ts

export interface GlossaryTerm {
  id: string;
  label: string;
  name: string;
  summary: string;
  whatYouCanDo: string;
  beginnerScore: 1 | 2 | 3 | 4 | 5;
  learningTime: string;
  // 将来拡張用（Phase 2で追加予定）
  officialUrl?: string;
  youtubeUrl?: string;
  articleUrls?: string[];
}

export const glossary: GlossaryTerm[] = [
  {
    id: "gas",
    label: "GAS",
    name: "Google Apps Script（GAS）",
    summary: "Googleが無料で提供する自動化ツール",
    whatYouCanDo:
      "Gmail・スプレッドシート・カレンダーなどGoogle製品を自動操作できる。「毎朝メールをまとめる」「フォームの回答を自動で整理する」といった定型作業を自動化するのに使われる。",
    beginnerScore: 4,
    learningTime: "基本操作なら1〜2週間",
  },
  {
    id: "n8n",
    label: "n8n",
    name: "n8n（エヌエイトエヌ）",
    summary: "無料で使えるワークフロー自動化ツール",
    whatYouCanDo:
      "Gmail・Slack・Notion・スプレッドシートなど200以上のサービスを繋いで、作業を自動化できる。「フォームに回答が来たら自動でSlackに通知する」といった仕組みをプログラミングなしで作れる。",
    beginnerScore: 3,
    learningTime: "基本操作なら2〜4週間",
  },
  {
    id: "make",
    label: "Make",
    name: "Make（メイク）",
    summary: "視覚的に操作できるワークフロー自動化ツール",
    whatYouCanDo:
      "アプリ同士を繋いで作業を自動化できる。n8nに似た機能だが、画面が分かりやすく日本語情報も多い。月1,000回まで無料で使える。副業では「クライアントの業務を代わりに自動化する」仕事で使われることが多い。",
    beginnerScore: 4,
    learningTime: "基本操作なら1〜2週間",
  },
  {
    id: "meo",
    label: "MEO",
    name: "MEO（エムイーオー）",
    summary: "Googleマップ上での検索順位を上げる対策",
    whatYouCanDo:
      "「近くの美容院」「渋谷 居酒屋」などGoogleマップで検索したときに、お店が上位に表示されるよう最適化する作業。飲食店・美容院・歯科医院などの地域ビジネスが主なクライアントになる。",
    beginnerScore: 4,
    learningTime: "基本的な知識なら1週間、実務は実践で身につく",
  },
  {
    id: "seo",
    label: "SEO",
    name: "SEO（エスイーオー）",
    summary: "Google検索で上位に表示されるための対策",
    whatYouCanDo:
      "「副業 始め方」などのキーワードでGoogle検索したときに、自分のブログや記事が上位に出るよう最適化する取り組み。ブログ・アフィリエイト・Webライティングで欠かせない知識。",
    beginnerScore: 3,
    learningTime: "基礎知識は1〜2週間、成果が出るまでは3〜6ヶ月",
  },
  {
    id: "lp",
    label: "LP",
    name: "LP（ランディングページ）",
    summary: "商品・サービスの購入に特化した1枚のWebページ",
    whatYouCanDo:
      "「申し込みボタン」に向けて縦にスクロールする、1つの目的だけに絞ったWebページのこと。通販サイト・セミナー申込・資料請求などで使われる。作成の仕事はクラウドソーシングでも案件が多い。",
    beginnerScore: 3,
    learningTime: "ツール使用なら2〜4週間、コーディングなら2〜3ヶ月",
  },
  {
    id: "api",
    label: "API",
    name: "API（エーピーアイ）",
    summary: "サービス同士を繋ぐための「接続口」",
    whatYouCanDo:
      "「天気情報をアプリで表示する」「ChatGPTの機能を自分のサービスに組み込む」といったことができる仕組み。プログラミングと組み合わせて使うが、最近はn8nやMakeなどのツールからAPIを使う方法もある。",
    beginnerScore: 2,
    learningTime: "概念理解は1週間、実際に使えるようになるまで1〜3ヶ月",
  },
];

// 副業IDと関連用語の紐付けマップ
export const SIDE_HUSTLE_TERM_MAP: Record<string, string[]> = {
  web_writing: ["seo"],
  lp_creation: ["lp"],
  website_creation: ["lp", "seo"],
  nocode_creation: ["make", "n8n", "api"],
  ai_agent: ["api", "n8n", "make"],
  meo_management: ["meo", "seo"],
  ai_prompt_sales: ["api"],
  blog: ["seo"],
  affiliate: ["seo"],
  ai_tool_sales: ["api"],
  automation_tool: ["gas", "n8n", "make"],
};
