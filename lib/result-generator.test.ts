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
