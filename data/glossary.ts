// data/glossary.ts

export type GlossaryCategory = "tech" | "service" | "ai-tool" | "marketplace";
export type GlossaryRegion = "japan" | "global" | "both";

export interface LearningTime {
  firstStep: string;
  basics: string;
  professional: string;
}

export interface GlossaryTerm {
  id: string;
  label: string;
  name: string;
  category: GlossaryCategory;
  summary: string;
  whatYouCanDo: string[];
  beginnerScore: 1 | 2 | 3 | 4 | 5;
  // 技術用語のみ
  learningTime?: LearningTime;
  usedInContext?: string;
  // サービス・ツール系
  targetAudience?: string;
  pricing?: string;
  region?: GlossaryRegion;
  // 全用語（設定があれば表示）
  officialUrl?: string;
  // Phase 2+ 拡張フィールド（現在は未使用）
  guideUrl?: string;
  youtubeUrl?: string;
  articleUrls?: string[];
  affiliateUrl?: string;
}

// ──────────────────────────────────────
// 技術用語（7件）
// ──────────────────────────────────────

export const glossary: GlossaryTerm[] = [
  {
    id: "gas",
    label: "GAS",
    name: "Google Apps Script（GAS）",
    category: "tech",
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
    officialUrl: "https://script.google.com",
  },
  {
    id: "n8n",
    label: "n8n",
    name: "n8n（エヌエイトエヌ）",
    category: "tech",
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
    officialUrl: "https://n8n.io",
  },
  {
    id: "make",
    label: "Make",
    name: "Make（メイク）",
    category: "tech",
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
    officialUrl: "https://www.make.com/en",
  },
  {
    id: "meo",
    label: "MEO",
    name: "MEO（エムイーオー）",
    category: "tech",
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
    category: "tech",
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
    category: "tech",
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
    category: "tech",
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

  // ──────────────────────────────────────
  // 販売プラットフォーム（3件）
  // ──────────────────────────────────────

  {
    id: "booth",
    label: "BOOTH",
    name: "BOOTH（ブース）",
    category: "marketplace",
    summary: "クリエイター向けデジタル商品販売サイト",
    whatYouCanDo: [
      "素材・テンプレ・音楽・電子書籍などのデジタルデータを販売できる",
      "ダウンロード販売なので在庫・配送が一切不要",
      "Pixivアカウントでそのまま登録できる",
      "出品数に制限なく無料で販売を始められる",
    ],
    targetAudience: "デジタル商品を作れるクリエイター・Pixivユーザー・テンプレートや素材を販売したい人",
    beginnerScore: 5,
    pricing: "基本無料。販売手数料5.6%＋決済手数料（振込時）",
    region: "japan",
    officialUrl: "https://booth.pm",
  },
  {
    id: "gumroad",
    label: "Gumroad",
    name: "Gumroad（ガムロード）",
    category: "marketplace",
    summary: "海外向けデジタル商品・コンテンツ販売プラットフォーム",
    whatYouCanDo: [
      "PDF・テンプレ・ソフトウェア・オンラインコースを販売できる",
      "英語圏のクリエイターが多く使用しており、グローバル展開に最適",
      "月額費用なしで無料開始できる",
      "売上・顧客リストをダッシュボードで一元管理できる",
    ],
    targetAudience: "英語コンテンツを販売したい人・グローバルに展開したいクリエイター",
    beginnerScore: 4,
    pricing: "基本無料。販売手数料10%",
    region: "global",
    officialUrl: "https://gumroad.com",
  },
  {
    id: "note",
    label: "note",
    name: "note（ノート）",
    category: "marketplace",
    summary: "文章・画像・音声・動画を販売できる国内プラットフォーム",
    whatYouCanDo: [
      "有料記事・マガジン・メンバーシップを販売できる",
      "無料記事で集客して有料コンテンツへ自然に誘導できる",
      "クリエイターページで自分のブランドを育てられる",
      "フォロワーに向けた定期購読（マガジン）を提供できる",
    ],
    targetAudience: "文章が得意な人・ノウハウを持っている人・ファンをつくりたい人",
    beginnerScore: 5,
    pricing: "基本無料。販売手数料20%（振込手数料別）",
    region: "japan",
    officialUrl: "https://note.com",
  },

  // ──────────────────────────────────────
  // 案件獲得サービス（3件）
  // ──────────────────────────────────────

  {
    id: "crowdworks",
    label: "クラウドワークス",
    name: "クラウドワークス",
    category: "service",
    summary: "日本最大級のフリーランス向け案件マッチングサイト",
    whatYouCanDo: [
      "ライティング・デザイン・テスター・データ入力など多数の案件を受けられる",
      "プロフィールを作れば無料ですぐに応募できる",
      "初心者向けの低単価案件から実績を積み上げられる",
      "評価が積み上がると単価交渉・継続案件につながりやすくなる",
    ],
    targetAudience: "副業・フリーランスとして案件を受けたい人全般。スキルよりやる気重視で始めやすい",
    beginnerScore: 5,
    pricing: "登録無料。成果報酬から手数料20%（高収入帯は段階的に下がる）",
    region: "japan",
    officialUrl: "https://crowdworks.jp",
  },
  {
    id: "lancers",
    label: "ランサーズ",
    name: "ランサーズ",
    category: "service",
    summary: "クラウドワークスと並ぶ国内大手フリーランス案件サイト",
    whatYouCanDo: [
      "ライティング・Web制作・翻訳・データ入力など多数の案件を受けられる",
      "数十円〜のタスク形式から、大きなプロジェクト案件まで幅広く対応",
      "クラウドワークスと並行利用することで応募できる案件数を増やせる",
      "認定ランサー制度でスキル・実績を可視化できる",
    ],
    targetAudience: "副業・フリーランスとして案件を受けたい人全般。クラウドワークスとの併用が定番",
    beginnerScore: 5,
    pricing: "登録無料。成果報酬から手数料16.5%〜",
    region: "japan",
    officialUrl: "https://lancers.jp",
  },
  {
    id: "coconala",
    label: "ココナラ",
    name: "ココナラ",
    category: "service",
    summary: "スキルを「サービスとして出品」できるスキルマーケット",
    whatYouCanDo: [
      "自分のスキルを固定価格のサービスとして出品できる（例：ロゴ作成1万円）",
      "デザイン・文章・相談・アドバイスなど幅広いカテゴリに対応",
      "クライアントから依頼を待つ受動的なスタイルで副業できる",
      "テキスト相談やビデオ通話での相談サービスを提供できる",
    ],
    targetAudience: "特定スキルを持っている人・相談相手として価値を提供したい人・営業が苦手な人",
    beginnerScore: 5,
    pricing: "登録無料。販売手数料22%",
    region: "japan",
    officialUrl: "https://coconala.com",
  },

  // ──────────────────────────────────────
  // AIツール（4件）
  // ──────────────────────────────────────

  {
    id: "chatgpt",
    label: "ChatGPT",
    name: "ChatGPT（チャットジーピーティー）",
    category: "ai-tool",
    summary: "OpenAIが提供する世界最大のAIチャットサービス",
    whatYouCanDo: [
      "文章の作成・校正・翻訳をテキスト入力だけでできる",
      "会議議事録の要約や長文整理をほぼ一瞬でこなせる",
      "副業に使えるアイデア出しや企画書の叩き台を作れる",
      "副業のプロフィール文・提案文・商品説明文を生成できる",
    ],
    targetAudience: "AIを業務・副業に活用したい全ての人。副業初心者が最初に触れるべきツール",
    beginnerScore: 5,
    pricing: "無料プランあり。ChatGPT Plus（月額$20）で最新モデル利用可",
    region: "global",
    officialUrl: "https://chat.openai.com",
  },
  {
    id: "claude",
    label: "Claude",
    name: "Claude（クロード）",
    category: "ai-tool",
    summary: "Anthropicが提供する長文処理・思考が得意なAIアシスタント",
    whatYouCanDo: [
      "長い文書の要約・分析が得意で、PDFの読み込みもできる",
      "コードの作成・レビュー・デバッグを丁寧に行える",
      "自然で読みやすい日本語の文章を生成できる",
      "複雑な質問に対して段階的・論理的に答えてくれる",
    ],
    targetAudience: "長文処理・コード作成・深い分析が必要な人。ChatGPTとの使い分けがおすすめ",
    beginnerScore: 5,
    pricing: "無料プランあり。Claude Pro（月額$20）で高性能モデル利用可",
    region: "global",
    officialUrl: "https://claude.ai",
  },
  {
    id: "gemini",
    label: "Gemini",
    name: "Gemini（ジェミニ）",
    category: "ai-tool",
    summary: "GoogleのAIアシスタント。Googleサービスと連携できる",
    whatYouCanDo: [
      "GmailやGoogleドキュメントと連携した文章作成・整理ができる",
      "Googleドライブ内のファイルを参照しながら回答を生成できる",
      "日本語での自然な文章作成・アイデア出しができる",
      "画像のテキスト読み取りや内容説明ができる",
    ],
    targetAudience: "GmailやGoogleドキュメントをよく使う人。Google Workspaceユーザーに最適",
    beginnerScore: 5,
    pricing: "基本無料。Gemini Advanced（月額2,900円）で最高性能モデル利用可",
    region: "global",
    officialUrl: "https://gemini.google.com",
  },
  {
    id: "suno",
    label: "Suno",
    name: "Suno（スノ）",
    category: "ai-tool",
    summary: "テキストを入力するだけで楽曲を生成するAI音楽ツール",
    whatYouCanDo: [
      "「明るいポップス、歌詞は〇〇」と入力するだけで完成した曲を生成できる",
      "ジャンル・雰囲気・歌詞を指定してオリジナル楽曲を作れる",
      "著作権フリーのBGMを低コスト・短時間で大量制作できる",
      "動画・ゲーム・アプリのBGMを音楽知識なしに制作できる",
    ],
    targetAudience: "音楽を副業・コンテンツに使いたいクリエイター。音楽知識がなくても使える",
    beginnerScore: 5,
    pricing: "無料プランあり（月50回生成）。有料プラン（月$8〜）でより多く生成可能",
    region: "global",
    officialUrl: "https://suno.com",
  },
];

// ──────────────────────────────────────
// 副業IDと関連用語・サービスの紐付けマップ
// ──────────────────────────────────────

export const SIDE_HUSTLE_TERM_MAP: Record<string, string[]> = {
  web_writing: ["seo", "crowdworks"],
  qa_tester: ["crowdworks", "lancers"],
  data_entry: ["crowdworks"],
  lp_creation: ["lp", "coconala"],
  website_creation: ["lp", "seo"],
  nocode_creation: ["make", "n8n", "api"],
  ai_agent: ["chatgpt", "claude"],
  meo_management: ["meo"],
  note_sales: ["note"],
  booth_sales: ["booth"],
  ai_prompt_sales: ["chatgpt", "booth"],
  template_sales: ["booth", "coconala"],
  youtube_bgm: ["suno"],
  blog: ["seo"],
  affiliate: ["seo"],
  ai_tool_sales: ["gumroad", "api"],
  automation_tool: ["gas", "n8n", "make"],
};
