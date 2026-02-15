import type { GameEvent } from "../engine/types";

interface Props {
  event: GameEvent;
  cx: number;
  cy: number;
  isPoppable: boolean;
  onPop: (eventId: string) => void;
  onOpenModal: (eventId: string) => void;
}

function getUrgencyColor(urgency: GameEvent["urgency"]): string {
  if (urgency === "red") return "#ef4444";
  if (urgency === "orange") return "#f97316";
  return "#eab308";
}

const EVENT_ICONS: Record<string, string> = {
  chip_smuggling: "\u2327",
  rogue_datacenter: "\u26A0",
  prohibited_research: "\u2622",
  political_pressure: "\u2691",
  whistleblower_tip: "\u2709",
  non_signatory_threat: "\u2694",
  algorithmic_breakthrough: "\u26A1",
  corporate_evasion: "\u2318",
  treaty_withdrawal_threat: "\u2620",
  public_backlash: "\u2661",
};

export default function MapBubble({
  event,
  cx,
  cy,
  isPoppable,
  onPop,
  onOpenModal,
}: Props) {
  const color = getUrgencyColor(event.urgency);
  const icon = EVENT_ICONS[event.type] ?? "?";

  if (isPoppable) {
    return (
      <g
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onPop(event.id);
        }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill={color}
          opacity={0.9}
          className="animate-bubble-float"
        />
        {event.urgency === "red" && (
          <circle
            cx={cx}
            cy={cy}
            r={9}
            fill="none"
            stroke={color}
            strokeWidth={0.5}
            opacity={0.4}
            className="animate-urgency"
          />
        )}
      </g>
    );
  }

  return (
    <g
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onOpenModal(event.id);
      }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={10}
        fill={color}
        opacity={0.85}
        className="animate-bubble-float"
      />
      <text
        x={cx}
        y={cy + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[8px] fill-white pointer-events-none select-none"
      >
        {icon}
      </text>
      {event.urgency === "red" && (
        <circle
          cx={cx}
          cy={cy}
          r={14}
          fill="none"
          stroke={color}
          strokeWidth={0.5}
          opacity={0.4}
          className="animate-urgency"
        />
      )}
    </g>
  );
}
