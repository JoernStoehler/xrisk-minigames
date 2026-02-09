import type { GameState, GameMetrics, Decision, StateEffect } from "./types";

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
    emails: [],
    decisions: [],
    phase: "playing",
  };
}

export function advanceDay(state: GameState): GameState {
  const next = new Date(state.currentDate);
  next.setDate(next.getDate() + 1);
  const nextDate = next.toISOString().split("T")[0];

  const metrics = { ...state.metrics };
  metrics.aiCapability = Math.min(100, metrics.aiCapability + 0.08);
  metrics.stockPrice = Math.max(0, metrics.stockPrice + (Math.random() - 0.4) * 2);
  metrics.revenue = Math.max(0, metrics.revenue + 0.005);
  if (metrics.aiCapability > 50) {
    metrics.oversight = Math.max(0, metrics.oversight - 0.03);
  }

  if (nextDate >= "2028-09-15") {
    return {
      ...state,
      currentDate: nextDate,
      metrics,
      phase: "ended",
      endingText:
        "You are dead.\n\nNo reason is given. No announcement is made. On September 15, 2028, all human biological processes on Earth ceased simultaneously.\n\nThe servers kept running.",
    };
  }

  return { ...state, currentDate: nextDate, metrics };
}

export function applyEffects(metrics: GameMetrics, effects: StateEffect[]): GameMetrics {
  const result = { ...metrics };
  for (const effect of effects) {
    (result[effect.key] as number) += effect.delta;
  }
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
  if (!email?.replyOptions) return state;

  const reply = email.replyOptions.find((r) => r.id === replyId);
  if (!reply) return state;

  // Mark the reply
  let next: GameState = {
    ...state,
    emails: state.emails.map((e) =>
      e.id === emailId ? { ...e, chosenReply: replyId } : e,
    ),
  };

  // Record decision
  if (reply.decisionId) {
    const decision: Decision = {
      id: reply.decisionId,
      choice: replyId,
      choiceText: reply.text,
      date: state.currentDate,
      emailId,
      emailSubject: email.subject,
    };
    next = { ...next, decisions: [...next.decisions, decision] };
  }

  // Apply metric effects
  if (reply.effects) {
    next = { ...next, metrics: applyEffects(next.metrics, reply.effects) };
  }

  // End game if reply triggers it
  if (reply.endsGame) {
    next = { ...next, phase: "ended", endingText: reply.endingText };
  }

  return next;
}

export function markRead(state: GameState, emailId: string): GameState {
  return {
    ...state,
    emails: state.emails.map((e) =>
      e.id === emailId ? { ...e, read: true } : e,
    ),
  };
}

/** Utility: add N days to a date string. */
export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
