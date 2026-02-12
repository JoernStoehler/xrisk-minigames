/**
 * Main game hook — the only stateful layer between the pure engine and React components.
 *
 * Responsibilities:
 * - Persists GameState to localStorage (auto-save on every state change)
 * - Computes visible emails by running all scenario generators against current state
 * - Provides advanceToNext() which skips time to the next email delivery date
 * - Exposes reply/read/star/restart callbacks for components
 *
 * Email computation (computeEmails): for each EmailDef in scenario.ts, resolves its
 * delivery date, checks if ≤ currentDate, runs the generator, overlays UI state
 * (read/starred/chosenReply), and strips expired reply options.
 *
 * Time advancement (advanceToNext): finds the earliest future email date across all
 * generators, then loops advanceDay() until reaching it. If no future emails exist,
 * fast-forwards to game end (Sep 15, 2028).
 */
import { useState, useCallback, useMemo, useEffect } from "react";
import type { Email, GameState, NarrativeContext } from "./types";
import { createInitialState, advanceDay, handleReply, markRead, toggleStar } from "./state";
import { scenario } from "../data/scenario";

const STORAGE_KEY = "ai-ceo-game-state";
const UI_STORAGE_KEY = "ai-ceo-game-ui";

export interface UIState {
  selectedEmailId: string | null;
}

function saveState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* full or unavailable */ }
}

function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    // Migration: reject old saves that used emails[] instead of emailUI
    if (!parsed.emailUI) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveUIState(ui: UIState) {
  try {
    localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(ui));
  } catch { /* ignore */ }
}

export function loadUIState(): UIState {
  try {
    const raw = localStorage.getItem(UI_STORAGE_KEY);
    if (!raw) return { selectedEmailId: null };
    return JSON.parse(raw) as UIState;
  } catch {
    return { selectedEmailId: null };
  }
}

function buildContext(state: GameState): NarrativeContext {
  return {
    currentDate: state.currentDate,
    decisions: state.decisions,
    metrics: state.metrics,
  };
}

/** Compute the delivery date for an EmailDef. */
function resolveDate(
  def: { date: string | ((ctx: NarrativeContext) => string | null) },
  ctx: NarrativeContext,
): string | null {
  return typeof def.date === "string" ? def.date : def.date(ctx);
}

/** Compute all visible emails from scenario generators + UI state overlay. */
function computeEmails(state: GameState): Email[] {
  const ctx = buildContext(state);
  const result: Email[] = [];

  for (const def of scenario) {
    const date = resolveDate(def, ctx);
    if (!date || date > state.currentDate) continue;
    const email = def.generate(ctx, date);
    if (!email) continue;

    const ui = state.emailUI[email.id];
    const pastExpiry =
      email.replyExpiresOn && state.currentDate > email.replyExpiresOn;
    const expired = !!pastExpiry && !ui?.chosenReply;

    result.push({
      ...email,
      read: ui?.read,
      starred: ui?.starred,
      chosenReply: ui?.chosenReply,
      autoResolved: ui?.autoResolved,
      expired,
    });
  }

  return result;
}

/** Find the next date that a new email would arrive. */
function getNextEmailDate(state: GameState): string | null {
  const ctx = buildContext(state);
  let earliest: string | null = null;

  for (const def of scenario) {
    const date = resolveDate(def, ctx);
    if (!date || date <= state.currentDate) continue;
    if (!earliest || date < earliest) earliest = date;
  }

  return earliest;
}

/** Auto-resolve expired decisions that have a defaultReplyId. */
function autoResolveExpired(state: GameState): GameState {
  const emails = computeEmails(state);
  let s = state;
  for (const email of emails) {
    if (
      email.replyExpiresOn &&
      s.currentDate > email.replyExpiresOn &&
      email.defaultReplyId &&
      !s.emailUI[email.id]?.chosenReply
    ) {
      s = handleReply(s, email, email.defaultReplyId);
      s = {
        ...s,
        emailUI: {
          ...s.emailUI,
          [email.id]: { ...s.emailUI[email.id], autoResolved: true },
        },
      };
    }
  }
  return s;
}

export function useGame() {
  const [state, setState] = useState<GameState>(() => {
    const loaded = loadState();
    if (loaded) return loaded;
    return createInitialState();
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const emails = useMemo(() => {
    return computeEmails(state).sort((a, b) => b.date.localeCompare(a.date));
  }, [state]);

  const nextEmailDate = useMemo(() => getNextEmailDate(state), [state]);

  const advanceToNext = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;

      const targetDate = getNextEmailDate(prev);
      if (!targetDate) {
        let s = prev;
        while (s.phase === "playing") s = advanceDay(s);
        return autoResolveExpired(s);
      }

      let s = prev;
      while (s.currentDate < targetDate && s.phase === "playing") {
        s = advanceDay(s);
      }

      return autoResolveExpired(s);
    });
  }, []);

  const reply = useCallback((emailId: string, replyId: string) => {
    setState((prev) => {
      const computed = computeEmails(prev);
      const email = computed.find((e) => e.id === emailId);
      if (!email) return prev;
      return handleReply(prev, email, replyId);
    });
  }, []);

  const read = useCallback((emailId: string) => {
    setState((prev) => markRead(prev, emailId));
  }, []);

  const star = useCallback((emailId: string) => {
    setState((prev) => toggleStar(prev, emailId));
  }, []);

  const restart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(UI_STORAGE_KEY);
    setState(createInitialState());
  }, []);

  return {
    state,
    emails,
    advanceToNext,
    nextEmailDate,
    reply,
    read,
    toggleStar: star,
    restart,
  };
}
