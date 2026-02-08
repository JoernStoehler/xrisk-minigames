import { useState, useCallback, useMemo } from "react";
import type { Email, GameState } from "./types";
import {
  createInitialState,
  advanceDay,
  handleReply,
  spamEmail,
  markRead,
} from "./state";
import { baselineEmails } from "../data/baseline";

function getAvailableEmails(state: GameState): Email[] {
  const currentDate = state.currentDate;
  return baselineEmails
    .filter((e) => {
      if (state.suppressedEmailIds.includes(e.id)) return false;
      return e.date <= currentDate;
    })
    .map((e) => {
      // Check if this email is already in state (has been interacted with)
      const existing = state.emails.find((se) => se.id === e.id);
      if (existing) return existing;
      return e;
    });
}

function resolveInjectedEmails(state: GameState): Email[] {
  // Injected emails with relative dates ("+N" days from trigger)
  // These are already in state.emails from modifier application
  return state.emails.filter((e) => {
    // Only include injected emails (not baseline ones)
    return !baselineEmails.find((b) => b.id === e.id);
  });
}

export function useGame() {
  const [state, setState] = useState<GameState>(createInitialState);

  const allEmails = useMemo(() => {
    const baseline = getAvailableEmails(state);
    const injected = resolveInjectedEmails(state);

    // Resolve relative dates for injected emails
    const resolved = injected.map((e) => {
      if (e.date.startsWith("+")) {
        const daysOffset = parseInt(e.date.slice(1));
        // Find the modifier that injected this email to calculate relative date
        const triggerDate = new Date(state.currentDate);
        triggerDate.setDate(triggerDate.getDate() - daysOffset);
        // Actually, we should store the trigger date. For now, use the email's
        // intended arrival: trigger date + offset
        // Since we add emails when modifier fires, we'll resolve the date then
        return e;
      }
      return e;
    });

    // Combine and sort by date
    const combined = [...baseline, ...resolved];
    // Deduplicate by ID
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

  const nextDay = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;

      let next = advanceDay(prev);

      // Resolve injected emails with relative dates
      next = {
        ...next,
        emails: next.emails.map((e) => {
          if (e.date.startsWith("+")) {
            const days = parseInt(e.date.slice(1));
            const d = new Date(prev.currentDate);
            d.setDate(d.getDate() + days);
            return { ...e, date: d.toISOString().split("T")[0] };
          }
          return e;
        }),
      };

      return next;
    });
  }, []);

  const reply = useCallback((emailId: string, replyId: string) => {
    setState((prev) => {
      let next = handleReply(prev, emailId, replyId);
      // Resolve dates on any newly injected emails
      next = {
        ...next,
        emails: next.emails.map((e) => {
          if (e.date.startsWith("+")) {
            const days = parseInt(e.date.slice(1));
            const d = new Date(prev.currentDate);
            d.setDate(d.getDate() + days);
            return { ...e, date: d.toISOString().split("T")[0] };
          }
          return e;
        }),
      };
      return next;
    });
  }, []);

  const spam = useCallback((emailId: string) => {
    setState((prev) => spamEmail(prev, emailId));
  }, []);

  const read = useCallback((emailId: string) => {
    setState((prev) => markRead(prev, emailId));
  }, []);

  const restart = useCallback(() => {
    setState(createInitialState());
  }, []);

  return {
    state,
    inboxEmails,
    spamEmails,
    nextDay,
    reply,
    spam,
    read,
    restart,
  };
}
