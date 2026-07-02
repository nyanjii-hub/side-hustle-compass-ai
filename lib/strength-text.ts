import type { WorkStyleTypeId, TagId } from "./types";

type TemplateKey = string;

const TEMPLATES: Record<WorkStyleTypeId, Record<TemplateKey, string>> = {
  asset_builder: {
    "writing+research": "じっくりと情報を調べ上げ、わかりやすく伝える文章力があります。コツコツ積み上げることで、長期的に価値を生み出すタイプです。",
    "writing+patient": "継続して書き続ける力と文章力があります。資産を少しずつ積み上げていくスタイルが最も力を発揮します。",
    "research+patient": "深掘りする探求心と粘り強さが強みです。調べて積み上げることで、独自のコンテンツ資産を作れます。",
    default: "コツコツと成果を積み上げ、長期的に価値を生み出すタイプです。資産が積み重なるにつれて力を発揮します。",
  },
  contract_skill: {
    "detail_oriented+writing": "細かいことを見逃さない観察力と、わかりやすく整理する文章力があります。クライアントから「この人に任せれば安心」と思われるタイプです。",
    "detail_oriented+systematic": "精密さと体系的な思考が強みです。品質を徹底的に追いかける姿勢が受託スキルで高い評価につながります。",
    "organizing+writing": "整理力と文章力を組み合わせることで、クライアントの課題を正確に形にできます。",
    default: "スキルを活かして、クライアントから直接信頼を得るタイプです。確かな仕事が評判を生みます。",
  },
  content_sales: {
    "creative+teaching": "アイデアを形にする創造力と、それを人に伝える力が高いレベルで共存しています。自分の知識を商品にすることが得意です。",
    "teaching+writing": "「教えること」と「書くこと」が自然とできます。自分の経験・知識をコンテンツ化して販売することに向いています。",
    "creative+writing": "独自の視点を持ち、それを文章で表現できます。コンテンツを作ること自体が楽しく感じられるタイプです。",
    default: "自分の知識・経験を価値あるコンテンツに変換する力があります。作ったものが繰り返し売れる仕組みを作れます。",
  },
  support_agent: {
    "helping+organizing": "サポートへの喜びと業務を整理・管理する力があります。相手の困りごとを的確に解決できるタイプです。",
    "helping+communicating": "人の話を丁寧に聞き、適切なサポートができます。相手の立場に立って行動できる力が強みです。",
    "organizing+technical": "整理力とデジタルスキルの組み合わせで、業務代行を効率よく正確にこなせます。",
    default: "人をサポートすることに自然と喜びを感じます。その力を副業に変えることで、継続的な仕事につながります。",
  },
  automation_builder: {
    "technical+systematic": "技術力と仕組み化思考が高いレベルで組み合わさっています。一度作った仕組みが長く機能する副業が最も向いています。",
    "problem_solving+systematic": "問題を見つけて体系的に解決する力があります。ツールや自動化で課題を根本から解決するスタイルです。",
    "technical+problem_solving": "デジタルツールを駆使して問題を解決する能力があります。自分が作ったものが人の役に立つことに喜びを感じます。",
    default: "仕組みを作ること・効率化することが得意です。一度動かした仕組みが継続的に価値を生み出します。",
  },
};

export function generateStrengthText(primaryType: WorkStyleTypeId, topTags: TagId[]): string {
  const templates = TEMPLATES[primaryType];
  const [t1, t2] = topTags.slice(0, 2);
  const key1 = t1 && t2 ? `${t1}+${t2}` : "";
  const key2 = t1 && t2 ? `${t2}+${t1}` : "";
  return templates[key1] ?? templates[key2] ?? templates.default;
}
