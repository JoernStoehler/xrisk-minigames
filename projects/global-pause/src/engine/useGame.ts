import { useCallback, useEffect, useState } from "react";
import type {
  Difficulty,
  GameSpeed,
  GameState,
  RegionId,
  ResponseType,
} from "./types";
import {
  createInitialState,
  deployInspector,
  recallInspector,
  respondToEvent,
  setSpeed,
  setSafetyFunding,
  tickWeek,
} from "./state";
import { generateEvents, resetEventCounter } from "./events";
import { EVENT_TEMPLATES } from "../data/events";

const STORAGE_KEY = "global-pause-state";
const TICK_INTERVALS: Record<GameSpeed, number> = {
  0: 0, // paused
  1: 1000, // 1 tick/sec
  2: 500, // 2 ticks/sec
  4: 250, // 4 ticks/sec
};

function saveState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable
  }
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

export function useGame() {
  const [state, setState] = useState<GameState>(() => {
    const saved = loadState();
    if (saved && saved.phase !== "menu") return saved;
    return { phase: "menu" } as GameState;
  });

  // Save on every state change
  useEffect(() => {
    if (state.phase !== "menu") {
      saveState(state);
    }
  }, [state]);

  // Tick loop
  useEffect(() => {
    if (state.phase !== "playing" || state.speed === 0) return;

    const interval = TICK_INTERVALS[state.speed];
    if (!interval) return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.phase !== "playing") return prev;

        // Advance game week
        let next = tickWeek(prev);

        // Generate new events
        if (next.phase === "playing") {
          const newEvents = generateEvents(next, EVENT_TEMPLATES);
          if (newEvents.length > 0) {
            next = {
              ...next,
              activeEvents: [...next.activeEvents, ...newEvents],
            };
          }
        }

        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [state.phase, state.speed]);

  const startGame = useCallback((difficulty: Difficulty) => {
    resetEventCounter();
    const initial = createInitialState(difficulty);
    setState(initial);
  }, []);

  const restart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    resetEventCounter();
    setState({ phase: "menu" } as GameState);
  }, []);

  const respond = useCallback(
    (eventId: string, responseType: ResponseType) => {
      setState((prev) => respondToEvent(prev, eventId, responseType));
    },
    [],
  );

  // Auto-resolve event with cheapest affordable response
  const popEvent = useCallback((eventId: string) => {
    setState((prev) => {
      const event = prev.activeEvents.find((e) => e.id === eventId);
      if (!event || event.resolved) return prev;
      // Find cheapest response the player can afford
      const affordable = event.responses
        .filter((r) => {
          if (prev.resources.politicalCapital < r.politicalCapitalCost) return false;
          if (r.requiresInspector && prev.resources.inspectorTeams <= 0) return false;
          return true;
        })
        .sort((a, b) => a.politicalCapitalCost - b.politicalCapitalCost);
      if (affordable.length === 0) return prev;
      return respondToEvent(prev, eventId, affordable[0].type);
    });
  }, []);

  const deploy = useCallback((regionId: RegionId) => {
    setState((prev) => deployInspector(prev, regionId));
  }, []);

  const recall = useCallback((regionId: RegionId) => {
    setState((prev) => recallInspector(prev, regionId));
  }, []);

  const changeSpeed = useCallback((speed: GameSpeed) => {
    setState((prev) => setSpeed(prev, speed));
  }, []);

  const changeFunding = useCallback((level: number) => {
    setState((prev) => setSafetyFunding(prev, level));
  }, []);

  return {
    state,
    startGame,
    restart,
    respond,
    popEvent,
    deployInspector: deploy,
    recallInspector: recall,
    setSpeed: changeSpeed,
    setSafetyFunding: changeFunding,
  };
}
