import { useEffect } from "react";
import type { ActiveCard } from "../engine/types";
import { useSwipe, type TiltDirection } from "../hooks/useSwipe";
import { SpeakerPortrait } from "./SpeakerPortrait";

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

  const accentColor = card.color || "#4A90D9";

  return (
    <div className="flex flex-col items-center flex-1 pt-4 px-4">
      {/* The swipeable card */}
      <div
        ref={cardRef}
        className={`relative w-full max-w-[320px] min-h-[480px] flex flex-col bg-isia-panel rounded-2xl border border-black/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_4px_32px_rgba(0,0,0,0.4)] ${
          !isExiting ? "animate-card-enter" : ""
        }`}
        style={style}
        {...handlers}
      >
        {/* Colored header with speaker */}
        <div
          className="px-5 py-2.5 rounded-t-2xl"
          style={{ backgroundColor: accentColor }}
        >
          <div className="text-white/90 text-xs font-bold uppercase tracking-wider">
            {card.speaker}
          </div>
        </div>

        {/* Card body — flex-1 to fill card height */}
        <div className="px-5 py-5 flex flex-col items-center flex-1">
          {/* Speaker portrait — geometric SVG */}
          <div className="mb-3">
            <SpeakerPortrait speaker={card.speaker} size={160} />
          </div>

          {/* Card text */}
          <div className="text-isia-text text-base leading-relaxed text-center min-h-[80px]">
            {card.text}
          </div>

          {/* Option labels pinned to bottom of card body */}
          <div className="flex justify-between w-full mt-auto pt-3">
            <div
              className="text-urgency-red font-bold text-xs px-2 py-1 rounded-lg bg-urgency-red/15 pointer-events-none max-w-[45%] truncate"
              style={{ opacity: leftOpacity }}
            >
              ← {card.left.label}
            </div>
            <div
              className="text-success font-bold text-xs px-2 py-1 rounded-lg bg-success/15 pointer-events-none max-w-[45%] truncate"
              style={{ opacity: rightOpacity }}
            >
              {card.right.label} →
            </div>
          </div>
        </div>
      </div>

      {/* Tap fallback buttons — subtle, directly below card */}
      <div className="flex justify-between w-full max-w-[320px] mt-2 px-4">
        <button
          className="text-xs text-isia-muted/50 font-medium px-3 py-2 min-w-[44px] min-h-[44px] active:text-isia-muted transition-colors"
          onClick={() => onChoice("left")}
          disabled={isExiting}
        >
          ← {card.left.label}
        </button>
        <button
          className="text-xs text-isia-muted/50 font-medium px-3 py-2 min-w-[44px] min-h-[44px] active:text-isia-muted transition-colors"
          onClick={() => onChoice("right")}
          disabled={isExiting}
        >
          {card.right.label} →
        </button>
      </div>
    </div>
  );
}
