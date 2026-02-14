import type { DifficultyConfig } from "../engine/types";

export const DIFFICULTIES: Record<string, DifficultyConfig> = {
  tutorial: {
    label: "Tutorial",
    description:
      "5-year scenario. Generous resources, clear signals. Learn the mechanics.",
    maxWeeks: 260, // 5 years
    startingInspectorTeams: 4,
    startingPoliticalCapital: 80,
    startingIntelligence: 70,
    startingCooperation: 80,
    politicalCapitalRegen: 3,
    safetyResearchBaseRate: 0.15, // ~13 years at max funding, but only 5yr span so must be generous
    algorithmicProgressRate: 0.02,
    eventFrequency: 0.4, // ~1 event every 2.5 weeks
    signalQualityBonus: 20,
    globalSupportDecay: 0.05,
  },
  normal: {
    label: "Normal",
    description:
      "20-year scenario. A pause is feasible but enforcement is the hard part.",
    maxWeeks: 1040, // 20 years
    startingInspectorTeams: 3,
    startingPoliticalCapital: 60,
    startingIntelligence: 50,
    startingCooperation: 65,
    politicalCapitalRegen: 2,
    safetyResearchBaseRate: 0.04, // ~480 weeks at max = ~9 years at full funding
    algorithmicProgressRate: 0.04,
    eventFrequency: 0.6,
    signalQualityBonus: 0,
    globalSupportDecay: 0.08,
  },
  realistic: {
    label: "Realistic",
    description:
      "20-year scenario. Scarce resources, noisy signals, fast progress. Barely survivable.",
    maxWeeks: 1040,
    startingInspectorTeams: 2,
    startingPoliticalCapital: 40,
    startingIntelligence: 35,
    startingCooperation: 50,
    politicalCapitalRegen: 1.5,
    safetyResearchBaseRate: 0.03,
    algorithmicProgressRate: 0.06,
    eventFrequency: 0.9,
    signalQualityBonus: -15,
    globalSupportDecay: 0.12,
  },
};
