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
