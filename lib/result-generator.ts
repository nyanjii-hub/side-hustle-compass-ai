import type { UserAnswer, DiagnosisResult, TagId, WorkStyleTypeId } from "./types";
import { buildUserProfile } from "./tagging";
import { calculateTypeScores, getPrimaryType, getSecondaryType, getTopTags } from "./scoring";
import { generateStrengthText } from "./strength-text";
import { rankSideHustles, getNotRecommended } from "./matching";
import { workStyleTypes } from "@/data/work-style-types";

const NOT_RECOMMENDED_REASONS: Record<WorkStyleTypeId, string> = {
  asset_builder:
    "あなたはコツコツと資産を積み上げることが得意なタイプです。短期間で成果が出にくい副業よりも、継続するほど資産が積み上がり、時間が経つほど収入が安定していく副業の方が、強みが最大限に活きます。",
  contract_skill:
    "あなたは細かさと整理力でクライアントから信頼を得るタイプです。単純な繰り返し作業よりも、スキルと丁寧さが正しく評価される副業の方が、あなたの本来の価値が認められます。",
  content_sales:
    "あなたは自分の知識・成果物を商品化することが得意なタイプです。大量の対人対応が必要な副業よりも、一度作ったコンテンツが繰り返し売れる仕組みを作る副業の方が、時間を効率よく収益に変えられます。",
  support_agent:
    "あなたは人をサポートし、誰かの役に立っているという実感がモチベーションになるタイプです。孤独に黙々と取り組む副業よりも、相手の課題を一緒に解決していく副業の方が、長続きしやすく成果も出やすいです。",
  automation_builder:
    "あなたは仕組みを作り・効率化することが得意なタイプです。繰り返しの手作業が中心の副業よりも、一度作った仕組みが継続的に価値を生み出す副業の方が、あなたの強みが圧倒的に活きます。",
};

const TAG_LABELS: Record<TagId, string> = {
  writing: "文章力",
  teaching: "教える力",
  creative: "創造力",
  visual: "視覚センス",
  systematic: "仕組み化",
  organizing: "整理整頓",
  detail_oriented: "細かさ",
  analytical: "分析力",
  research: "調べる力",
  patient: "継続力",
  problem_solving: "問題解決力",
  collecting: "収集力",
  helping: "サポート力",
  communicating: "コミュニケーション",
  technical: "デジタル適性",
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
      aversionTags: [...profile.aversionTags],
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
    notRecommendedReason: NOT_RECOMMENDED_REASONS[primaryType],
    todayAction: topSideHustle?.todayAction ?? "",
    weekRoadmap: topSideHustle ? [...topSideHustle.weekRoadmap] : [],
  };
}
