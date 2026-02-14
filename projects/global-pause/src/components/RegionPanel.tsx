import type { GameState, RegionId } from "../engine/types";
import { REGION_INFO, REGION_IDS } from "../data/regions";

interface Props {
  state: GameState;
  selectedRegion: RegionId | null;
  onSelectRegion: (regionId: RegionId) => void;
  onDeployInspector: (regionId: RegionId) => void;
  onRecallInspector: (regionId: RegionId) => void;
}

function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 bg-isia-bg rounded-full overflow-hidden flex-1">
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function RegionPanel({
  state,
  selectedRegion,
  onSelectRegion,
  onDeployInspector,
  onRecallInspector,
}: Props) {
  const activeEventCounts: Record<RegionId, number> = {
    us: 0,
    china: 0,
    eu: 0,
    russia: 0,
    row: 0,
  };
  for (const e of state.activeEvents) {
    if (!e.resolved) activeEventCounts[e.region]++;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2 border-b border-isia-border">
        <h2 className="text-xs font-bold uppercase tracking-wider text-isia-muted">
          Regions
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {REGION_IDS.map((id) => {
          const region = state.regions[id];
          const isSelected = selectedRegion === id;
          const eventCount = activeEventCounts[id];

          return (
            <div
              key={id}
              className={`p-2 rounded border cursor-pointer transition-colors ${
                isSelected
                  ? "bg-isia-accent/10 border-isia-accent"
                  : "border-isia-border hover:border-isia-muted"
              }`}
              onClick={() => onSelectRegion(id)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold">
                  {REGION_INFO[id].shortName}
                </span>
                <div className="flex items-center gap-2">
                  {eventCount > 0 && (
                    <span className="text-[10px] bg-urgency-red/20 text-urgency-red px-1 rounded">
                      {eventCount}
                    </span>
                  )}
                  {region.inspectorDeployed && (
                    <span className="text-[10px] text-isia-accent">[INS]</span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] text-isia-muted">
                  <span className="w-8">Coop</span>
                  <MiniBar
                    value={region.cooperation}
                    color={
                      region.cooperation < 30
                        ? "#ef4444"
                        : region.cooperation < 60
                          ? "#eab308"
                          : "#22c55e"
                    }
                  />
                  <span className="w-6 text-right font-mono">
                    {Math.round(region.cooperation)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-isia-muted">
                  <span className="w-8">Intel</span>
                  <MiniBar
                    value={region.intelligenceCoverage}
                    color="#3b82f6"
                  />
                  <span className="w-6 text-right font-mono">
                    {Math.round(region.intelligenceCoverage)}
                  </span>
                </div>
              </div>

              {/* Inspector controls (show when selected) */}
              {isSelected && (
                <div className="mt-2 pt-2 border-t border-isia-border">
                  {region.inspectorDeployed ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRecallInspector(id);
                      }}
                      className="text-xs text-urgency-orange hover:text-urgency-red cursor-pointer"
                    >
                      Recall inspector
                    </button>
                  ) : state.resources.inspectorTeams > 0 ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeployInspector(id);
                      }}
                      className="text-xs text-isia-accent hover:text-isia-text cursor-pointer"
                    >
                      Deploy inspector (+15 intel)
                    </button>
                  ) : (
                    <span className="text-xs text-isia-muted">
                      No inspectors available
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
