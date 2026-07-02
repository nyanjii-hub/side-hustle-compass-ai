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
