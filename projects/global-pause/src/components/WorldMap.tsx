import type { GameEvent, GameState, RegionId } from "../engine/types";
import { REGION_INFO } from "../data/regions";

interface Props {
  state: GameState;
  onSelectRegion: (regionId: RegionId) => void;
  selectedRegion: RegionId | null;
}

// Simplified world map SVG paths for each region
// These are rough outlines — good enough for a game
const REGION_PATHS: Record<RegionId, string> = {
  us: "M 50,100 L 120,95 135,100 140,110 145,130 130,145 110,148 90,150 60,148 40,140 35,125 38,110 Z M 25,90 L 45,85 55,95 45,105 30,100 Z",
  eu: "M 220,75 L 250,65 270,70 280,80 275,95 265,105 255,110 240,108 230,100 225,90 Z",
  russia:
    "M 260,40 L 290,35 340,30 380,35 400,40 410,55 400,65 380,70 350,75 310,70 280,72 265,65 255,55 Z",
  china:
    "M 340,80 L 370,75 390,80 400,90 395,105 385,115 370,118 355,115 340,108 335,95 Z",
  row: "M 140,170 L 180,155 220,160 260,170 280,185 270,210 240,225 200,230 160,220 130,200 Z M 300,130 L 330,125 345,135 340,150 320,155 305,145 Z M 220,130 L 240,125 255,135 248,148 230,145 Z",
};

// ViewBox dimensions
const VB_W = 440;
const VB_H = 260;

function getCooperationColor(cooperation: number): string {
  if (cooperation >= 60) return "#22c55e30";
  if (cooperation >= 30) return "#eab30830";
  return "#ef444430";
}

function getUrgencyColor(urgency: GameEvent["urgency"]): string {
  if (urgency === "red") return "#ef4444";
  if (urgency === "orange") return "#f97316";
  return "#eab308";
}

export default function WorldMap({
  state,
  onSelectRegion,
  selectedRegion,
}: Props) {
  // Group active events by region
  const eventsByRegion: Record<RegionId, GameEvent[]> = {
    us: [],
    china: [],
    eu: [],
    russia: [],
    row: [],
  };
  for (const event of state.activeEvents) {
    if (!event.resolved) {
      eventsByRegion[event.region].push(event);
    }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="w-full h-full max-h-[60vh]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines for atmosphere */}
        {[0.25, 0.5, 0.75].map((frac) => (
          <line
            key={`h-${frac}`}
            x1={0}
            y1={VB_H * frac}
            x2={VB_W}
            y2={VB_H * frac}
            stroke="#1f293740"
            strokeWidth={0.5}
          />
        ))}
        {[0.25, 0.5, 0.75].map((frac) => (
          <line
            key={`v-${frac}`}
            x1={VB_W * frac}
            y1={0}
            x2={VB_W * frac}
            y2={VB_H}
            stroke="#1f293740"
            strokeWidth={0.5}
          />
        ))}

        {/* Region shapes */}
        {Object.entries(REGION_PATHS).map(([id, path]) => {
          const regionId = id as RegionId;
          const region = state.regions[regionId];
          const isSelected = selectedRegion === regionId;
          const events = eventsByRegion[regionId];
          const hasUrgent = events.some((e) => e.urgency === "red");

          return (
            <g key={regionId}>
              <path
                d={path}
                fill={getCooperationColor(region.cooperation)}
                stroke={
                  isSelected
                    ? "#3b82f6"
                    : hasUrgent
                      ? "#ef4444"
                      : "#1f2937"
                }
                strokeWidth={isSelected ? 2 : 1}
                className="cursor-pointer transition-colors hover:brightness-150"
                onClick={() => onSelectRegion(regionId)}
              />

              {/* Region label */}
              <text
                x={REGION_INFO[regionId].mapX * VB_W * 0.01}
                y={REGION_INFO[regionId].mapY * VB_H * 0.01}
                textAnchor="middle"
                className="text-[8px] fill-isia-muted pointer-events-none select-none"
              >
                {REGION_INFO[regionId].shortName}
              </text>

              {/* Event markers */}
              {events.map((event, i) => {
                const cx =
                  REGION_INFO[regionId].mapX * VB_W * 0.01 + (i - events.length / 2) * 8;
                const cy = REGION_INFO[regionId].mapY * VB_H * 0.01 + 10;
                return (
                  <g key={event.id}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={getUrgencyColor(event.urgency)}
                      opacity={0.9}
                      className={
                        event.urgency === "red" ? "animate-urgency" : ""
                      }
                    />
                    {event.urgency === "red" && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={7}
                        fill="none"
                        stroke={getUrgencyColor(event.urgency)}
                        strokeWidth={0.5}
                        opacity={0.4}
                        className="animate-urgency"
                      />
                    )}
                  </g>
                );
              })}

              {/* Inspector deployed indicator */}
              {region.inspectorDeployed && (
                <text
                  x={REGION_INFO[regionId].mapX * VB_W * 0.01 + 12}
                  y={REGION_INFO[regionId].mapY * VB_H * 0.01 - 3}
                  className="text-[7px] fill-isia-accent pointer-events-none"
                >
                  [INS]
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
