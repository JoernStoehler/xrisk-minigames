import { useState } from "react";
import type { GameState } from "../engine/types";
import type { TiltDirection } from "../hooks/useSwipe";
import { ResourceDisplay } from "./ResourceDisplay";
import { SwipeCard } from "./SwipeCard";

interface GameScreenProps {
  state: GameState;
  onChoice: (choice: "left" | "right") => void;
}

export function GameScreen({ state, onChoice }: GameScreenProps) {
  const [tiltDirection, setTiltDirection] = useState<TiltDirection>("center");

  if (!state.activeCard) return null;

  return (
    <div className="flex flex-col min-h-dvh bg-isia-bg">
      {/* Resource bars at top */}
      <ResourceDisplay
        resources={state.resources}
        tiltDirection={tiltDirection}
        leftPreviews={state.activeCard.left.previews}
        rightPreviews={state.activeCard.right.previews}
      />

      {/* Card area */}
      <SwipeCard
        key={state.activeCard.templateId + "-" + state.turn}
        card={state.activeCard}
        onChoice={onChoice}
        onTiltChange={setTiltDirection}
      />

      {/* Turn counter */}
      <div className="text-center text-isia-muted/60 text-xs font-semibold py-3">
        Decision #{state.turn + 1}
      </div>
    </div>
  );
}
