// data/work-style-types.ts
import type { WorkStyleType } from "@/lib/types";

export const workStyleTypes: WorkStyleType[] = [
  {
    id: "asset_builder",
    name: "資産構築型",
    emoji: "📚",
    description: "じっくりコンテンツを積み上げ、長期的な収入源を作るタイプです。継続力と情報収集力を武器に、時間をかけて資産を育てることが得意です。",
    strengthSummary: "継続力・文章力・リサーチ力",
    notSuited: "すぐに結果を求める場面や、対人コミュニケーション中心の仕事には向いていません",
  },
  {
    id: "contract_skill",
    name: "受託スキル型",
    emoji: "📋",
    description: "自分のスキルを活かしてクライアントから直接仕事をもらうタイプです。細かさと整理力で、相手から「この人に任せれば安心」と信頼される仕事スタイルです。",
    strengthSummary: "細かさ・整理力・確かな実行力",
    notSuited: "自分のペースだけで作業したい場面や、クライアント対応が一切ない仕事には向いていません",
  },
  {
    id: "content_sales",
    name: "販売・コンテンツ型",
    emoji: "🎨",
    description: "自分の知識や成果物を商品化して販売するタイプです。創造力と教える力で、「作ったものが繰り返し売れる」仕組みを作ることが得意です。",
    strengthSummary: "創造力・教える力・知識の商品化",
    notSuited: "地道な積み上げが苦手な場合や、すぐに安定収入を得たい場面には向いていません",
  },
  {
    id: "support_agent",
    name: "代行・サポート型",
    emoji: "🤝",
    description: "企業や個人の業務を代わりに引き受けてサポートするタイプです。人を助けることへの自然な喜びと整理力で、相手の業務を効率的に代行できます。",
    strengthSummary: "サポート力・整理力・信頼構築",
    notSuited: "人との関わりを完全に避けたい場合や、単独で完結させたいスタイルには向いていません",
  },
  {
    id: "automation_builder",
    name: "自動化・仕組み化型",
    emoji: "⚙️",
    description: "ツールや仕組みを作り、継続的に価値を生み出すタイプです。技術力と問題解決思考で、「一度作れば動き続ける」仕組みを構築することが得意です。",
    strengthSummary: "技術力・仕組み化・問題解決力",
    notSuited: "デジタルツールが苦手な場合や、コツコツした手作業が中心の仕事には向いていません",
  },
];
