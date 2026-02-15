import type { GameEvent, GameState, RegionId } from "../engine/types";
import { REGION_INFO } from "../data/regions";

interface Props {
  regionId: RegionId;
  state: GameState;
  events: GameEvent[];
  onDeploy: (regionId: RegionId) => void;
  onRecall: (regionId: RegionId) => void;
  onClose: () => void;
  onOpenEvent: (eventId: string) => void;
}

export default function RegionOverlay({
  regionId,
  state,
  events,
  onDeploy,
  onRecall,
  onClose,
  onOpenEvent,
}: Props) {
  const region = state.regions[regionId];
  const info = REGION_INFO[regionId];
  const hasAvailableInspector = state.resources.inspectorTeams > 0;

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 right-0 bg-isia-panel border-t border-isia-border rounded-t-xl p-4 max-h-[50vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center mb-3">
          <div className="w-8 h-1 bg-isia-border rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">{info.name}</h3>
          <button onClick={onClose} className="text-isia-muted hover:text-isia-text cursor-pointer">&times;</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <div className="text-[10px] text-isia-muted uppercase">Cooperation</div>
            <div className="h-2 bg-isia-bg rounded-full overflow-hidden mt-0.5">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${region.cooperation}%`,
                  backgroundColor: region.cooperation >= 60 ? "#22c55e" : region.cooperation >= 30 ? "#eab308" : "#ef4444",
                }}
              />
            </div>
            <div className="text-[10px] font-mono mt-0.5">{Math.round(region.cooperation)}%</div>
          </div>
          <div>
            <div className="text-[10px] text-isia-muted uppercase">Intel Coverage</div>
            <div className="h-2 bg-isia-bg rounded-full overflow-hidden mt-0.5">
              <div
                className="h-full bg-isia-accent rounded-full transition-all duration-300"
                style={{ width: `${region.intelligenceCoverage}%` }}
              />
            </div>
            <div className="text-[10px] font-mono mt-0.5">{Math.round(region.intelligenceCoverage)}%</div>
          </div>
        </div>

        {/* Inspector control */}
        <div className="mb-3">
          {region.inspectorDeployed ? (
            <button
              onClick={() => onRecall(regionId)}
              className="w-full py-2 text-xs rounded-lg border border-isia-border bg-isia-bg/50 hover:border-urgency-orange transition-colors cursor-pointer"
            >
              Recall Inspector
            </button>
          ) : (
            <button
              onClick={() => hasAvailableInspector && onDeploy(regionId)}
              disabled={!hasAvailableInspector}
              className={`w-full py-2 text-xs rounded-lg border transition-colors cursor-pointer ${
                hasAvailableInspector
                  ? "border-isia-accent bg-isia-accent/10 hover:bg-isia-accent/20"
                  : "border-isia-border opacity-40 cursor-not-allowed"
              }`}
            >
              Deploy Inspector {!hasAvailableInspector && "(none available)"}
            </button>
          )}
        </div>

        {/* Active events */}
        {events.length > 0 && (
          <div>
            <div className="text-[10px] text-isia-muted uppercase mb-1">Active Events</div>
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => onOpenEvent(event.id)}
                className="w-full text-left p-2 rounded-lg border border-isia-border mb-1 hover:border-isia-accent transition-colors cursor-pointer"
              >
                <div className={`text-[10px] uppercase ${
                  event.urgency === "red" ? "text-urgency-red" : event.urgency === "orange" ? "text-urgency-orange" : "text-urgency-yellow"
                }`}>
                  {event.urgency}
                </div>
                <div className="text-xs">{event.headline}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
