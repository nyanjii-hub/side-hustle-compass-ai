# 副業コンパスAI MVP 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** タグ＋プロファイル方式の診断ロジックを持つ副業コンパスAIのMVPを実装する

**Architecture:** Next.js App Router でトップ・診断・結果の3ページ構成。純TypeScriptの診断ロジック（lib/）とデータ（data/）をUIから完全に分離し、Vitestで単体テストする。診断結果はlocalStorageで受け渡す。

**Tech Stack:** Next.js 16.2.10 (App Router) / TypeScript / Tailwind CSS v4 / Vitest

## Global Constraints

- Next.js 16.2.10 のApp Routerを使用（Pagesルーターは使わない）
- `"use client"` を付けない限りサーバーコンポーネント
- Tailwind CSS v4（設定ファイルなし・importベース）
- パスエイリアス `@/` → プロジェクトルート（tsconfig.jsonに定義済み）
- localStorage経由で診断→結果ページ間のデータ受け渡し
- 実装開始前に `node_modules/next/dist/docs/` で破壊的変更を確認する

---

## ファイル構成

```
lib/
├── types.ts              ← 全型定義（他のlibファイルはここからimport）
├── tagging.ts            ← 回答→UserProfile生成
├── tagging.test.ts
├── scoring.ts            ← UserProfile→タイプスコア・上位タグ
├── scoring.test.ts
├── strength-text.ts      ← タイプ×上位タグ→強みテキスト
├── matching.ts           ← タイプ×タグ→副業ランキング
├── matching.test.ts
└── result-generator.ts   ← 全ロジックの統合エントリポイント

data/
├── questions.ts          ← 12問の質問データ
├── side-hustles.ts       ← 18種の副業データ
└── work-style-types.ts   ← 5つの働き方タイプ定義

components/
├── diagnosis/
│   ├── ProgressBar.tsx
│   ├── OptionCard.tsx
│   ├── QuestionCard.tsx
│   └── DiagnosisContainer.tsx
└── result/
    ├── TodayAction.tsx
    ├── TraitTags.tsx
    ├── StrengthText.tsx
    ├── WorkStyleCard.tsx
    ├── SideHustleRank.tsx
    └── Roadmap.tsx

app/
├── page.tsx              ← トップページ（サーバーコンポーネント）
├── diagnosis/
│   └── page.tsx          ← DiagnosisContainerをwrapするだけ
└── result/
    └── page.tsx          ← localStorageから結果を読み込み表示
```

---

## Task 1: テスト環境セットアップ + 型定義

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json`（scripts.testを追加）
- Create: `lib/types.ts`

**Interfaces:**
- Produces: `TagId`, `AversionTagId`, `WorkStyleTypeId`, `Question`, `AnswerOption`, `UserAnswer`, `UserProfile`, `WorkStyleType`, `SideHustle`, `RankedSideHustle`, `TypeScores`, `DiagnosisResult`

- [ ] **Step 1: Next.jsドキュメントを確認する**

```bash
ls node_modules/next/dist/docs/
```

Breaking changesに関するドキュメントがあれば読む。なければスキップ。

- [ ] **Step 2: Vitestをインストールする**

```bash
npm install -D vitest
```

- [ ] **Step 3: vitest.config.tsを作成する**

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 4: package.jsonにtestスクリプトを追加する**

`"scripts"` に以下を追加：

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: lib/types.tsを作成する**

```typescript
// lib/types.ts

export type TagId =
  | "writing" | "teaching" | "creative" | "visual"
  | "systematic" | "organizing" | "detail_oriented" | "analytical"
  | "research" | "patient" | "problem_solving" | "collecting"
  | "helping" | "communicating" | "technical";

export type AversionTagId =
  | "sales_averse" | "writing_averse" | "technical_averse" | "repetition_averse";

export type WorkStyleTypeId =
  | "asset_builder"
  | "contract_skill"
  | "content_sales"
  | "support_agent"
  | "automation_builder";

export interface AnswerOption {
  id: string;
  text: string;
  tags: TagId[];
  weight?: number;
  aversionTags?: AversionTagId[];
}

