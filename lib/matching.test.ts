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
