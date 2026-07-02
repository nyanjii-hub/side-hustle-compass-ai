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