export interface Question {
  id: string;
  text: string;
  multiSelect?: boolean;
  options: AnswerOption[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptionIds: string[];
}

export interface UserProfile {
  tags: Partial<Record<TagId, number>>;
  aversionTags: Set<AversionTagId>;
  purpose: "income_stability" | "growth" | "independence" | "creator" | null;
  timeAvailable: "limited" | "moderate" | "generous" | "weekend" | null;
  patientLevel: 0 | 1 | 2;
  technicalLevel: 0 | 1 | 2;
  writingLevel: 0 | 1 | 2;
}

export interface WorkStyleType {
  id: WorkStyleTypeId;
  name: string;
  emoji: string;
  description: string;
  strengthSummary: string;
  notSuited: string;
}

export interface SideHustle {
  id: string;
  name: string;
  category: "skill" | "content";
  primaryTypes: WorkStyleTypeId[];
  matchTags: TagId[];
  aversionExcludes: AversionTagId[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  income3months: string;
  income6months: string;
  firstIncomeDays: number;
  description: string;
  whyGood: string;
  todayAction: string;
  weekRoadmap: [string, string, string, string, string, string, string];
}

export interface RankedSideHustle extends SideHustle {
  score: number;
  matchReason: string;
}

export type TypeScores = Record<WorkStyleTypeId, number>;

export interface DiagnosisResult {
  profile: Omit<UserProfile, "aversionTags"> & { aversionTags: AversionTagId[] };
  typeScores: TypeScores;
  primaryType: WorkStyleTypeId;
  secondaryType: WorkStyleTypeId;
  topTags: TagId[];
  traitLabels: string[];
  strengthText: string;
  primaryTypeDetail: WorkStyleType;
  notSuitedTypeDetail: WorkStyleType;
  rankedSideHustles: RankedSideHustle[];
  notRecommended: SideHustle[];
  todayAction: string;
  weekRoadmap: string[];
}
```

> 注意: `DiagnosisResult.profile.aversionTags` は `AversionTagId[]`（Setは JSON非対応のため配列で保存）

- [ ] **Step 6: コンパイル確認**

```bash
npx tsc --noEmit
```

エラーがなければOK。

- [ ] **Step 7: コミット**

```bash
git add vitest.config.ts lib/types.ts package.json
git commit -m "feat: add type definitions and vitest setup"
```

---

## Task 2: データ定義

**Files:**
- Create: `data/questions.ts`
- Create: `data/work-style-types.ts`
- Create: `data/side-hustles.ts`

**Interfaces:**
- Consumes: `Question`, `WorkStyleType`, `SideHustle` from `@/lib/types`
- Produces: `questions[]`, `workStyleTypes[]`, `sideHustles[]`

- [ ] **Step 1: data/work-style-types.tsを作成する**

```typescript
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
```

- [ ] **Step 2: data/questions.tsを作成する**

レビューで指摘した2点を反映済み：Q4にvisual発火経路追加、Q5を複数選択に変更。

```typescript
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
```

- [ ] **Step 3: data/side-hustles.tsを作成する**

以下の2件を実装し、残り16件は `docs/side-hustles.md` の同形式データをそのまま追加する。

```typescript
// data/side-hustles.ts
import type { SideHustle } from "@/lib/types";

export const sideHustles: SideHustle[] = [
  {
    id: "web_writing",
    name: "Webライティング",
    category: "skill",
    primaryTypes: ["asset_builder", "contract_skill"],
    matchTags: ["writing", "research", "detail_oriented", "analytical", "patient"],
    aversionExcludes: ["writing_averse"],
    difficulty: 2,
    income3months: "1〜3万円",
    income6months: "3〜10万円",
    firstIncomeDays: 14,
    description: "企業ブログ・商品説明・SEO記事を書いて報酬を得る副業",
    whyGood: "文章力・調べる力・細かさを活かせる。クラウドワークスで案件が豊富で初心者でも始めやすい",
    todayAction: "クラウドワークスに無料登録して「ライティング」カテゴリの案件を5件見てみる（10分）",
    weekRoadmap: [
      "クラウドワークスに登録・Webライティング案件を眺める",
      "自己紹介プロフィールを充実させる",
      "文字単価0.5〜1円の初心者向け案件に1件応募する",
      "採用連絡を待ちながら「Webライティング 書き方」で調べる",
      "初案件に取り組む（1本書いてみる）",
      "納品・フィードバックをもらう",
      "次の案件を探す・単価アップを目標に設定する",
    ],
  },
  {
    id: "qa_tester",
    name: "QAテスター",
    category: "skill",
    primaryTypes: ["contract_skill"],
    matchTags: ["detail_oriented", "analytical", "systematic", "problem_solving", "patient"],
    aversionExcludes: ["repetition_averse"],
    difficulty: 2,
    income3months: "1〜5万円",
    income6months: "3〜10万円",
    firstIncomeDays: 21,
    description: "アプリ・Webサービスのバグ発見・テスト報告を行う副業",
    whyGood: "細かいことが得意・チェック作業が苦にならない人の強みをそのまま活かせる",
    todayAction: "「クラウドワークス テスター」で検索して案件の相場・内容を調べる（15分）",
    weekRoadmap: [
      "クラウドワークスでQAテスター案件を10件確認する",
      "テスト仕様書・バグ報告書の書き方を調べる",
      "テスター向けプロフィールを書く（経験・強みを記載）",
      "単価の低い初心者向け案件に1件応募する",
      "採用後、テスト環境を整えて作業開始",
      "バグ報告書を作成・納品する",
      "次の案件を探す・継続案件を狙う",
    ],
  },
  // 残り16件をdocs/side-hustles.mdの各副業データから同形式で追加する
  // id一覧: data_entry / lp_creation / website_creation / nocode_creation /
  //         ai_agent / meo_management / note_sales / booth_sales /
  //         ai_prompt_sales / template_sales / youtube_bgm / youtube_tutorial /
  //         blog / affiliate / ai_tool_sales / automation_tool
];
```

- [ ] **Step 4: TypeScriptコンパイル確認**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: コミット**

```bash
git add data/
git commit -m "feat: add question, side-hustle, and work-style-type data"
```

---

## Task 3: タグ付与ロジック

**Files:**
- Create: `lib/tagging.ts`
- Create: `lib/tagging.test.ts`

**Interfaces:**
- Consumes: `UserAnswer`, `UserProfile`, `TagId`, `AversionTagId` from `@/lib/types`; `questions` from `@/data/questions`
- Produces: `buildUserProfile(answers: UserAnswer[]): UserProfile`

- [ ] **Step 1: lib/tagging.test.tsを作成する（先にテストを書く）**

```typescript
// lib/tagging.test.ts
import { describe, it, expect } from "vitest";
import { buildUserProfile } from "./tagging";

describe("buildUserProfile", () => {
  it("accumulates tags from multiple answers", () => {
    const answers = [
      { questionId: "q1", selectedOptionIds: ["q1_b"] }, // research, analytical, collecting
      { questionId: "q2", selectedOptionIds: ["q2_a"] }, // research, analytical
    ];
    const profile = buildUserProfile(answers);
    expect(profile.tags.research).toBe(2);
    expect(profile.tags.analytical).toBe(2);
    expect(profile.tags.collecting).toBe(1);
  });

  it("accumulates aversion tags from Q5 multi-select", () => {
    const answers = [
      { questionId: "q5", selectedOptionIds: ["q5_a", "q5_c"] },
    ];
    const profile = buildUserProfile(answers);
    expect(profile.aversionTags.has("sales_averse")).toBe(true);
    expect(profile.aversionTags.has("writing_averse")).toBe(true);
    expect(profile.aversionTags.has("technical_averse")).toBe(false);
  });

  it("applies weight=2 for Q7 strong writing answer", () => {
    const answers = [
      { questionId: "q7", selectedOptionIds: ["q7_a"] },
    ];
    const profile = buildUserProfile(answers);
    expect(profile.tags.writing).toBe(2);
    expect(profile.writingLevel).toBe(2);
  });

  it("applies weight=2 for Q8 strong technical answer", () => {
    const answers = [
      { questionId: "q8", selectedOptionIds: ["q8_a"] },
    ];
    const profile = buildUserProfile(answers);
    expect(profile.tags.technical).toBe(2);
    expect(profile.technicalLevel).toBe(2);
  });

  it("adds writing_averse when Q7_d selected", () => {
    const answers = [
      { questionId: "q7", selectedOptionIds: ["q7_d"] },
    ];
    const profile = buildUserProfile(answers);
    expect(profile.aversionTags.has("writing_averse")).toBe(true);
    expect(profile.writingLevel).toBe(0);
  });

  it("sets patientLevel=2 for Q11_a", () => {
    const answers = [
      { questionId: "q11", selectedOptionIds: ["q11_a"] },
    ];
    const profile = buildUserProfile(answers);
    expect(profile.patientLevel).toBe(2);
    expect(profile.tags.patient).toBe(2);
  });

  it("sets purpose from Q10", () => {
    const answers = [
      { questionId: "q10", selectedOptionIds: ["q10_a"] },
    ];
    const profile = buildUserProfile(answers);
    expect(profile.purpose).toBe("income_stability");
  });

  it("sets timeAvailable from Q9", () => {
    const answers = [
      { questionId: "q9", selectedOptionIds: ["q9_b"] },
    ];
    const profile = buildUserProfile(answers);
    expect(profile.timeAvailable).toBe("moderate");
  });

  it("returns empty profile for empty answers", () => {
    const profile = buildUserProfile([]);
    expect(Object.keys(profile.tags)).toHaveLength(0);
    expect(profile.aversionTags.size).toBe(0);
    expect(profile.purpose).toBeNull();
  });
});
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npm test
```

Expected: FAIL（tagging.tsが存在しないため）

- [ ] **Step 3: lib/tagging.tsを実装する**

```typescript
// lib/tagging.ts
import type { UserAnswer, UserProfile, TagId, AversionTagId } from "./types";
import { questions } from "@/data/questions";

const TIME_MAP: Record<string, UserProfile["timeAvailable"]> = {
  q9_a: "limited", q9_b: "moderate", q9_c: "generous", q9_d: "weekend",
};

const PURPOSE_MAP: Record<string, UserProfile["purpose"]> = {
  q10_a: "income_stability", q10_b: "growth",
  q10_c: "independence", q10_d: "creator",
};

export function buildUserProfile(answers: UserAnswer[]): UserProfile {
  const tags: Partial<Record<TagId, number>> = {};
  const aversionTags = new Set<AversionTagId>();
  let purpose: UserProfile["purpose"] = null;
  let timeAvailable: UserProfile["timeAvailable"] = null;
  let patientLevel: 0 | 1 | 2 = 0;
  let technicalLevel: 0 | 1 | 2 = 0;
  let writingLevel: 0 | 1 | 2 = 0;

  for (const answer of answers) {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) continue;

    for (const optionId of answer.selectedOptionIds) {
      const option = question.options.find(o => o.id === optionId);
      if (!option) continue;
      const weight = option.weight ?? 1;

      for (const tag of option.tags) {
        tags[tag] = (tags[tag] ?? 0) + weight;
      }
      for (const aTag of option.aversionTags ?? []) {
        aversionTags.add(aTag);
      }

      if (TIME_MAP[optionId] !== undefined) timeAvailable = TIME_MAP[optionId]!;
      if (PURPOSE_MAP[optionId] !== undefined) purpose = PURPOSE_MAP[optionId]!;

      if (answer.questionId === "q11") {
        patientLevel = optionId === "q11_a" ? 2 : optionId === "q11_b" ? 1 : 0;
      }
      if (answer.questionId === "q7") {
        writingLevel = optionId === "q7_a" ? 2 : optionId === "q7_b" ? 1 : 0;
        if (optionId === "q7_d") aversionTags.add("writing_averse");
      }
      if (answer.questionId === "q8") {
        technicalLevel = optionId === "q8_a" ? 2 : optionId === "q8_b" ? 1 : 0;
        if (optionId === "q8_d") aversionTags.add("technical_averse");
      }
    }
  }

