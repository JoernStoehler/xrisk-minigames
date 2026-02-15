import type { GameState } from "../engine/types";
import { weekToDate } from "../engine/state";

interface Props {
  state: GameState;
}

export default function SafetyProgressBar({ state }: Props) {
  const safetyPct = state.resources.safetyResearchProgress;
  const asiPct = state.algorithmicProgress;
  const date = weekToDate(state.week);

  return (
    <div className="bg-isia-panel border-t border-isia-border px-3 py-2">
      {/* Date */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-isia-muted">{date} &middot; Week {state.week}</span>
        <span className="text-[10px] text-isia-muted">
          {Math.round(safetyPct)}% safe &middot; {Math.round(asiPct)}% ASI
        </span>
      </div>
      {/* Racing bar */}
      <div className="relative h-3 bg-isia-bg rounded-full overflow-hidden">
        {/* ASI progress from right */}
        <div
          className="absolute right-0 top-0 h-full bg-urgency-red/60 transition-all duration-300"
          style={{ width: `${asiPct}%` }}
        />
        {/* Safety progress from left */}
        <div
          className="absolute left-0 top-0 h-full bg-success/80 transition-all duration-300"
          style={{ width: `${safetyPct}%` }}
        />
      </div>
    </div>
  );
}
