import { useEffect } from "react";
import type { ActiveCard } from "../engine/types";
import { useSwipe, type TiltDirection } from "../hooks/useSwipe";

interface SwipeCardProps {
  card: ActiveCard;
  onChoice: (choice: "left" | "right") => void;
  onTiltChange: (direction: TiltDirection) => void;
}

export function SwipeCard({ card, onChoice, onTiltChange }: SwipeCardProps) {
  const { cardRef, offsetX, tiltDirection, isExiting, style, handlers } =
    useSwipe({
      onSwipe: onChoice,
    });

  // Sync tilt direction to parent for resource bar previews
  useEffect(() => {
    onTiltChange(tiltDirection);
  }, [tiltDirection, onTiltChange]);

  // Option label opacity: proportional to drag offset
  const tiltThreshold = 30;
  const leftOpacity = Math.min(
    1,
    Math.max(0, (-offsetX - tiltThreshold) / 60),
  );
  const rightOpacity = Math.min(
    1,
    Math.max(0, (offsetX - tiltThreshold) / 60),
  );

  const accentColor = card.color || "#3b82f6";

  return (
    <div className="flex flex-col items-center flex-1 justify-center px-4">
      {/* The swipeable card */}
      <div
        ref={cardRef}
        className={`relative w-full max-w-sm bg-isia-panel border border-isia-border rounded-xl p-6 shadow-2xl ${
          !isExiting ? "animate-card-enter" : ""
        }`}
        style={{
          ...style,
          borderTopColor: accentColor,
          borderTopWidth: "3px",
        }}
        {...handlers}
      >
        {/* Speaker */}
        <div className="text-isia-muted text-sm mb-3 uppercase tracking-wider">
          {card.speaker}
        </div>

        {/* Card text */}
        <div className="text-isia-text text-base leading-relaxed min-h-[120px]">
          {card.text}
        </div>

        {/* Left option label (appears on left tilt) */}
        <div
          className="absolute top-4 left-4 text-urgency-red font-bold text-sm px-2 py-1 rounded bg-urgency-red/10 pointer-events-none"
          style={{ opacity: leftOpacity }}
        >
          ← {card.left.label}
        </div>

        {/* Right option label (appears on right tilt) */}
        <div
          className="absolute top-4 right-4 text-success font-bold text-sm px-2 py-1 rounded bg-success/10 pointer-events-none"
          style={{ opacity: rightOpacity }}
        >
          {card.right.label} →
        </div>
      </div>

      {/* Tap fallback buttons */}
      <div className="flex justify-between w-full max-w-sm mt-4 px-2">
        <button
          className="text-sm text-isia-muted hover:text-isia-text px-4 py-3 rounded-lg border border-isia-border/50 active:bg-isia-panel transition-colors min-w-[44px] min-h-[44px]"
          onClick={() => onChoice("left")}
          disabled={isExiting}
        >
          ← {card.left.label}
        </button>
        <button
          className="text-sm text-isia-muted hover:text-isia-text px-4 py-3 rounded-lg border border-isia-border/50 active:bg-isia-panel transition-colors min-w-[44px] min-h-[44px]"
          onClick={() => onChoice("right")}
          disabled={isExiting}
        >
          {card.right.label} →
        </button>
      </div>
    </div>
  );
}