  return { tags, aversionTags, purpose, timeAvailable, patientLevel, technicalLevel, writingLevel };
}
```

- [ ] **Step 4: テストが通ることを確認する**

```bash
npm test
```

Expected: PASS（全9テスト）

- [ ] **Step 5: コミット**

```bash
git add lib/tagging.ts lib/tagging.test.ts
git commit -m "feat: implement tag profiling logic with tests"
```

---

## Task 4: スコアリング + 強みテキスト生成

**Files:**
- Create: `lib/scoring.ts`
- Create: `lib/scoring.test.ts`
- Create: `lib/strength-text.ts`

**Interfaces:**
- Consumes: `UserProfile`, `WorkStyleTypeId`, `TypeScores`, `TagId` from `@/lib/types`
- Produces:
  - `calculateTypeScores(profile: UserProfile): TypeScores`
  - `getPrimaryType(scores: TypeScores): WorkStyleTypeId`
  - `getSecondaryType(scores: TypeScores, primary: WorkStyleTypeId): WorkStyleTypeId`
  - `getTopTags(profile: UserProfile, count?: number): TagId[]`
  - `generateStrengthText(primaryType: WorkStyleTypeId, topTags: TagId[]): string`

- [ ] **Step 1: lib/scoring.test.tsを作成する**

```typescript
// lib/scoring.test.ts
import { describe, it, expect } from "vitest";
import { calculateTypeScores, getPrimaryType, getSecondaryType, getTopTags } from "./scoring";
import type { UserProfile } from "./types";

function makeProfile(tags: Partial<Record<string, number>>): UserProfile {
  return {
    tags: tags as UserProfile["tags"],
    aversionTags: new Set(),
    purpose: null, timeAvailable: null,
    patientLevel: 0, technicalLevel: 0, writingLevel: 0,
  };
}

describe("calculateTypeScores", () => {
  it("returns normalized scores where max is 100", () => {
    const profile = makeProfile({ writing: 3, research: 2, patient: 2 });
    const scores = calculateTypeScores(profile);
    expect(Math.max(...Object.values(scores))).toBe(100);
  });

  it("identifies asset_builder as primary for writing+research+patient", () => {
    const profile = makeProfile({ writing: 3, research: 3, patient: 3 });
    const scores = calculateTypeScores(profile);
    expect(getPrimaryType(scores)).toBe("asset_builder");
  });

  it("identifies automation_builder for technical+systematic+problem_solving", () => {
    const profile = makeProfile({ technical: 3, systematic: 3, problem_solving: 3 });
    const scores = calculateTypeScores(profile);
    expect(getPrimaryType(scores)).toBe("automation_builder");
  });

  it("identifies support_agent for helping+communicating+organizing", () => {
    const profile = makeProfile({ helping: 3, communicating: 2, organizing: 3 });
    const scores = calculateTypeScores(profile);
    expect(getPrimaryType(scores)).toBe("support_agent");
  });

  it("getSecondaryType returns different type from primary", () => {
    const profile = makeProfile({ writing: 3, research: 3, patient: 3 });
    const scores = calculateTypeScores(profile);
    const primary = getPrimaryType(scores);
    const secondary = getSecondaryType(scores, primary);
    expect(secondary).not.toBe(primary);
  });
});

describe("getTopTags", () => {
  it("returns top N tags sorted by count descending", () => {
    const profile = makeProfile({ writing: 4, research: 3, patient: 2, creative: 1 });
    const top = getTopTags(profile, 3);
    expect(top).toEqual(["writing", "research", "patient"]);
  });
});
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npm test
```

Expected: FAIL

- [ ] **Step 3: lib/scoring.tsを実装する**

```typescript
// lib/scoring.ts
import type { UserProfile, WorkStyleTypeId, TypeScores, TagId } from "./types";

const TAG_WEIGHTS: Record<TagId, Record<WorkStyleTypeId, number>> = {
  writing:         { asset_builder: 3, contract_skill: 2, content_sales: 2, support_agent: 0, automation_builder: 0 },
  teaching:        { asset_builder: 2, contract_skill: 0, content_sales: 3, support_agent: 1, automation_builder: 0 },
  creative:        { asset_builder: 1, contract_skill: 0, content_sales: 3, support_agent: 0, automation_builder: 1 },
  visual:          { asset_builder: 0, contract_skill: 1, content_sales: 2, support_agent: 0, automation_builder: 0 },
  systematic:      { asset_builder: 1, contract_skill: 2, content_sales: 0, support_agent: 1, automation_builder: 3 },
  organizing:      { asset_builder: 1, contract_skill: 2, content_sales: 0, support_agent: 3, automation_builder: 1 },
  detail_oriented: { asset_builder: 0, contract_skill: 3, content_sales: 0, support_agent: 1, automation_builder: 2 },
  analytical:      { asset_builder: 2, contract_skill: 1, content_sales: 1, support_agent: 0, automation_builder: 2 },
  research:        { asset_builder: 3, contract_skill: 0, content_sales: 2, support_agent: 0, automation_builder: 1 },
  patient:         { asset_builder: 3, contract_skill: 1, content_sales: 2, support_agent: 1, automation_builder: 1 },
  problem_solving: { asset_builder: 0, contract_skill: 1, content_sales: 0, support_agent: 1, automation_builder: 3 },
  collecting:      { asset_builder: 2, contract_skill: 0, content_sales: 2, support_agent: 0, automation_builder: 1 },
  helping:         { asset_builder: 0, contract_skill: 0, content_sales: 1, support_agent: 3, automation_builder: 1 },
  communicating:   { asset_builder: 0, contract_skill: 0, content_sales: 1, support_agent: 2, automation_builder: 0 },
  technical:       { asset_builder: 0, contract_skill: 1, content_sales: 0, support_agent: 2, automation_builder: 3 },
};

export function calculateTypeScores(profile: UserProfile): TypeScores {
  const scores: TypeScores = {
    asset_builder: 0, contract_skill: 0,
    content_sales: 0, support_agent: 0, automation_builder: 0,
  };

  for (const [tagId, count] of Object.entries(profile.tags) as [TagId, number][]) {
    const weights = TAG_WEIGHTS[tagId];
    if (!weights) continue;
    for (const [typeId, weight] of Object.entries(weights) as [WorkStyleTypeId, number][]) {
      scores[typeId] += count * weight;
    }
  }

  const maxScore = Math.max(...Object.values(scores), 1);
  for (const typeId of Object.keys(scores) as WorkStyleTypeId[]) {
    scores[typeId] = Math.round((scores[typeId] / maxScore) * 100);
  }

  return scores;
}

export function getPrimaryType(scores: TypeScores): WorkStyleTypeId {
  return (Object.entries(scores) as [WorkStyleTypeId, number][])
    .sort(([, a], [, b]) => b - a)[0][0];
}

export function getSecondaryType(scores: TypeScores, primaryType: WorkStyleTypeId): WorkStyleTypeId {
  return (Object.entries(scores) as [WorkStyleTypeId, number][])
    .filter(([id]) => id !== primaryType)
    .sort(([, a], [, b]) => b - a)[0][0];
}

export function getTopTags(profile: UserProfile, count = 5): TagId[] {
  return (Object.entries(profile.tags) as [TagId, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([id]) => id);
}
```

- [ ] **Step 4: lib/strength-text.tsを作成する（テストなし・テンプレートデータのみ）**

```typescript
// lib/strength-text.ts
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
```

- [ ] **Step 5: テストが通ることを確認する**

```bash
npm test
```

Expected: PASS

- [ ] **Step 6: コミット**

```bash
git add lib/scoring.ts lib/scoring.test.ts lib/strength-text.ts
git commit -m "feat: implement scoring and strength text generation"
```

---

## Task 5: 副業マッチング

**Files:**
- Create: `lib/matching.ts`
- Create: `lib/matching.test.ts`

**Interfaces:**
- Consumes: `UserProfile`, `WorkStyleTypeId`, `SideHustle`, `RankedSideHustle` from `@/lib/types`; `sideHustles` from `@/data/side-hustles`
- Produces:
  - `rankSideHustles(profile, primaryType, typeScores): RankedSideHustle[]`
  - `getNotRecommended(ranked: RankedSideHustle[]): SideHustle[]`

- [ ] **Step 1: lib/matching.test.tsを作成する**

```typescript
// lib/matching.test.ts
import { describe, it, expect } from "vitest";
import { rankSideHustles, getNotRecommended } from "./matching";
import type { UserProfile, TypeScores } from "./types";

function makeProfile(
  tags: Partial<Record<string, number>>,
  aversionTags: string[] = []
): UserProfile {
  return {
    tags: tags as UserProfile["tags"],
    aversionTags: new Set(aversionTags) as UserProfile["aversionTags"],
    purpose: null, timeAvailable: null,
    patientLevel: 0, technicalLevel: 0, writingLevel: 0,
  };
}

const baseScores: TypeScores = {
  asset_builder: 100, contract_skill: 60,
  content_sales: 70, support_agent: 20, automation_builder: 10,
};

describe("rankSideHustles", () => {
  it("returns all side hustles sorted by score descending", () => {
    const profile = makeProfile({ writing: 3, research: 2 });
    const ranked = rankSideHustles(profile, "asset_builder", baseScores);
    for (let i = 0; i < ranked.length - 1; i++) {
      expect(ranked[i].score).toBeGreaterThanOrEqual(ranked[i + 1].score);
    }
  });

  it("penalizes side hustles that match aversion tags", () => {
    const profileNoAversion = makeProfile({ writing: 3 });
    const profileWithAversion = makeProfile({ writing: 3 }, ["writing_averse"]);

    const ranked1 = rankSideHustles(profileNoAversion, "asset_builder", baseScores);
    const ranked2 = rankSideHustles(profileWithAversion, "asset_builder", baseScores);

    const blogScore1 = ranked1.find(sh => sh.id === "web_writing")?.score ?? 0;
    const blogScore2 = ranked2.find(sh => sh.id === "web_writing")?.score ?? 0;
    expect(blogScore2).toBeLessThan(blogScore1);
  });

  it("each result has a non-empty matchReason", () => {
    const profile = makeProfile({ writing: 2 });
    const ranked = rankSideHustles(profile, "asset_builder", baseScores);
    for (const sh of ranked) {
      expect(sh.matchReason.length).toBeGreaterThan(0);
    }
  });
});

describe("getNotRecommended", () => {
  it("returns 2 lowest-scoring side hustles", () => {
    const profile = makeProfile({ writing: 3, research: 3 });
    const ranked = rankSideHustles(profile, "asset_builder", baseScores);
    const notRec = getNotRecommended(ranked);
    expect(notRec).toHaveLength(2);
    const minScores = [...ranked].sort((a, b) => a.score - b.score).slice(0, 2).map(s => s.id);
    expect(notRec.map(s => s.id)).toEqual(expect.arrayContaining(minScores));
  });
});
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npm test
```

Expected: FAIL

- [ ] **Step 3: lib/matching.tsを実装する**

```typescript
// lib/matching.ts
import type { UserProfile, WorkStyleTypeId, SideHustle, RankedSideHustle, TagId, TypeScores } from "./types";
import { sideHustles } from "@/data/side-hustles";

const TYPE_MATCH_BONUS = 20;
const TAG_WEIGHT = 2;
const AVERSION_PENALTY = 15;

const TAG_LABELS: Record<string, string> = {
  writing: "文章力", teaching: "教える力", creative: "創造力",
  visual: "視覚センス", systematic: "仕組み化", organizing: "整理整頓",
  detail_oriented: "細かさ", analytical: "分析力", research: "調べる力",
  patient: "継続力", problem_solving: "問題解決力", collecting: "収集力",
  helping: "サポート力", communicating: "コミュニケーション", technical: "デジタル適性",
};

export function rankSideHustles(
  profile: UserProfile,
  primaryType: WorkStyleTypeId,
  _typeScores: TypeScores
): RankedSideHustle[] {
  return sideHustles
    .map(sh => {
      let score = sh.primaryTypes.includes(primaryType) ? TYPE_MATCH_BONUS : 0;

      for (const tag of sh.matchTags) {
        score += (profile.tags[tag as TagId] ?? 0) * TAG_WEIGHT;
      }

      const aversionHits = sh.aversionExcludes.filter(a => profile.aversionTags.has(a)).length;
      score -= aversionHits * AVERSION_PENALTY;

      const matchedTag = sh.matchTags.find(t => (profile.tags[t as TagId] ?? 0) > 0);
      const matchReason = matchedTag
        ? `あなたの「${TAG_LABELS[matchedTag] ?? matchedTag}」が活きる副業です`
        : "あなたの働き方タイプと相性があります";

      return { ...sh, score, matchReason };
    })
    .sort((a, b) => b.score - a.score);
}

export function getNotRecommended(ranked: RankedSideHustle[]): SideHustle[] {
  return [...ranked]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)
    .map(({ score: _s, matchReason: _r, ...sh }) => sh as SideHustle);
}
```

- [ ] **Step 4: テストが通ることを確認する**

```bash
npm test
```

Expected: PASS

- [ ] **Step 5: コミット**

```bash
git add lib/matching.ts lib/matching.test.ts
git commit -m "feat: implement side hustle matching and ranking"
```

---

## Task 6: 結果生成の統合

**Files:**
- Create: `lib/result-generator.ts`
- Create: `lib/result-generator.test.ts`

**Interfaces:**
- Consumes: 全lib/モジュール + data/work-style-types
- Produces: `generateResult(answers: UserAnswer[]): DiagnosisResult`

- [ ] **Step 1: lib/result-generator.test.tsを作成する**

```typescript
// lib/result-generator.test.ts
import { describe, it, expect } from "vitest";
import { generateResult } from "./result-generator";

const fullAnswers = [
  { questionId: "q1", selectedOptionIds: ["q1_b"] },
  { questionId: "q2", selectedOptionIds: ["q2_a"] },
  { questionId: "q3", selectedOptionIds: ["q3_a"] },
  { questionId: "q4", selectedOptionIds: ["q4_a"] },
  { questionId: "q5", selectedOptionIds: ["q5_e"] },
  { questionId: "q6", selectedOptionIds: ["q6_b"] },
  { questionId: "q7", selectedOptionIds: ["q7_a"] },
  { questionId: "q8", selectedOptionIds: ["q8_b"] },
  { questionId: "q9", selectedOptionIds: ["q9_b"] },
  { questionId: "q10", selectedOptionIds: ["q10_a"] },
  { questionId: "q11", selectedOptionIds: ["q11_a"] },
  { questionId: "q12", selectedOptionIds: ["q12_a"] },
];

describe("generateResult", () => {
  it("returns a complete DiagnosisResult with all required fields", () => {
    const result = generateResult(fullAnswers);
    expect(result.primaryType).toBeTruthy();
    expect(result.secondaryType).not.toBe(result.primaryType);
    expect(result.traitLabels.length).toBeGreaterThan(0);
    expect(result.strengthText.length).toBeGreaterThan(10);
    expect(result.rankedSideHustles.length).toBeGreaterThan(0);
    expect(result.notRecommended.length).toBe(2);
    expect(result.todayAction.length).toBeGreaterThan(0);
    expect(result.weekRoadmap).toHaveLength(7);
  });

  it("profile aversionTags is an array (for JSON serialization)", () => {
    const result = generateResult(fullAnswers);
    expect(Array.isArray(result.profile.aversionTags)).toBe(true);
  });
});
```

- [ ] **Step 2: テストが失敗することを確認する**

```bash
npm test
```

- [ ] **Step 3: lib/result-generator.tsを実装する**

```typescript
// lib/result-generator.ts
import type { UserAnswer, DiagnosisResult, TagId } from "./types";
import { buildUserProfile } from "./tagging";
import { calculateTypeScores, getPrimaryType, getSecondaryType, getTopTags } from "./scoring";
import { generateStrengthText } from "./strength-text";
import { rankSideHustles, getNotRecommended } from "./matching";
import { workStyleTypes } from "@/data/work-style-types";

const TAG_LABELS: Record<TagId, string> = {
  writing: "文章力", teaching: "教える力", creative: "創造力",
  visual: "視覚センス", systematic: "仕組み化", organizing: "整理整頓",
  detail_oriented: "細かさ", analytical: "分析力", research: "調べる力",
  patient: "継続力", problem_solving: "問題解決力", collecting: "収集力",
  helping: "サポート力", communicating: "コミュニケーション", technical: "デジタル適性",
};

export function generateResult(answers: UserAnswer[]): DiagnosisResult {
  const profile = buildUserProfile(answers);
  const typeScores = calculateTypeScores(profile);
  const primaryType = getPrimaryType(typeScores);
  const secondaryType = getSecondaryType(typeScores, primaryType);
  const topTags = getTopTags(profile, 5);

  const rankedAll = rankSideHustles(profile, primaryType, typeScores);
  const rankedSideHustles = rankedAll.slice(0, 5);
  const notRecommended = getNotRecommended(rankedAll);

  const primaryTypeDetail = workStyleTypes.find(t => t.id === primaryType)!;
  const notSuitedTypeId = (Object.entries(typeScores) as [string, number][])
    .sort(([, a], [, b]) => a - b)[0][0];
  const notSuitedTypeDetail = workStyleTypes.find(t => t.id === notSuitedTypeId)!;

  const strengthText = generateStrengthText(primaryType, topTags);
  const traitLabels = topTags.map(t => TAG_LABELS[t] ?? t);
  const topSideHustle = rankedSideHustles[0];

  return {
    profile: {
      ...profile,
      aversionTags: [...profile.aversionTags], // Setを配列に変換（JSON対応）
    },
    typeScores,
    primaryType,
    secondaryType,
    topTags,
    traitLabels,
    strengthText,
    primaryTypeDetail,
    notSuitedTypeDetail,
    rankedSideHustles,
    notRecommended,
    todayAction: topSideHustle?.todayAction ?? "",
    weekRoadmap: topSideHustle ? [...topSideHustle.weekRoadmap] : [],
  };
}
```

- [ ] **Step 4: テストが全て通ることを確認する**

```bash
npm test
```

Expected: 全テストPASS

- [ ] **Step 5: コミット**

```bash
git add lib/result-generator.ts lib/result-generator.test.ts
git commit -m "feat: implement result generation pipeline"
```

---

## Task 7: トップページ

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: なし（静的ページ）
- Produces: `/` ルートのUI

- [ ] **Step 1: app/page.tsxを実装する**

サーバーコンポーネント（`"use client"` なし）。

```tsx
// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-6 py-16 text-center max-w-lg mx-auto">
        <p className="text-xs font-semibold text-zinc-400 mb-4 tracking-widest uppercase">
          副業コンパスAI
        </p>
        <h1 className="text-3xl font-bold text-zinc-900 leading-tight mb-4">
          副業を当てるより、<br />
          あなた自身を知ることから。
        </h1>
        <p className="text-zinc-500 leading-relaxed mb-8">
          自分でも気づいていない強みをAIが言語化します。<br />
          10問・5分で、今日の一歩へ。
        </p>
        <Link
          href="/diagnosis"
          className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-zinc-700 transition-colors"
        >
          無料で診断をはじめる
        </Link>
        <p className="text-xs text-zinc-400 mt-3">登録不要・無料・5分で完了</p>
      </section>

