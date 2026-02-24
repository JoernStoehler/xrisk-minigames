import { useEffect } from "react";
import type { ActiveCard } from "../engine/types";
import { useSwipe, type TiltDirection } from "../hooks/useSwipe";

const SPEAKER_PORTRAITS: Record<string, string> = {
  "Chief Financial Officer": "💼",
  "Communications Director": "📢",
  "Head of Human Resources": "👥",
  "Political Advisor": "🏛️",
  "Press Secretary": "🎤",
  "Intelligence Analyst": "🔍",
  "Junior Analyst": "📊",
  "Customs Liaison": "🛃",
  "Anonymous Source": "🕵️",
  "Diplomatic Attaché": "🤝",
  "Legal Counsel": "⚖️",
  "Civil Liberties Advocate": "✊",
  "UN Secretary-General": "🌐",
  "Ethics Watchdog": "👁️",
  "Finance Director": "💰",
  "Enforcement Chief": "🔒",
  "Investigative Journalist": "📰",
  "NATO Liaison": "🎖️",
  "Chief Scientist": "🔬",
  "Deputy Director": "📋",
  "Executive Assistant": "📝",
};

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

  const accentColor = card.color || "#2563EB";
  const portrait = SPEAKER_PORTRAITS[card.speaker] || "👤";

  return (
    <div className="flex flex-col items-center flex-1 justify-center px-4 relative">
      {/* The swipeable card */}
      <div
        ref={cardRef}
        className={`relative w-full max-w-[340px] bg-isia-panel rounded-2xl shadow-[0_2px_24px_rgba(0,0,0,0.15)] border border-isia-border/40 ${
          !isExiting ? "animate-card-enter" : ""
        }`}
        style={style}
        {...handlers}
      >
        {/* Colored header with speaker */}
        <div
          className="px-5 py-3 rounded-t-2xl"
          style={{ backgroundColor: accentColor }}
        >
          <div className="text-white text-sm font-bold uppercase tracking-wider">
            {card.speaker}
          </div>
        </div>

        {/* Card body */}
        <div className="px-5 py-5 flex flex-col items-center">
          {/* Speaker portrait */}
          <div className="text-7xl mb-4">{portrait}</div>

          {/* Card text */}
          <div className="text-isia-text text-base leading-relaxed text-center min-h-[80px]">
            {card.text}
          </div>

          {/* Option labels at bottom of card body */}
          <div className="flex justify-between w-full mt-4">
            <div
              className="text-urgency-red font-bold text-sm px-2 py-1 rounded-lg bg-urgency-red/15 pointer-events-none max-w-[45%] truncate"
              style={{ opacity: leftOpacity }}
            >
              ← {card.left.label}
            </div>
            <div
              className="text-success font-bold text-sm px-2 py-1 rounded-lg bg-success/15 pointer-events-none max-w-[45%] truncate"
              style={{ opacity: rightOpacity }}
            >
              {card.right.label} →
            </div>
          </div>
        </div>
      </div>

      {/* Tap fallback buttons — anchored to bottom of area */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-between max-w-[340px] mx-auto px-6">
        <button
          className="text-sm text-isia-muted font-medium px-4 py-3 min-w-[44px] min-h-[44px] active:text-isia-text transition-colors"
          onClick={() => onChoice("left")}
          disabled={isExiting}
        >
          ← {card.left.label}
        </button>
        <button
          className="text-sm text-isia-muted font-medium px-4 py-3 min-w-[44px] min-h-[44px] active:text-isia-text transition-colors"
          onClick={() => onChoice("right")}
          disabled={isExiting}
        >
          {card.right.label} →
        </button>
      </div>
    </div>
  );
}
