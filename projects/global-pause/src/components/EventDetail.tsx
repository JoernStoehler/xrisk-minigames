import type { GameEvent, GameState, ResponseType } from "../engine/types";
import { REGION_INFO } from "../data/regions";

interface Props {
  event: GameEvent;
  state: GameState;
  onRespond: (eventId: string, responseType: ResponseType) => void;
  onClose: () => void;
}

const URGENCY_LABELS = {
  yellow: "LOW",
  orange: "MEDIUM",
  red: "HIGH",
};

const URGENCY_COLORS = {
  yellow: "text-urgency-yellow",
  orange: "text-urgency-orange",
  red: "text-urgency-red",
};

export default function EventDetail({
  event,
  state,
  onRespond,
  onClose,
}: Props) {
  const region = state.regions[event.region];
  const weeksLeft = event.deadlineWeek - state.week;

  return (
    <div className="bg-isia-panel border border-isia-border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs font-bold ${URGENCY_COLORS[event.urgency]}`}
            >
              URGENCY: {URGENCY_LABELS[event.urgency]}
            </span>
            <span className="text-xs text-isia-muted">
              {REGION_INFO[event.region].name}
            </span>
            <span className="text-xs text-isia-muted">
              {weeksLeft > 0 ? `${weeksLeft} weeks remaining` : "OVERDUE"}
            </span>
          </div>
          <h3 className="text-lg font-bold">{event.headline}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-isia-muted hover:text-isia-text cursor-pointer text-lg leading-none"
        >
          x
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-isia-muted leading-relaxed">
          {event.description}
        </p>
        {event.informationQuality === "high" && event.hiddenDescription && (
          <p className="text-sm text-isia-accent mt-2 border-l-2 border-isia-accent pl-3">
            Intel: {event.hiddenDescription}
          </p>
        )}
        {event.informationQuality === "low" && (
          <p className="text-xs text-urgency-orange mt-2">
            Low intelligence coverage in this region. Information may be
            unreliable.
          </p>
        )}
      </div>

      {/* Regional context */}
      <div className="flex gap-4 text-xs text-isia-muted mb-4">
        <span>
          Cooperation:{" "}
          <span
            className={
              region.cooperation < 30
                ? "text-urgency-red"
                : region.cooperation < 60
                  ? "text-urgency-yellow"
                  : "text-success"
            }
          >
            {Math.round(region.cooperation)}%
          </span>
        </span>
        <span>
          Intel:{" "}
          <span className="text-isia-text">
            {Math.round(region.intelligenceCoverage)}%
          </span>
        </span>
        {region.inspectorDeployed && (
          <span className="text-isia-accent">Inspector on-site</span>
        )}
      </div>

      {/* Response options */}
      <div className="space-y-2">
        <div className="text-xs text-isia-muted uppercase tracking-wider mb-1">
          Available Responses
        </div>
        {event.responses.map((response) => {
          const canAfford =
            state.resources.politicalCapital >= response.politicalCapitalCost;
          const hasInspector =
            !response.requiresInspector || state.resources.inspectorTeams > 0;
          const disabled = !canAfford || !hasInspector;

          // Show modified probability
          let prob = response.successProbability;
          if (region.inspectorDeployed) prob += 0.1;
          if (region.intelligenceCoverage > 50) {
            prob += (region.intelligenceCoverage - 50) * 0.002;
          }
          prob = Math.min(prob, 0.95);

          return (
            <button
              key={response.type + response.label}
              onClick={() => !disabled && onRespond(event.id, response.type)}
              disabled={disabled}
              className={`w-full text-left p-3 rounded border transition-colors ${
                disabled
                  ? "border-isia-border/50 opacity-50 cursor-not-allowed"
                  : "border-isia-border hover:border-isia-accent cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">{response.label}</span>
                <div className="flex items-center gap-3 text-xs">
                  {response.politicalCapitalCost > 0 && (
                    <span
                      className={canAfford ? "text-isia-accent" : "text-urgency-red"}
                    >
                      -{response.politicalCapitalCost} PC
                    </span>
                  )}
                  {response.requiresInspector && (
                    <span
                      className={hasInspector ? "text-isia-accent" : "text-urgency-red"}
                    >
                      Inspector
                    </span>
                  )}
                  <span className="text-isia-muted">
                    {Math.round(prob * 100)}% success
                  </span>
                </div>
              </div>
              <p className="text-xs text-isia-muted">{response.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