      {/* Pain points */}
      <section className="px-6 pb-8 max-w-lg mx-auto">
        <p className="text-xs font-semibold text-zinc-400 mb-3">こんな方におすすめ</p>
        <ul className="space-y-3">
          {[
            "副業したいけど何から始めればいいかわからない",
            "自分に向いている副業が知りたい",
            "営業なしで在宅でできる副業を探している",
            "まず月3〜5万円から副業を始めたい",
          ].map(text => (
            <li key={text} className="flex items-start gap-2 text-sm text-zinc-700">
              <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 steps */}
      <section className="mx-4 mb-8 px-6 py-8 bg-zinc-50 rounded-2xl max-w-lg lg:mx-auto">
        <p className="text-xs font-semibold text-zinc-400 mb-6 text-center">3ステップで結果が出る</p>
        <div className="space-y-5">
          {[
            { step: "01", title: "12問に答える（5分）", desc: "過去の行動や得意なことを選ぶだけ" },
            { step: "02", title: "あなたの強みを言語化", desc: "自分でも気づいていない特徴をAIが言葉にする" },
            { step: "03", title: "向いている副業と一歩を提示", desc: "今日やることと7日間ロードマップまで提示" },
          ].map(item => (
            <div key={item.step} className="flex gap-4 items-start">
              <span className="text-2xl font-bold text-zinc-200 w-10 shrink-0">{item.step}</span>
              <div>
                <p className="font-semibold text-zinc-800 text-sm">{item.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Second CTA */}
      <section className="px-6 pb-16 text-center">
        <Link
          href="/diagnosis"
          className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-zinc-700 transition-colors"
        >
          無料で診断をはじめる
        </Link>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: 開発サーバーで確認する**

```bash
npm run dev
```

http://localhost:3000 でトップページが表示されることを確認する。

- [ ] **Step 3: コミット**

```bash
git add app/page.tsx
git commit -m "feat: implement top page"
```

---

## Task 8: 診断UIコンポーネント

**Files:**
- Create: `components/diagnosis/ProgressBar.tsx`
- Create: `components/diagnosis/OptionCard.tsx`
- Create: `components/diagnosis/QuestionCard.tsx`
- Create: `components/diagnosis/DiagnosisContainer.tsx`

**Interfaces:**
- Consumes: `Question`, `UserAnswer` from `@/lib/types`; `questions` from `@/data/questions`; `generateResult` from `@/lib/result-generator`
- Produces: `<DiagnosisContainer />` — 診断フロー全体を管理するクライアントコンポーネント

- [ ] **Step 1: components/diagnosis/ProgressBar.tsxを作成する**

```tsx
// components/diagnosis/ProgressBar.tsx
interface Props {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full px-4 pt-4 pb-3 bg-white border-b border-zinc-100">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
          <span>{current} / {total}問</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-900 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: components/diagnosis/OptionCard.tsxを作成する**

```tsx
// components/diagnosis/OptionCard.tsx
import type { AnswerOption } from "@/lib/types";

interface Props {
  option: AnswerOption;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ option, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm leading-snug transition-all active:scale-[0.98] ${
        selected
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
      }`}
    >
      {option.text}
    </button>
  );
}
```

- [ ] **Step 3: components/diagnosis/QuestionCard.tsxを作成する**

```tsx
// components/diagnosis/QuestionCard.tsx
"use client";
import { useState } from "react";
import type { Question, UserAnswer } from "@/lib/types";
import { OptionCard } from "./OptionCard";

interface Props {
  question: Question;
  previousAnswer?: UserAnswer;
  onSelect: (optionIds: string[]) => void;
  isLast: boolean;
}

export function QuestionCard({ question, previousAnswer, onSelect, isLast }: Props) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(previousAnswer?.selectedOptionIds ?? [])
  );

  function handleOptionClick(optionId: string) {
    if (!question.multiSelect) {
      onSelect([optionId]);
      return;
    }
    const next = new Set(selected);
    const noneId = question.options[question.options.length - 1].id; // "特になし"
    if (optionId === noneId) {
      next.clear();
      next.add(optionId);
    } else {
      next.delete(noneId);
      if (next.has(optionId)) next.delete(optionId);
      else next.add(optionId);
    }
    setSelected(next);
  }

  return (
    <div className="w-full max-w-lg">
      <p className="text-lg font-semibold text-zinc-800 mb-5 leading-relaxed">
        {question.text}
      </p>
      <div className="space-y-2.5">
        {question.options.map(option => (
          <OptionCard
            key={option.id}
            option={option}
            selected={selected.has(option.id)}
            onClick={() => handleOptionClick(option.id)}
          />
        ))}
      </div>
      {question.multiSelect && selected.size > 0 && (
        <div className="mt-6">
          <button
            onClick={() => onSelect([...selected])}
            className="w-full bg-zinc-900 text-white py-3.5 rounded-full font-semibold text-sm"
          >
            {isLast ? "結果を見る →" : "次へ →"}
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: components/diagnosis/DiagnosisContainer.tsxを作成する**

```tsx
// components/diagnosis/DiagnosisContainer.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { generateResult } from "@/lib/result-generator";
import type { UserAnswer } from "@/lib/types";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";

export function DiagnosisContainer() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleSelect(selectedOptionIds: string[]) {
    const newAnswers: UserAnswer[] = [
      ...answers.filter(a => a.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, selectedOptionIds },
    ];
    setAnswers(newAnswers);

    if (isLast) {
      const result = generateResult(newAnswers);
      localStorage.setItem("diagnosis_result", JSON.stringify(result));
      router.push("/result");
    } else {
      setCurrentIndex(i => i + 1);
    }
  }

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <ProgressBar current={currentIndex + 1} total={questions.length} />
      <div className="flex-1 flex items-start justify-center p-6 pt-10">
        <QuestionCard
          question={currentQuestion}
          previousAnswer={answers.find(a => a.questionId === currentQuestion.id)}
          onSelect={handleSelect}
          isLast={isLast}
        />
      </div>
      {currentIndex > 0 && (
        <div className="p-4 text-center">
          <button
            onClick={handleBack}
            className="text-xs text-zinc-400 underline underline-offset-2"
          >
            ← 前の質問に戻る
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: 開発サーバーで確認する**（診断ページ実装後に最終確認）

- [ ] **Step 6: コミット**

```bash
git add components/diagnosis/
git commit -m "feat: implement diagnosis UI components"
```

---

## Task 9: 診断ページ

**Files:**
- Create: `app/diagnosis/page.tsx`

- [ ] **Step 1: app/diagnosis/page.tsxを作成する**

```tsx
// app/diagnosis/page.tsx
import { DiagnosisContainer } from "@/components/diagnosis/DiagnosisContainer";

export default function DiagnosisPage() {
  return <DiagnosisContainer />;
}
```

- [ ] **Step 2: 動作確認する**

```bash
npm run dev
```

1. http://localhost:3000 → 「無料で診断をはじめる」をクリック
2. http://localhost:3000/diagnosis に遷移し、Q1が表示されること
3. 選択肢をクリックするとQ2に進むこと
4. Q5は複数選択できること、「次へ」ボタンが出ること
5. Q12まで回答すると `/result` に遷移しようとすること（結果ページ未実装のため404になる）

- [ ] **Step 3: コミット**

```bash
git add app/diagnosis/
git commit -m "feat: add diagnosis page"
```

---

## Task 10: 結果UIコンポーネント

**Files:**
- Create: `components/result/TodayAction.tsx`
- Create: `components/result/TraitTags.tsx`
- Create: `components/result/StrengthText.tsx`
- Create: `components/result/WorkStyleCard.tsx`
- Create: `components/result/SideHustleRank.tsx`
- Create: `components/result/Roadmap.tsx`

- [ ] **Step 1: components/result/TodayAction.tsxを作成する**

スマホで目立つよう、ページ最上部に配置する強調カード。

```tsx
// components/result/TodayAction.tsx
interface Props {
  action: string;
}

export function TodayAction({ action }: Props) {
  return (
    <section className="bg-zinc-900 text-white rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🎯</span>
        <h2 className="text-base font-bold">今日やること</h2>
      </div>
      <p className="text-zinc-100 text-sm leading-relaxed">{action}</p>
    </section>
  );
}
```

- [ ] **Step 2: components/result/TraitTags.tsxを作成する**

```tsx
// components/result/TraitTags.tsx
interface Props {
  labels: string[];
}

export function TraitTags({ labels }: Props) {
  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">あなたの行動特性</h2>
      <div className="flex flex-wrap gap-2">
        {labels.map(label => (
          <span
            key={label}
            className="px-3 py-1.5 bg-white border border-zinc-200 rounded-full text-xs font-medium text-zinc-700"
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: components/result/StrengthText.tsxを作成する**

```tsx
// components/result/StrengthText.tsx
interface Props {
  text: string;
}

export function StrengthText({ text }: Props) {
  return (
    <section className="bg-blue-50 rounded-2xl p-5">
      <h2 className="text-base font-bold text-zinc-800 mb-2">無意識にできていること</h2>
      <p className="text-zinc-700 text-sm leading-relaxed">{text}</p>
    </section>
  );
}
```

- [ ] **Step 4: components/result/WorkStyleCard.tsxを作成する**

```tsx
// components/result/WorkStyleCard.tsx
import type { WorkStyleType } from "@/lib/types";

interface Props {
  primary: WorkStyleType;
  notSuited: WorkStyleType;
}

export function WorkStyleCard({ primary, notSuited }: Props) {
  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">向いている働き方タイプ</h2>
      <div className="bg-white border-2 border-zinc-900 rounded-2xl p-5 mb-3">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{primary.emoji}</span>
          <h3 className="text-lg font-bold text-zinc-900">{primary.name}</h3>
        </div>
        <p className="text-zinc-600 text-sm leading-relaxed">{primary.description}</p>
      </div>
      <div className="bg-zinc-50 rounded-xl p-4">
        <p className="text-xs text-zinc-500 leading-relaxed">
          <span className="font-semibold text-zinc-600">向いていない働き方：</span>
          {notSuited.name} — {notSuited.notSuited}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: components/result/SideHustleRank.tsxを作成する**

```tsx
// components/result/SideHustleRank.tsx
import type { RankedSideHustle, SideHustle } from "@/lib/types";

interface Props {
  ranked: RankedSideHustle[];
  notRecommended: SideHustle[];
}

const RANK_ICONS = ["🥇", "🥈", "🥉", "4位", "5位"];

export function SideHustleRank({ ranked, notRecommended }: Props) {
  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">おすすめ副業ランキング</h2>
      <div className="space-y-3 mb-6">
        {ranked.slice(0, 5).map((sh, i) => (
          <div key={sh.id} className="bg-white rounded-xl p-4 border border-zinc-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{RANK_ICONS[i]}</span>
              <span className="font-semibold text-zinc-800 text-sm">{sh.name}</span>
            </div>
            <p className="text-xs text-zinc-500 mb-1">{sh.matchReason}</p>
            <p className="text-xs text-zinc-400">月収目安（6ヶ月後）: {sh.income6months}</p>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-zinc-500 mb-2">おすすめしない副業</h3>
      <div className="space-y-2">
        {notRecommended.map(sh => (
          <div key={sh.id} className="bg-zinc-50 rounded-xl p-3">
            <p className="text-xs font-medium text-zinc-500">✗ {sh.name}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{sh.whyGood}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: components/result/Roadmap.tsxを作成する**

```tsx
// components/result/Roadmap.tsx
interface Props {
  days: string[];
}

export function Roadmap({ days }: Props) {
  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">7日間ロードマップ</h2>
      <div className="space-y-3">
        {days.map((action, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-xs font-bold text-zinc-400 pt-0.5 w-10 shrink-0">
              Day {i + 1}
            </span>
            <p className="text-sm text-zinc-700 leading-relaxed">{action}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 7: コミット**

```bash
git add components/result/
git commit -m "feat: implement result UI components"
```

---

## Task 11: 結果ページ

**Files:**
- Create: `app/result/page.tsx`

- [ ] **Step 1: app/result/page.tsxを作成する**

```tsx
// app/result/page.tsx
"use client";
import { useEffect, useState } from "react";
import type { DiagnosisResult } from "@/lib/types";
import { TodayAction } from "@/components/result/TodayAction";
import { TraitTags } from "@/components/result/TraitTags";
import { StrengthText } from "@/components/result/StrengthText";
import { WorkStyleCard } from "@/components/result/WorkStyleCard";
import { SideHustleRank } from "@/components/result/SideHustleRank";
import { Roadmap } from "@/components/result/Roadmap";

export default function ResultPage() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("diagnosis_result");
    if (stored) setResult(JSON.parse(stored));
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-500 text-sm">診断結果が見つかりません</p>
        <a href="/diagnosis" className="text-zinc-900 underline text-sm">
          診断をはじめる
        </a>
      </div>
    );
  }

  const shareText = encodeURIComponent(
    `副業コンパスAIで診断した結果、私は「${result.primaryTypeDetail.name}」タイプでした！ #副業コンパスAI`
  );

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-xl font-bold text-zinc-800 text-center">
          診断が完了しました
        </h1>

        <TodayAction action={result.todayAction} />
        <TraitTags labels={result.traitLabels} />
        <StrengthText text={result.strengthText} />
        <WorkStyleCard
          primary={result.primaryTypeDetail}
          notSuited={result.notSuitedTypeDetail}
        />
        <SideHustleRank
          ranked={result.rankedSideHustles}
          notRecommended={result.notRecommended}
        />
        <Roadmap days={result.weekRoadmap} />

        <div className="flex flex-col gap-3 pt-4 pb-8">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-zinc-900 text-white rounded-full text-center text-sm font-semibold"
          >
            Xでシェアする
          </a>
          <a
            href="/diagnosis"
            className="w-full py-3.5 border-2 border-zinc-200 text-zinc-600 rounded-full text-center text-sm font-medium"
          >
            もう一度診断する
          </a>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: E2E動作確認する**

```bash
npm run dev
```

1. http://localhost:3000 → 「無料で診断をはじめる」
2. 12問すべて回答する
3. `/result` に自動遷移し、全セクションが表示されること
4. 「今日やること」が最上部に表示されること
5. 「もう一度診断する」で最初から始められること

- [ ] **Step 3: コミット**

```bash
git add app/result/
git commit -m "feat: implement result page"
```

---

## Task 12: スマホ表示調整

**Files:**
- Modify: `app/layout.tsx`（viewportメタタグ確認）
- Modify: `components/diagnosis/QuestionCard.tsx`（タップ領域）
- Modify: `app/result/page.tsx`（セクション間スペース調整）

- [ ] **Step 1: layout.tsxのviewport設定を確認する**

`app/layout.tsx` を開き、viewportの設定が適切かを確認する。Next.js 16のApp RouterではMetadata APIを使う。

```bash
cat app/layout.tsx
```

`viewport` エクスポートがなければ追加：

```typescript
// app/layout.tsxに追加
export const viewport = {
  width: "device-width",
  initialScale: 1,
};
```

- [ ] **Step 2: スマホ実機 or DevToolsで動作確認する**

Chrome DevTools で iPhone SE（375px）に切り替えて以下を確認：
- トップページ: テキストが切れずに表示されること
- 診断画面: 選択肢が親指で押せるサイズ（44px以上の高さ）であること
- 結果ページ: 「今日やること」が画面上部に見えること

- [ ] **Step 3: 選択肢の最小タップ高さを保証する（必要な場合のみ修正）**

`OptionCard.tsx` の `py-3.5`（約56px）は十分なタップ高さ。もし44px未満になっていれば `min-h-[44px]` を追加する。

- [ ] **Step 4: コミット（変更があれば）**

```bash
git add app/layout.tsx
git commit -m "fix: ensure proper mobile viewport and tap targets"
```

---

## Task 13: README更新

**Files:**
- Modify: `README.md`

- [ ] **Step 1: READMEにデプロイURLを追記する**

Vercelデプロイ後に `README.md` の「サービスURL」欄に実URLを記入する。

- [ ] **Step 2: コミット**

```bash
git add README.md
git commit -m "docs: update README with service URL"
```

---

## Self-Review

### 1. スペックカバレッジ確認

| 要件 | タスク |
|------|-------|
| 12問・選択式・Q5複数選択 | Task 2（questions.ts） |
| タグ付与ロジック | Task 3 |
| 働き方タイプスコアリング | Task 4 |
| 副業マッチング | Task 5 |
| 強みテキスト生成 | Task 4（strength-text.ts） |
| 結果統合 | Task 6 |
| トップページ | Task 7 |
| 診断UI（プログレス・選択肢） | Task 8 |
| 診断ページ | Task 9 |
| 結果UI（今日やること最上部） | Task 10 |
| 結果ページ・localStorage | Task 11 |
| スマホ対応 | Task 12 |
| やり直しボタン | Task 11（「もう一度診断する」リンク） |
| Xシェア | Task 11 |

### 2. プレースホルダーなし確認

- Task 2のside-hustles.tsに「残り16件はdocs/side-hustles.mdから追加」という参照あり。これはドキュメントへの具体的な参照であり、TBDではない。

### 3. 型整合性確認

- `DiagnosisResult.profile.aversionTags: AversionTagId[]`（配列）— result-generator.tsで`[...profile.aversionTags]`として変換済み
- `weekRoadmap: [string×7]`（SideHustle）→ `weekRoadmap: string[]`（DiagnosisResult）— result-generator.tsで`[...topSideHustle.weekRoadmap]`として展開済み
- `getNotRecommended`の戻り値から`score`と`matchReason`を除去 — `{ score: _s, matchReason: _r, ...sh }`で処理済み
