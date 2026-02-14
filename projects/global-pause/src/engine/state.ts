import type {
  Difficulty,
  GameEvent,
  GamePhase,
  GameSpeed,
  GameState,
  LossReason,
  RegionId,
  ResponseType,
  StateEffects,
} from "./types";
import { random } from "./rng";
import { DIFFICULTIES } from "../data/difficulties";
import { createRegionStates, REGION_IDS } from "../data/regions";

export function createInitialState(
  difficulty: Difficulty,
  seed?: number,
): GameState {
  const config = DIFFICULTIES[difficulty];
  const rngSeed = seed ?? (Date.now() ^ (Math.random() * 0xffffffff));

  return {
    phase: "playing",
    difficulty,
    week: 0,
    maxWeeks: config.maxWeeks,
    speed: 0, // Start paused
    regions: createRegionStates(
      config.startingCooperation,
      config.startingIntelligence,
    ),
    resources: {
      inspectorTeams: config.startingInspectorTeams,
      totalInspectorTeams: config.startingInspectorTeams,
      politicalCapital: config.startingPoliticalCapital,
      safetyResearchProgress: 0,
    },
    activeEvents: [],
    eventLog: [],
    globalSupport: 70,
    algorithmicProgress: 0,
    safetyResearchFunding: 1, // Start at level 1
    lossReason: undefined,
    rngState: rngSeed,
    stats: {
      eventsHandled: 0,
      eventsIgnored: 0,
      inspectionsLaunched: 0,
      sanctionsApplied: 0,
      protectiveActions: 0,
      weeksSurvived: 0,
    },
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function tickWeek(state: GameState): GameState {
  if (state.phase !== "playing") return state;

  const config = DIFFICULTIES[state.difficulty];
  const next = structuredClone(state);

  next.week++;
  next.stats.weeksSurvived = next.week;

  // Regenerate political capital
  next.resources.politicalCapital = clamp(
    next.resources.politicalCapital + config.politicalCapitalRegen,
    0,
    100,
  );

  // Safety research funding costs political capital, advances research
  const fundingCostPerWeek = next.safetyResearchFunding * 0.5;
  if (next.resources.politicalCapital >= fundingCostPerWeek) {
    next.resources.politicalCapital -= fundingCostPerWeek;
    const rate =
      config.safetyResearchBaseRate * (next.safetyResearchFunding / 3);
    next.resources.safetyResearchProgress = clamp(
      next.resources.safetyResearchProgress + rate,
      0,
      100,
    );
  }

  // Algorithmic progress advances (the world doesn't stand still)
  next.algorithmicProgress = clamp(
    next.algorithmicProgress + config.algorithmicProgressRate,
    0,
    100,
  );

  // Global support decays slightly each week
  next.globalSupport = clamp(
    next.globalSupport - config.globalSupportDecay,
    0,
    100,
  );

  // Escalate unresolved events
  for (const event of next.activeEvents) {
    if (event.resolved) continue;
    const weeksLeft = event.deadlineWeek - next.week;
    const totalWeeks = event.deadlineWeek - event.weekCreated;
    if (weeksLeft <= 0) {
      // Catastrophe — event expired
      event.resolved = true;
      event.outcome = "catastrophe";
      next.stats.eventsIgnored++;
    } else if (weeksLeft < totalWeeks * 0.33) {
      event.urgency = "red";
    } else if (weeksLeft < totalWeeks * 0.66) {
      event.urgency = "orange";
    }
  }

  // Apply catastrophe effects for newly expired events
  const catastrophes = next.activeEvents.filter(
    (e) => e.outcome === "catastrophe" && e.weekCreated !== next.week,
  );
  for (const event of catastrophes) {
    // Find template catastrophe effects — stored on the event's responses
    // Use default catastrophe effects based on type
    const effects = getDefaultCatastropheEffects(event.type);
    applyEffects(next, effects, event.region);
  }

  // Move resolved events to log
  const resolved = next.activeEvents.filter((e) => e.resolved);
  next.eventLog.push(...resolved);
  next.activeEvents = next.activeEvents.filter((e) => !e.resolved);

  // Check win/lose
  const result = checkWinLose(next);
  next.phase = result.phase;
  next.lossReason = result.lossReason;

  return next;
}

function getDefaultCatastropheEffects(
  type: GameEvent["type"],
): StateEffects {
  switch (type) {
    case "rogue_datacenter":
      return { algorithmicProgress: 12, cooperationSelf: -15 };
    case "chip_smuggling":
      return { algorithmicProgress: 5, cooperationSelf: -8 };
    case "prohibited_research":
      return { algorithmicProgress: 8, cooperationSelf: -5 };
    case "treaty_withdrawal_threat":
      return { cooperationSelf: -30, globalSupport: -10 };
    case "public_backlash":
      return { globalSupport: -15, politicalCapital: -10 };
    case "non_signatory_threat":
      return { algorithmicProgress: 10, globalSupport: -5 };
    case "algorithmic_breakthrough":
      return { algorithmicProgress: 15 };
    case "corporate_evasion":
      return { algorithmicProgress: 4, politicalCapital: -8 };
    case "political_pressure":
      return { politicalCapital: -15, cooperationSelf: -10 };
    case "whistleblower_tip":
      return { cooperationSelf: -5 }; // Missed opportunity
  }
}

export function applyEffects(
  state: GameState,
  effects: StateEffects,
  eventRegion: RegionId,
): void {
  if (effects.politicalCapital) {
    state.resources.politicalCapital = clamp(
      state.resources.politicalCapital + effects.politicalCapital,
      0,
      100,
    );
  }
  if (effects.globalSupport) {
    state.globalSupport = clamp(
      state.globalSupport + effects.globalSupport,
      0,
      100,
    );
  }
  if (effects.algorithmicProgress) {
    state.algorithmicProgress = clamp(
      state.algorithmicProgress + effects.algorithmicProgress,
      0,
      100,
    );
  }
  if (effects.safetyResearchProgress) {
    state.resources.safetyResearchProgress = clamp(
      state.resources.safetyResearchProgress + effects.safetyResearchProgress,
      0,
      100,
    );
  }
  if (effects.cooperationSelf) {
    const r = state.regions[eventRegion];
    r.cooperation = clamp(r.cooperation + effects.cooperationSelf, 0, 100);
  }
  if (effects.cooperation) {
    for (const [rid, delta] of Object.entries(effects.cooperation)) {
      const r = state.regions[rid as RegionId];
      if (r && delta) {
        r.cooperation = clamp(r.cooperation + delta, 0, 100);
      }
    }
  }
}

export function respondToEvent(
  state: GameState,
  eventId: string,
  responseType: ResponseType,
): GameState {
  const next = structuredClone(state);
  const event = next.activeEvents.find((e) => e.id === eventId);
  if (!event || event.resolved) return state;

  const response = event.responses.find((r) => r.type === responseType);
  if (!response) return state;

  // Check costs
  if (next.resources.politicalCapital < response.politicalCapitalCost) {
    return state; // Can't afford
  }
  if (response.requiresInspector && next.resources.inspectorTeams <= 0) {
    return state; // No inspectors available
  }

  // Pay costs
  next.resources.politicalCapital -= response.politicalCapitalCost;
  if (response.requiresInspector) {
    next.resources.inspectorTeams--;
    next.stats.inspectionsLaunched++;
  }

  // Track stats
  next.stats.eventsHandled++;
  if (responseType === "sanction") next.stats.sanctionsApplied++;
  if (responseType === "protective_action") next.stats.protectiveActions++;

  // Roll success
  let probability = response.successProbability;
  // Bonus from inspector in region
  const region = next.regions[event.region];
  if (region.inspectorDeployed) probability += 0.1;
  // Bonus from high intelligence coverage
  if (region.intelligenceCoverage > 50) {
    probability += (region.intelligenceCoverage - 50) * 0.002;
  }
  probability = clamp(probability, 0, 0.95);

  // Use RNG for outcome
  const roll = random(next);
  const success = roll < probability;

  event.resolved = true;
  event.outcome = success ? "success" : "failure";
  applyEffects(
    next,
    success ? response.successEffects : response.failureEffects,
    event.region,
  );

  // Return inspector after response
  if (response.requiresInspector) {
    next.resources.inspectorTeams++;
  }

  return next;
}

export function deployInspector(
  state: GameState,
  regionId: RegionId,
): GameState {
  const next = structuredClone(state);
  const region = next.regions[regionId];
  if (region.inspectorDeployed || next.resources.inspectorTeams <= 0)
    return state;

  region.inspectorDeployed = true;
  next.resources.inspectorTeams--;
  // Boost intelligence coverage when inspector is present
  region.intelligenceCoverage = clamp(
    region.intelligenceCoverage + 15,
    0,
    100,
  );
  return next;
}

export function recallInspector(
  state: GameState,
  regionId: RegionId,
): GameState {
  const next = structuredClone(state);
  const region = next.regions[regionId];
  if (!region.inspectorDeployed) return state;

  region.inspectorDeployed = false;
  next.resources.inspectorTeams++;
  region.intelligenceCoverage = clamp(
    region.intelligenceCoverage - 15,
    0,
    100,
  );
  return next;
}

export function setSpeed(state: GameState, speed: GameSpeed): GameState {
  return { ...state, speed };
}

export function setSafetyFunding(state: GameState, level: number): GameState {
  return { ...state, safetyResearchFunding: clamp(level, 0, 3) };
}

export function checkWinLose(state: GameState): {
  phase: GamePhase;
  lossReason?: LossReason;
} {
  // Win: safety research complete
  if (state.resources.safetyResearchProgress >= 100) {
    return { phase: "won" };
  }

  // Lose: ASI created
  if (state.algorithmicProgress >= 100) {
    return { phase: "lost", lossReason: "asi_created" };
  }

  // Lose: treaty collapsed (3+ regions below 15 cooperation)
  const collapsedRegions = REGION_IDS.filter(
    (id) => state.regions[id].cooperation < 15,
  ).length;
  if (collapsedRegions >= 3) {
    return { phase: "lost", lossReason: "treaty_collapsed" };
  }

  // Lose: public revolt
  if (state.globalSupport <= 0) {
    return { phase: "lost", lossReason: "public_revolt" };
  }

  // Lose: time ran out
  if (state.week >= state.maxWeeks) {
    return { phase: "lost", lossReason: "asi_created" };
  }

  return { phase: "playing" };
}

export function weekToDate(week: number): string {
  const startYear = 2027;
  const totalMonths = Math.floor((week / 52) * 12);
  const year = startYear + Math.floor(totalMonths / 12);
  const month = totalMonths % 12;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[month]} ${year}`;
}
