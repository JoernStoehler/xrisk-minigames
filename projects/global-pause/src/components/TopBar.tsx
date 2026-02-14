import type { GameState } from "../engine/types";

interface Props {
  state: GameState;
  onChangeFunding: (level: number) => void;
}

function Bar({
  value,
  max,
  color,
  label,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="text-xs text-isia-muted whitespace-nowrap">{label}</span>
      <div className="flex-1 h-2 bg-isia-bg rounded-full overflow-hidden min-w-12">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-mono w-8 text-right">{Math.round(value)}</span>
    </div>
  );
}

export default function TopBar({ state, onChangeFunding }: Props) {
  const { resources, globalSupport, algorithmicProgress, safetyResearchFunding } = state;

  return (
    <div className="bg-isia-panel border-b border-isia-border px-4 py-2">
      <div className="flex items-center gap-6 flex-wrap">
        {/* ISIA Brand */}
        <div className="flex items-center gap-2 mr-2">
          <div className="w-6 h-6 rounded bg-isia-accent flex items-center justify-center text-xs font-bold">
            IS
          </div>
          <span className="text-sm font-bold hidden sm:inline">ISIA</span>
        </div>

        {/* Inspectors */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-isia-muted">Inspectors</span>
          <span className="text-sm font-mono font-bold ml-1">
            {resources.inspectorTeams}/{resources.totalInspectorTeams}
          </span>
        </div>

        {/* Political Capital */}
        <div className="flex-1 min-w-32 max-w-48">
          <Bar
            value={resources.politicalCapital}
            max={100}
            color="#3b82f6"
            label="Capital"
          />
        </div>

        {/* Global Support */}
        <div className="flex-1 min-w-32 max-w-48">
          <Bar
            value={globalSupport}
            max={100}
            color={globalSupport < 30 ? "#ef4444" : "#22c55e"}
            label="Support"
          />
        </div>

        {/* Algorithmic Progress (threat) */}
        <div className="flex-1 min-w-32 max-w-48">
          <Bar
            value={algorithmicProgress}
            max={100}
            color={algorithmicProgress > 60 ? "#ef4444" : algorithmicProgress > 30 ? "#f97316" : "#eab308"}
            label="ASI Risk"
          />
        </div>

        {/* Safety Research */}
        <div className="flex-1 min-w-32 max-w-48">
          <Bar
            value={resources.safetyResearchProgress}
            max={100}
            color="#22c55e"
            label="Safety"
          />
        </div>

        {/* Funding Level */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-isia-muted">Fund</span>
          {[0, 1, 2, 3].map((level) => (
            <button
              key={level}
              onClick={() => onChangeFunding(level)}
              className={`w-5 h-5 rounded text-xs font-mono cursor-pointer transition-colors ${
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
