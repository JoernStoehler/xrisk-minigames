import type { GameSpeed } from "../engine/types";

interface Props {
  speed: GameSpeed;
  onSetSpeed: (speed: GameSpeed) => void;
}

const SPEEDS: { value: GameSpeed; label: string }[] = [
  { value: 0, label: "||" },
  { value: 1, label: "\u25B6" },
  { value: 2, label: "\u25B6\u25B6" },
  { value: 4, label: "\u25B6\u25B6\u25B6" },
];

export default function SpeedControls({ speed, onSetSpeed }: Props) {
  return (
    <div className="flex items-center gap-1 bg-isia-panel/90 border border-isia-border rounded-lg px-2 py-1 backdrop-blur-sm">
      {SPEEDS.map((s) => (
        <button
          key={s.value}
          onClick={() => onSetSpeed(s.value)}
          className={`w-8 h-8 rounded text-xs font-mono cursor-pointer transition-colors flex items-center justify-center ${
            speed === s.value
              ? "bg-isia-accent text-white"
              : "text-isia-muted hover:text-isia-text"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
