import { useState, useCallback, useMemo, useEffect } from "react";
import type { GameState, NarrativeContext } from "./types";
import { createInitialState, advanceDay, handleReply, markRead } from "./state";
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
    return JSON.parse(raw) as GameState;
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

/**
 * Deliver any emails from the scenario that should arrive by now.
 * Calls each generator with the current NarrativeContext.
 */
function deliverEmails(state: GameState): GameState {
  const ctx = buildContext(state);
  const deliveredIds = new Set(state.emails.map((e) => e.id));
  const newEmails = [];

  for (const def of scenario) {
    if (deliveredIds.has(def.id)) continue;
    const date = resolveDate(def, ctx);
    if (!date || date > state.currentDate) continue;
    const email = def.generate(ctx, date);
    if (email) newEmails.push(email);
  }

  if (newEmails.length === 0) return state;
  return { ...state, emails: [...state.emails, ...newEmails] };
}

/** Find the next date that a new email will arrive. */
function getNextEmailDate(state: GameState): string | null {
  const ctx = buildContext(state);
  const deliveredIds = new Set(state.emails.map((e) => e.id));
  let earliest: string | null = null;

  for (const def of scenario) {
    if (deliveredIds.has(def.id)) continue;
    const date = resolveDate(def, ctx);
    if (!date || date <= state.currentDate) continue;
    if (!earliest || date < earliest) earliest = date;
  }

  return earliest;
}

export function useGame() {
  const [state, setState] = useState<GameState>(() => {
    const loaded = loadState();
    if (loaded) return loaded;
    return deliverEmails(createInitialState());
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const emails = useMemo(() => {
    return [...state.emails].sort((a, b) => b.date.localeCompare(a.date));
  }, [state]);

  const nextEmailDate = useMemo(() => getNextEmailDate(state), [state]);

  const advanceToNext = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;

      const targetDate = getNextEmailDate(prev);
      if (!targetDate) {
        let s = prev;
        while (s.phase === "playing") s = advanceDay(s);
        return s;
      }

      let s = prev;
      while (s.currentDate < targetDate && s.phase === "playing") {
        s = advanceDay(s);
      }

      return deliverEmails(s);
    });
  }, []);

  const reply = useCallback((emailId: string, replyId: string) => {
    setState((prev) => {
      const next = handleReply(prev, emailId, replyId);
      // Deliver any emails that become available due to this decision
      return deliverEmails(next);
    });
  }, []);

  const read = useCallback((emailId: string) => {
    setState((prev) => markRead(prev, emailId));
  }, []);

  const toggleStar = useCallback((emailId: string) => {
    setState((prev) => ({
      ...prev,
      emails: prev.emails.map((e) =>
        e.id === emailId ? { ...e, starred: !e.starred } : e,
      ),
    }));
  }, []);

  const restart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(UI_STORAGE_KEY);
    setState(deliverEmails(createInitialState()));
  }, []);

  return {
    state,
    emails,
    advanceToNext,
    nextEmailDate,
    reply,
    read,
    toggleStar,
    restart,
  };
}
