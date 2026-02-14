// === Regions ===

export type RegionId = "us" | "china" | "eu" | "russia" | "row";

export interface RegionState {
  id: RegionId;
  name: string;
  cooperation: number; // 0-100
  intelligenceCoverage: number; // 0-100
  inspectorDeployed: boolean;
}

// === Resources ===

export interface Resources {
  inspectorTeams: number; // Available (not deployed)
  totalInspectorTeams: number; // Total (deployed + available)
  politicalCapital: number; // 0-100
  safetyResearchProgress: number; // 0-100, win at 100
}

// === Events ===

export type EventType =
  | "chip_smuggling"
  | "rogue_datacenter"
  | "prohibited_research"
  | "political_pressure"
  | "whistleblower_tip"
  | "non_signatory_threat"
  | "algorithmic_breakthrough"
  | "corporate_evasion"
  | "treaty_withdrawal_threat"
  | "public_backlash";

export type UrgencyLevel = "yellow" | "orange" | "red";

export type ResponseType =
  | "investigate"
  | "inspect"
  | "sanction"
  | "negotiate"
  | "protective_action"
  | "fund_safety"
  | "ignore";

export interface EventResponse {
  type: ResponseType;
  label: string;
  description: string;
  politicalCapitalCost: number; // How much PC this costs (positive = costs)
  requiresInspector: boolean;
  successProbability: number; // 0-1 base probability
  successEffects: StateEffects;
  failureEffects: StateEffects;
}

export interface GameEvent {
  id: string;
  templateId: string;
  type: EventType;
  region: RegionId;
  headline: string;
  description: string;
  hiddenDescription: string; // Revealed on successful investigation
  urgency: UrgencyLevel;
  weekCreated: number;
  deadlineWeek: number;
  responses: EventResponse[];
  resolved: boolean;
  outcome?: "success" | "failure" | "expired" | "catastrophe";
  informationQuality: "low" | "medium" | "high";
}

// === State Effects ===

export interface StateEffects {
  politicalCapital?: number;
  cooperation?: Partial<Record<RegionId, number>>;
  globalSupport?: number;
  algorithmicProgress?: number;
  safetyResearchProgress?: number;
  // Special: "self" means "the region where this event happened"
  cooperationSelf?: number;
}

// === Game State ===

export type GameSpeed = 0 | 1 | 2 | 4;

export type GamePhase = "menu" | "playing" | "won" | "lost";

export type LossReason = "asi_created" | "treaty_collapsed" | "public_revolt";

export type Difficulty = "tutorial" | "normal" | "realistic";

export interface GameState {
  phase: GamePhase;
  difficulty: Difficulty;
  week: number; // 0-based, week 0 = Jan 2027
  maxWeeks: number;
  speed: GameSpeed;
  regions: Record<RegionId, RegionState>;
  resources: Resources;
  activeEvents: GameEvent[];
  eventLog: GameEvent[];
  globalSupport: number; // 0-100
  algorithmicProgress: number; // 0-100, lose if 100
  safetyResearchFunding: number; // 0-3 allocation level
  lossReason?: LossReason;
  rngState: number; // PRNG state (mutated each use)
  stats: GameStats;
}

export interface GameStats {
  eventsHandled: number;
  eventsIgnored: number;
  inspectionsLaunched: number;
  sanctionsApplied: number;
  protectiveActions: number;
  weeksSurvived: number;
}

// === Event Templates (content layer) ===

export interface EventTemplate {
  id: string;
  type: EventType;
  regions: RegionId[] | "any";
  headline: string; // Can contain {region} placeholder
  description: string;
  hiddenDescription: string;
  baseWeight: number; // Higher = more likely
  minWeek: number;
  maxWeek?: number;
  urgencyWeeks: number; // Weeks before catastrophe
  responses: EventResponse[];
  weightModifier?: (state: GameState) => number; // Multiplier on baseWeight
  catastropheEffects: StateEffects;
}

export interface DifficultyConfig {
  label: string;
  description: string;
  maxWeeks: number;
  startingInspectorTeams: number;
  startingPoliticalCapital: number;
  startingIntelligence: number;
  startingCooperation: number;
  politicalCapitalRegen: number; // Per week
  safetyResearchBaseRate: number; // Progress per week at funding level 3
  algorithmicProgressRate: number; // Base progress per week
  eventFrequency: number; // Average events per week
  signalQualityBonus: number; // Added to intel-based quality
  globalSupportDecay: number; // Per week
}
