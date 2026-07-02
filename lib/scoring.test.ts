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
