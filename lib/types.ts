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

export interface TenMinuteMission {
  title: string;
  steps: string[];
}

export interface StumblingPoint {
  worry: string;
  solution: string;
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
  beginnerFriendly: "easy" | "medium" | "hard";
  timeToRevenue: string;
  ongoingBurden: "low" | "medium" | "high";
  aiCompatibility: "low" | "medium" | "high";
  incomeMilestones: [string, string, string];
  tenMinuteMission: TenMinuteMission;
  stumblingPoints: [StumblingPoint, StumblingPoint];
  aiPrompt: string;
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
  notRecommendedReason: string;
  todayAction: string;
  weekRoadmap: string[];
}
