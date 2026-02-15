import type { GameState } from "../engine/types";

interface Props {
  state: GameState;
  onChangeFunding: (level: number) => void;
}

export default function StatusOverlay({ state, onChangeFunding }: Props) {
  const { resources, globalSupport, safetyResearchFunding } = state;

  return (
    <div className="flex flex-col gap-1 bg-isia-panel/90 border border-isia-border rounded-lg px-3 py-2 backdrop-blur-sm text-xs">
      <div className="flex items-center justify-between gap-3">
        <span className="text-isia-muted">PC</span>
        <span className="font-mono font-bold">{Math.round(resources.politicalCapital)}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-isia-muted">Inspectors</span>
        <span className="font-mono font-bold">{resources.inspectorTeams}/{resources.totalInspectorTeams}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-isia-muted">Support</span>
        <span className={`font-mono font-bold ${globalSupport < 30 ? "text-urgency-red" : ""}`}>
          {Math.round(globalSupport)}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-isia-muted">Fund</span>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3].map((level) => (
            <button
              key={level}
              onClick={() => onChangeFunding(level)}
              className={`w-4 h-4 rounded-sm text-[9px] font-mono cursor-pointer transition-colors flex items-center justify-center ${
                level <= safetyResearchFunding
                  ? "bg-success text-black"
                  : "bg-isia-border text-isia-muted"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
