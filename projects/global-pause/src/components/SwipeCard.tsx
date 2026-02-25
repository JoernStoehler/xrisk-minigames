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
  const {
    cardRef,
    leftLabelRef,
    rightLabelRef,
    tiltDirection,
    isExiting,
    style,
    handlers,
  } = useSwipe({
    onSwipe: onChoice,
  });

  // Sync tilt direction to parent for resource icon previews
  useEffect(() => {
    onTiltChange(tiltDirection);
  }, [tiltDirection, onTiltChange]);

  return (
    <div className="flex flex-col items-center flex-1 relative justify-center px-4 overflow-hidden">
      {/* Wrapper — card back and main card overlap here */}
      <div className="relative w-full max-w-[340px]">
        {/* Card back — matches main card size exactly, hidden in neutral */}
        <div className="absolute inset-0 rounded-lg bg-[#1A3D2E] flex flex-col items-center justify-center gap-12">
          <FleurDeLis />
          <FleurDeLis />
          <FleurDeLis />
        </div>

        {/* Main swipeable card */}
        <div
          ref={cardRef}
          className={`relative flex flex-col overflow-hidden ${
            !isExiting ? "animate-card-enter" : ""
          }`}
          style={style}
          {...handlers}
        >
          {/* Text area — tan/gold background with dialogue */}
          <div className="bg-tan px-5 py-4 min-h-[72px] flex items-center justify-center">
            <p className="text-text-dark text-[13px] leading-relaxed text-center">
              {card.text}
            </p>
          </div>

          {/* Portrait area — image fills entirely (bg color baked into image) */}
          <div className="relative overflow-hidden rounded-lg">
            {/* Choice label overlays — always rendered, opacity controlled by useSwipe refs */}
            <div
              ref={leftLabelRef}
              className="absolute top-4 left-4 z-10 text-white text-base font-bold drop-shadow-lg"
              style={{ opacity: 0 }}
            >
              {card.left.label}
            </div>
            <div
              ref={rightLabelRef}
              className="absolute top-4 right-4 z-10 text-white text-base font-bold text-right drop-shadow-lg"
              style={{ opacity: 0 }}
            >
              {card.right.label}
            </div>

            <SpeakerPortrait speaker={card.speaker} />
          </div>

          {/* Speaker name — tan footer bar */}
          <div className="bg-tan px-4 py-2.5 text-center">
            <span className="text-text-dark text-sm font-bold">
              {card.speaker}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Decorative fleur-de-lis for card back (SVG, Reigns-style) */
function FleurDeLis() {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="#B8A668" opacity="0.4">
      <path d="M16 2 C16 2 12 8 12 12 C12 14 14 16 16 16 C18 16 20 14 20 12 C20 8 16 2 16 2Z" />
      <path d="M16 30 C16 30 12 24 12 20 C12 18 14 16 16 16 C18 16 20 18 20 20 C20 24 16 30 16 30Z" />
      <path d="M2 16 C2 16 8 12 12 12 C14 12 16 14 16 16 C16 18 14 20 12 20 C8 20 2 16 2 16Z" />
      <path d="M30 16 C30 16 24 12 20 12 C18 12 16 14 16 16 C16 18 18 20 20 20 C24 20 30 16 30 16Z" />
      <circle cx="16" cy="16" r="3" />
    </svg>
  );
}
