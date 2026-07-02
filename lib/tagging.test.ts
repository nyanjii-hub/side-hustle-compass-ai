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
