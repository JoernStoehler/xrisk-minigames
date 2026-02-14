import type { GameEvent } from "../engine/types";

interface Props {
  event: GameEvent;
  isSelected: boolean;
  onClick: () => void;
}

const TYPE_LABELS: Record<GameEvent["type"], string> = {
  chip_smuggling: "SMUGGLING",
  rogue_datacenter: "ROGUE DC",
  prohibited_research: "RESEARCH",
  political_pressure: "POLITICAL",
  whistleblower_tip: "TIPOFF",
  non_signatory_threat: "NON-PARTY",
  algorithmic_breakthrough: "ALGO BREAK",
  corporate_evasion: "EVASION",
  treaty_withdrawal_threat: "WITHDRAWAL",
  public_backlash: "BACKLASH",
};

const URGENCY_COLORS = {
  yellow: "border-urgency-yellow text-urgency-yellow",
  orange: "border-urgency-orange text-urgency-orange",
  red: "border-urgency-red text-urgency-red",
};

export default function EventCard({ event, isSelected, onClick }: Props) {
  const weeksLeft = event.deadlineWeek - event.weekCreated;
  const urgencyClass = URGENCY_COLORS[event.urgency];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded border transition-colors cursor-pointer ${
        isSelected
          ? "bg-isia-accent/10 border-isia-accent"
          : "bg-isia-panel border-isia-border hover:border-isia-muted"
      }`}
    >
      <div className="flex items-start gap-2">
        <div
          className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
            event.urgency === "red"
              ? "bg-urgency-red animate-urgency"
              : event.urgency === "orange"
                ? "bg-urgency-orange"
                : "bg-urgency-yellow"
          }`}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className={`text-[10px] font-bold border px-1 rounded ${urgencyClass}`}
            >
              {TYPE_LABELS[event.type]}
            </span>
            <span className="text-[10px] text-isia-muted">
              {weeksLeft}w left
            </span>
            {event.informationQuality === "low" && (
              <span className="text-[10px] text-urgency-orange">[unverified]</span>
            )}
          </div>
          <p className="text-sm leading-tight truncate">{event.headline}</p>
        </div>
      </div>
    </button>
  );
}
