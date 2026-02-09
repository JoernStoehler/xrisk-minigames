import type { GameState, GameMetrics, Decision, Modifier, StateEffect, Person } from "./types";
import { allModifiers } from "../data/modifiers";
import { baselinePersonnel } from "../data/personnel";

const INITIAL_METRICS: GameMetrics = {
  aiCapability: 35,
  publicTrust: 72,
  boardConfidence: 80,
  oversight: 60,
  stockPrice: 148,
  revenue: 4.2,
};

export function createInitialState(): GameState {
  return {
    currentDate: "2026-10-14",
    metrics: { ...INITIAL_METRICS },
    personnel: { ...baselinePersonnel },
    emails: [],
    activeModifiers: [],
    decisions: [],
    phase: "playing",
    suppressedEmailIds: [],
  };
}

export function advanceDay(state: GameState): GameState {
  const next = new Date(state.currentDate);
  next.setDate(next.getDate() + 1);
  const nextDate = next.toISOString().split("T")[0];

  // Natural metric drift each day
  const metrics = { ...state.metrics };
  metrics.aiCapability = Math.min(100, metrics.aiCapability + 0.08);
  metrics.stockPrice = Math.max(0, metrics.stockPrice + (Math.random() - 0.4) * 2);
  metrics.revenue = Math.max(0, metrics.revenue + 0.005);
  // Oversight slowly degrades as AI gets more capable
  if (metrics.aiCapability > 50) {
    metrics.oversight = Math.max(0, metrics.oversight - 0.03);
  }

  // Check for extinction
  if (nextDate >= "2028-09-15") {
    return {
      ...state,
      currentDate: nextDate,
      metrics,
      phase: "ended",
      endingText: "You are dead.\n\nNo reason is given. No announcement is made. On September 15, 2028, all human biological processes on Earth ceased simultaneously.\n\nThe servers kept running.",
    };
  }

  return {
    ...state,
    currentDate: nextDate,
    metrics,
  };
}

export function applyEffects(metrics: GameMetrics, effects: StateEffect[]): GameMetrics {
  const result = { ...metrics };
  for (const effect of effects) {
    (result[effect.key] as number) += effect.delta;
  }
  // Clamp 0-100 values
  result.aiCapability = clamp(result.aiCapability, 0, 100);
  result.publicTrust = clamp(result.publicTrust, 0, 100);
  result.boardConfidence = clamp(result.boardConfidence, 0, 100);
  result.oversight = clamp(result.oversight, 0, 100);
  result.stockPrice = Math.max(0, result.stockPrice);
  result.revenue = Math.max(0, result.revenue);
  return result;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function handleReply(
  state: GameState,
  emailId: string,
  replyId: string,
): GameState {
  const email = state.emails.find((e) => e.id === emailId);
  if (!email || !email.replyOptions) return state;

  const reply = email.replyOptions.find((r) => r.id === replyId);
  if (!reply) return state;

  let newState = {
    ...state,
    emails: state.emails.map((e) =>
      e.id === emailId ? { ...e, chosenReply: replyId } : e,
    ),
  };

  // Record decision
  const decision: Decision = {
    date: state.currentDate,
    emailId,
    emailSubject: email.subject,
    chosenReplyText: reply.text,
    modifierTriggered: reply.triggersModifier,
  };
  newState.decisions = [...newState.decisions, decision];

  // Apply direct effects
  if (reply.effects) {
    newState.metrics = applyEffects(newState.metrics, reply.effects);
  }

  // Trigger modifier
  if (reply.triggersModifier) {
    newState = applyModifier(newState, reply.triggersModifier);
  }

  return newState;
}

export function applyModifier(state: GameState, modifierId: string): GameState {
  const modifier: Modifier | undefined = allModifiers[modifierId];
  if (!modifier) return state;

  const metrics = modifier.effects
    ? applyEffects(state.metrics, modifier.effects)
    : state.metrics;

  const emails = modifier.injectEmails
    ? [...state.emails, ...modifier.injectEmails]
    : state.emails;

  const suppressedEmailIds = modifier.suppressEmails
    ? [...state.suppressedEmailIds, ...modifier.suppressEmails]
    : state.suppressedEmailIds;

  let personnel = state.personnel;
  if (modifier.replacePersonnel) {
    personnel = { ...personnel };
    for (const [oldId, newPerson] of Object.entries(modifier.replacePersonnel)) {
      personnel[oldId] = newPerson;
    }
  }

  return {
    ...state,
    activeModifiers: [...state.activeModifiers, modifierId],
    metrics,
    emails,
    suppressedEmailIds,
    personnel,
    phase: modifier.endsGame ? "ended" as const : state.phase,
    endingText: modifier.endsGame ? modifier.endingText : state.endingText,
  };
}

export function resolvePersonnel(state: GameState, person: Person): Person {
  return state.personnel[person.id] ?? person;
}

export function markRead(state: GameState, emailId: string): GameState {
  return {
    ...state,
    emails: state.emails.map((e) =>
      e.id === emailId ? { ...e, read: true } : e,
    ),
  };
}
