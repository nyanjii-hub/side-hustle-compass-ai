import type { UserAnswer, DiagnosisResult, TagId } from "./types";
import { buildUserProfile } from "./tagging";
import { calculateTypeScores, getPrimaryType, getSecondaryType, getTopTags } from "./scoring";
import { generateStrengthText } from "./strength-text";
import { rankSideHustles, getNotRecommended } from "./matching";
import { workStyleTypes } from "@/data/work-style-types";

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
    todayAction: topSideHustle?.todayAction ?? "",
    weekRoadmap: topSideHustle ? [...topSideHustle.weekRoadmap] : [],
  };
}
