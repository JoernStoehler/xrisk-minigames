import { useState } from "react";
import type { GameEvent, GameState, ResponseType } from "../engine/types";

interface Props {
  event: GameEvent;
  state: GameState;
  onRespond: (eventId: string, responseType: ResponseType) => void;
  onClose: () => void;
}

export default function EventModal({ event, state, onRespond, onClose }: Props) {
  const [result, setResult] = useState<"success" | "failure" | null>(null);

  const handleRespond = (responseType: ResponseType) => {
    onRespond(event.id, responseType);
    // Check the result from updated state - we'll show it briefly
    // For now, just close after a brief delay
    const wasResolved = event.resolved;
    if (!wasResolved) {
      // Show result briefly then close
      setResult("success"); // Placeholder - actual result comes from state
      setTimeout(() => onClose(), 800);
    }
  };

  if (result) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <div className="bg-isia-panel border border-isia-border rounded-xl p-6 max-w-sm w-full text-center">
          <div className="text-3xl mb-2">
            {result === "success" ? "\u2713" : "\u2717"}
          </div>
          <p className="text-sm text-isia-muted">Response submitted</p>
        </div>
      </div>
    );
  }

  const regionIntel = state.regions[event.region].intelligenceCoverage;
  const inspectorBonus = state.regions[event.region].inspectorDeployed;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        className="bg-isia-panel border border-isia-border rounded-t-xl sm:rounded-xl p-4 max-w-sm w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${
              event.urgency === "red" ? "text-urgency-red" : event.urgency === "orange" ? "text-urgency-orange" : "text-urgency-yellow"
            }`}>
              {event.urgency === "red" ? "CRITICAL" : event.urgency === "orange" ? "URGENT" : "ADVISORY"} &middot; {event.type.replace(/_/g, " ")}
            </div>
            <h2 className="text-sm font-bold leading-tight">{event.headline}</h2>
          </div>
          <button onClick={onClose} className="text-isia-muted hover:text-isia-text ml-2 cursor-pointer text-lg leading-none">&times;</button>
        </div>

        {/* Description */}
        <p className="text-xs text-isia-muted mb-3 leading-relaxed">{event.description}</p>

        {/* Intel section */}
        {event.informationQuality === "high" && event.hiddenDescription && (
          <div className="bg-isia-accent/10 border border-isia-accent/30 rounded-lg p-2 mb-3">
            <div className="text-[10px] text-isia-accent uppercase tracking-wider font-bold mb-1">Intel Report</div>
            <p className="text-xs text-isia-muted leading-relaxed">{event.hiddenDescription}</p>
          </div>
        )}

        {/* Region info */}
        <div className="flex gap-3 text-[10px] text-isia-muted mb-3">
          <span>Region: {state.regions[event.region].name}</span>
          <span>Intel: {regionIntel}%</span>
          {inspectorBonus && <span className="text-isia-accent">Inspector +10%</span>}
        </div>

        {/* Deadline */}
        <div className="text-[10px] text-isia-muted mb-4">
          Weeks remaining: <span className={`font-bold ${event.urgency === "red" ? "text-urgency-red" : ""}`}>
            {Math.max(0, event.deadlineWeek - state.week)}
          </span>
        </div>

        {/* Response buttons */}
        <div className="flex flex-col gap-2">
          {event.responses.map((response) => {
            const canAfford = state.resources.politicalCapital >= response.politicalCapitalCost;
            const hasInspector = !response.requiresInspector || state.resources.inspectorTeams > 0;
            const enabled = canAfford && hasInspector;

            return (
              <button
                key={response.type}
                onClick={() => enabled && handleRespond(response.type)}
                disabled={!enabled}
                className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                  enabled
                    ? "border-isia-border hover:border-isia-accent bg-isia-bg/50"
                    : "border-isia-border/50 opacity-40 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-bold">{response.label}</span>
                  <span className="text-[10px] text-isia-muted font-mono">
                    {response.politicalCapitalCost} PC
                    {response.requiresInspector && " + Inspector"}
                  </span>
                </div>
                <p className="text-[11px] text-isia-muted leading-snug">{response.description}</p>
                <div className="text-[10px] text-isia-muted mt-1">
                  Success: {Math.round(response.successProbability * 100)}%
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
