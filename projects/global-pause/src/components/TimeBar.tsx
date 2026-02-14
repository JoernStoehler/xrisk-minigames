import type { GameSpeed, GameState } from "../engine/types";
import { weekToDate } from "../engine/state";

interface Props {
  state: GameState;
  onSetSpeed: (speed: GameSpeed) => void;
}

const SPEED_LABELS: Record<GameSpeed, string> = {
  0: "||",
  1: ">",
  2: ">>",
  4: ">>>",
};

export default function TimeBar({ state, onSetSpeed }: Props) {
  const date = weekToDate(state.week);
  const progressPct = (state.week / state.maxWeeks) * 100;

  return (
    <div className="bg-isia-panel border-t border-isia-border px-4 py-2">
      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono font-bold">{date}</span>
          <span className="text-xs text-isia-muted">
            Week {state.week}
          </span>
        </div>

        {/* Timeline progress */}
        <div className="flex-1 h-1 bg-isia-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-isia-accent/50 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Speed controls */}
        <div className="flex items-center gap-1">
          {([0, 1, 2, 4] as GameSpeed[]).map((speed) => (
            <button
              key={speed}
              onClick={() => onSetSpeed(speed)}
              className={`px-2 py-1 text-xs font-mono rounded cursor-pointer transition-colors ${
                state.speed === speed
                  ? "bg-isia-accent text-white"
                  : "bg-isia-border text-isia-muted hover:text-isia-text"
              }`}
            >
              {SPEED_LABELS[speed]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
