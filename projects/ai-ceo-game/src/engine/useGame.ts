import { useState, useCallback, useMemo, useEffect } from "react";
import type { GameState } from "./types";
import {
  createInitialState,
  advanceDay,
  handleReply,
  markRead,
} from "./state";
import { baselineEmails } from "../data/baseline";

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

/**
 * Copy any baseline emails that have arrived (date <= currentDate)
 * into state.emails, skipping suppressed and already-present ones.
 */
function deliverEmails(state: GameState): GameState {
  const newEmails = baselineEmails.filter((e) => {
    if (e.date > state.currentDate) return false;
    if (state.suppressedEmailIds.includes(e.id)) return false;
    if (state.emails.some((se) => se.id === e.id)) return false;
    return true;
  });
  if (newEmails.length === 0) return state;
  return { ...state, emails: [...state.emails, ...newEmails] };
}

/** Find next date that has a new email arriving */
function getNextEmailDate(state: GameState): string | null {
  const currentDate = state.currentDate;

  // Future baseline emails not yet delivered
  const futureBaseline = baselineEmails
    .filter((e) => e.date > currentDate && !state.suppressedEmailIds.includes(e.id))
    .map((e) => e.date);

  // Future injected emails (already in state, with resolved dates)
  const futureInjected = state.emails
    .filter((e) => e.date > currentDate && !e.date.startsWith("+"))
    .map((e) => e.date);

  const allDates = [...futureBaseline, ...futureInjected].sort();
  return allDates[0] ?? null;
}

function resolveRelativeDates(state: GameState, baseDate: string): GameState {
  return {
    ...state,
    emails: state.emails.map((e) => {
      if (e.date.startsWith("+")) {
        const days = parseInt(e.date.slice(1));
        const d = new Date(baseDate);
        d.setDate(d.getDate() + days);
        return { ...e, date: d.toISOString().split("T")[0] };
      }
      return e;
    }),
  };
}

export function useGame() {
  const [state, setState] = useState<GameState>(() => {
    const loaded = loadState();
    if (loaded) return loaded;
    // Deliver day-1 emails on fresh start
    return deliverEmails(createInitialState());
  });

  // Persist on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Emails sorted newest-first, derived from state
  const emails = useMemo(() => {
    return [...state.emails]
      .filter((e) => !e.date.startsWith("+")) // hide unresolved future emails
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [state]);

  const nextEmailDate = useMemo(() => getNextEmailDate(state), [state]);

  /** Advance to the date of the next email arrival */
  const advanceToNext = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;

      const targetDate = getNextEmailDate(prev);
      if (!targetDate) {
        // No more emails -- fast-forward to extinction
        let s = prev;
        while (s.phase === "playing") {
          s = advanceDay(s);
        }
        return s;
      }

      // Advance day-by-day to target
      let s = prev;
      while (s.currentDate < targetDate && s.phase === "playing") {
        s = advanceDay(s);
      }

      // Deliver newly arrived emails & resolve relative dates
      s = deliverEmails(s);
      return resolveRelativeDates(s, prev.currentDate);
    });
  }, []);

  const reply = useCallback((emailId: string, replyId: string) => {
    setState((prev) => {
      const next = handleReply(prev, emailId, replyId);
      // Deliver any emails that modifiers may have injected for today
      const delivered = deliverEmails(next);
      return resolveRelativeDates(delivered, prev.currentDate);
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
