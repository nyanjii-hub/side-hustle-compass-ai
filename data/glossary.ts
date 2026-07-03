// data/glossary.ts

export interface LearningTime {
  firstStep: string;
  basics: string;
  professional: string;
}

export interface GlossaryTerm {
  id: string;
  label: string;
  name: string;
  summary: string;
  whatYouCanDo: string[];
  beginnerScore: 1 | 2 | 3 | 4 | 5;
  learningTime: LearningTime;
  usedInContext: string;
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
    whatYouCanDo: [
      "スプレッドシートのデータを自動で整理・転記できる",
      "毎朝9時に自動でGmailを送ることができる",
      "フォームの回答があると自動でSlackに通知できる",
      "Googleカレンダーの予定を自動で処理できる",
    ],
    beginnerScore: 4,
    learningTime: {
      firstStep: "GASエディタを開いて最初のスクリプトを動かすまで：30分〜1時間",
      basics: "メール送信・スプレッドシート操作など基本機能が使えるまで：1〜2週間",
      professional: "クライアント案件を受けられるレベルまで：1〜2ヶ月",
    },
    usedInContext: "この副業ではGASを使って業務を自動化する場面があります。Googleアカウントがあれば無料で始められます。",
  },
  {
    id: "n8n",
    label: "n8n",
    name: "n8n（エヌエイトエヌ）",
    summary: "無料で使えるワークフロー自動化ツール",
    whatYouCanDo: [
      "フォームに回答が届いたら自動でSlackに通知できる",
      "スプレッドシートに新しいデータが入ったら自動でメール送信できる",
      "定期的にWebサイトをチェックして変更があったら通知できる",
      "200以上のサービスをプログラミングなしで連携できる",
    ],
    beginnerScore: 3,
    learningTime: {
      firstStep: "アカウント登録・最初のワークフローを動かすまで：30分〜1時間",
      basics: "メール通知・シートへのデータ転記など基本フローが作れるまで：1〜2週間",
      professional: "クライアントに提供できるレベルまで：1〜2ヶ月",
    },
    usedInContext: "この副業ではn8nを使ってサービス間の連携・自動化フローを作る場面があります。",
  },
  {
    id: "make",
    label: "Make",
    name: "Make（メイク）",
    summary: "視覚的に操作できるワークフロー自動化ツール",
    whatYouCanDo: [
      "Gmailに届いたメールを自動でスプレッドシートに記録できる",
      "ECサイトに注文が入ったら自動で在庫管理表を更新できる",
      "SNSの投稿を複数プラットフォームに同時投稿できる",
      "月1,000回まで無料で自動化フローを実行できる",
    ],
    beginnerScore: 4,
    learningTime: {
      firstStep: "アカウント登録・最初のシナリオを動かすまで：30分〜1時間",
      basics: "基本的な自動化フローが作れるまで：1〜2週間",
      professional: "業務自動化を仕事として受けられるレベルまで：1〜2ヶ月",
    },
    usedInContext: "この副業ではMakeを使って業務フローを自動化する場面があります。n8nと似た機能で日本語情報も豊富です。",
  },
  {
    id: "meo",
    label: "MEO",
    name: "MEO（エムイーオー）",
    summary: "Googleマップ上での検索順位を上げる対策",
    whatYouCanDo: [
      "「近くの美容院」で検索したときにお店を上位に表示させられる",
      "Googleマップのプロフィールを最適化して来店数を増やせる",
      "口コミを集める仕組みを整えてお店の評価を上げられる",
      "飲食店・美容院・歯科医院など地域ビジネスの集客を支援できる",
    ],
    beginnerScore: 4,
    learningTime: {
      firstStep: "Googleビジネスプロフィールの仕組みを理解するまで：1〜2時間",
      basics: "基本的な最適化作業（写真・情報更新）ができるまで：3〜5日",
      professional: "クライアントに月額で提供できるレベルまで：2〜4週間",
    },
    usedInContext: "この副業の主な業務はMEO対策です。Googleマップで地域ビジネスを上位表示させる方法を学ぶ必要があります。",
  },
  {
    id: "seo",
    label: "SEO",
    name: "SEO（エスイーオー）",
    summary: "Google検索で上位に表示されるための対策",
    whatYouCanDo: [
      "「副業 始め方」で検索したときに自分のブログを上位に出せる",
      "どんなキーワードで記事を書けばアクセスが増えるかを判断できる",
      "記事の見出し・構成を検索エンジンに評価されやすく整えられる",
      "ブログやアフィリエイトで検索からの継続的な集客を実現できる",
    ],
    beginnerScore: 3,
    learningTime: {
      firstStep: "検索エンジンの仕組みと基本用語を理解するまで：1〜2時間",
      basics: "キーワード選定・記事構成ができるまで：1〜2週間",
      professional: "実際に検索上位を取れるレベルまで：3〜6ヶ月（実践が必要）",
    },
    usedInContext: "この副業ではSEOの知識が収入に直結します。どんなキーワードで書けばアクセスが集まるかを学ぶ必要があります。",
  },
  {
    id: "lp",
    label: "LP",
    name: "LP（ランディングページ）",
    summary: "商品・サービスの購入に特化した1枚のWebページ",
    whatYouCanDo: [
      "セミナーへの申し込みを集めるページを作れる",
      "オンライン講座・デジタル商品を販売するページを作れる",
      "通販サイトや資料請求ページを作れる",
      "STUDIOやWixなどノーコードツールで制作できる",
    ],
    beginnerScore: 3,
    learningTime: {
      firstStep: "LPの構成要素と役割を理解するまで：1〜2時間",
      basics: "ノーコードツールで1枚のLPが作れるまで：1〜2週間",
      professional: "仕事として受けられるクオリティのLPを作れるまで：1〜2ヶ月",
    },
    usedInContext: "この副業ではLPの制作・改善を行います。構成・デザインの基礎を学ぶと案件獲得が早くなります。",
  },
  {
    id: "api",
    label: "API",
    name: "API（エーピーアイ）",
    summary: "サービス同士を繋ぐための「接続口」",
    whatYouCanDo: [
      "ChatGPTの機能を自分のスプレッドシートに組み込める",
      "天気情報を取得して自動でLINEに送れる",
      "ECサイトの在庫データを他のシステムと自動で同期できる",
      "n8nやMakeを使えばプログラミングなしでAPIを活用できる場合もある",
    ],
    beginnerScore: 2,
    learningTime: {
      firstStep: "APIとは何かを理解するまで：30分〜1時間",
      basics: "n8n・Makeを使ってAPIを呼び出せるまで：1〜2週間",
      professional: "プログラムからAPIを自在に使えるレベルまで：2〜4ヶ月",
    },
    usedInContext: "この副業ではAPIを使ってサービス同士を連携させる場面があります。まず概念だけ理解しておけばOKです。",
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
