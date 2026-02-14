import type {
  EventTemplate,
  GameEvent,
  GameState,
  RegionId,
} from "./types";
import { randomPoisson, weightedPick } from "./rng";
import { REGION_IDS } from "../data/regions";
import { DIFFICULTIES } from "../data/difficulties";

let eventCounter = 0;

export function resetEventCounter(): void {
  eventCounter = 0;
}

function nextEventId(): string {
  return `evt-${++eventCounter}`;
}

export function getInformationQuality(
  state: GameState,
  regionId: RegionId,
): "low" | "medium" | "high" {
  const config = DIFFICULTIES[state.difficulty];
  const region = state.regions[regionId];
  const intel = region.intelligenceCoverage + config.signalQualityBonus;
  if (intel >= 65) return "high";
  if (intel >= 35) return "medium";
  return "low";
}

function pickRegion(
  state: GameState,
  template: EventTemplate,
): RegionId {
  const candidates =
    template.regions === "any" ? [...REGION_IDS] : [...template.regions];

  // Weight by inverse cooperation (lower cooperation = more likely to have problems)
  const weights = candidates.map((id) => {
    const coop = state.regions[id].cooperation;
    return Math.max(1, 100 - coop);
  });

  return weightedPick(state, candidates, weights);
}

export function generateEvents(
  state: GameState,
  templates: EventTemplate[],
): GameEvent[] {
  const config = DIFFICULTIES[state.difficulty];

  // How many events this week? Poisson distribution
  // Increase frequency as algorithmic progress rises
  const progressMultiplier = 1 + state.algorithmicProgress * 0.005;
  const adjustedFrequency = config.eventFrequency * progressMultiplier;
  const count = randomPoisson(state, adjustedFrequency);

  if (count === 0) return [];

  // Filter eligible templates
  const eligible = templates.filter((t) => {
    if (state.week < t.minWeek) return false;
    if (t.maxWeek !== undefined && state.week > t.maxWeek) return false;
    return true;
  });

  if (eligible.length === 0) return [];

  // Compute weights
  const weights = eligible.map((t) => {
    let w = t.baseWeight;
    if (t.weightModifier) {
      w *= t.weightModifier(state);
    }
    return Math.max(0, w);
  });

  const events: GameEvent[] = [];
  for (let i = 0; i < count; i++) {
    const template = weightedPick(state, eligible, weights);
    const region = pickRegion(state, template);
    const quality = getInformationQuality(state, region);

    const headline = template.headline.replace(
      "{region}",
      state.regions[region].name,
    );
    const description = template.description.replace(
      "{region}",
      state.regions[region].name,
    );

    events.push({
      id: nextEventId(),
      templateId: template.id,
      type: template.type,
      region,
      headline,
      description,
      hiddenDescription: template.hiddenDescription,
      urgency: "yellow",
      weekCreated: state.week,
      deadlineWeek: state.week + template.urgencyWeeks,
      responses: template.responses,
      resolved: false,
      informationQuality: quality,
    });
  }

  return events;
}
