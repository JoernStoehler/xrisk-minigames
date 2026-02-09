import { useState, useCallback, useMemo, useEffect } from "react";
import type { GameState } from "./types";
import {
  createInitialState,
  advanceDay,
  handleReply,
  spamEmail,
  markRead,
} from "./state";
import { baselineEmails } from "../data/baseline";

const STORAGE_KEY = "ai-ceo-game-state";
const UI_STORAGE_KEY = "ai-ceo-game-ui";

export interface UIState {
  selectedEmailId: string | null;
  showSpam: boolean;
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
    if (!raw) return { selectedEmailId: null, showSpam: false };
    return JSON.parse(raw) as UIState;
  } catch {
    return { selectedEmailId: null, showSpam: false };
  }
}

function getAvailableEmails(state: GameState) {
  const currentDate = state.currentDate;
  return baselineEmails
    .filter((e) => {
      if (state.suppressedEmailIds.includes(e.id)) return false;
      return e.date <= currentDate;
    })
    .map((e) => {
      const existing = state.emails.find((se) => se.id === e.id);
      if (existing) return existing;
      return e;
    });
}

function resolveInjectedEmails(state: GameState) {
  return state.emails.filter((e) => {
    return !baselineEmails.find((b) => b.id === e.id);
  });
}

/** Find next date that has a new email arriving */
function getNextEmailDate(state: GameState): string | null {
  const currentDate = state.currentDate;

  const futureBaseline = baselineEmails
    .filter((e) => e.date > currentDate && !state.suppressedEmailIds.includes(e.id))
    .map((e) => e.date);

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
    return loadState() ?? createInitialState();
  });

  // Persist on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const allEmails = useMemo(() => {
    const baseline = getAvailableEmails(state);
    const injected = resolveInjectedEmails(state);

    const combined = [...baseline, ...injected];
    const seen = new Set<string>();
    const unique = combined.filter((e) => {
      if (seen.has(e.id)) return false;
      seen.add(e.id);
      return true;
    });
    return unique.sort((a, b) => b.date.localeCompare(a.date));
  }, [state]);

  const inboxEmails = useMemo(
    () => allEmails.filter((e) => !e.spammed),
    [allEmails],
  );

  const spamEmails = useMemo(
    () => allEmails.filter((e) => e.spammed),
    [allEmails],
  );

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

      return resolveRelativeDates(s, prev.currentDate);
    });
  }, []);

  const reply = useCallback((emailId: string, replyId: string) => {
    setState((prev) => {
      const next = handleReply(prev, emailId, replyId);
      return resolveRelativeDates(next, prev.currentDate);
    });
  }, []);

  const spam = useCallback((emailId: string) => {
    setState((prev) => spamEmail(prev, emailId));
  }, []);

  const read = useCallback((emailId: string) => {
    setState((prev) => markRead(prev, emailId));
  }, []);

  const restart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(UI_STORAGE_KEY);
    setState(createInitialState());
  }, []);

  return {
    state,
    inboxEmails,
    spamEmails,
    advanceToNext,
    nextEmailDate,
    reply,
    spam,
    read,
    restart,
  };
}
