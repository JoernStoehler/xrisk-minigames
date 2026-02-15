import type { GameEvent, GameState, RegionId } from "../engine/types";
import { REGION_INFO } from "../data/regions";
import MapBubble from "./MapBubble";

interface Props {
  state: GameState;
  onSelectRegion: (regionId: RegionId) => void;
  onPopEvent: (eventId: string) => void;
  onOpenEvent: (eventId: string) => void;
}

// Simplified world map SVG paths
const REGION_PATHS: Record<RegionId, string> = {
  us: "M 50,100 L 120,95 135,100 140,110 145,130 130,145 110,148 90,150 60,148 40,140 35,125 38,110 Z M 25,90 L 45,85 55,95 45,105 30,100 Z",
  eu: "M 220,75 L 250,65 270,70 280,80 275,95 265,105 255,110 240,108 230,100 225,90 Z",
  russia:
    "M 260,40 L 290,35 340,30 380,35 400,40 410,55 400,65 380,70 350,75 310,70 280,72 265,65 255,55 Z",
  china:
    "M 340,80 L 370,75 390,80 400,90 395,105 385,115 370,118 355,115 340,108 335,95 Z",
  row: "M 140,170 L 180,155 220,160 260,170 280,185 270,210 240,225 200,230 160,220 130,200 Z M 300,130 L 330,125 345,135 340,150 320,155 305,145 Z M 220,130 L 240,125 255,135 248,148 230,145 Z",
};

const VB_W = 440;
const VB_H = 260;

// Poppable event types: minor events where cheapest response <= 5 PC
const POPPABLE_TYPES = new Set([
  "whistleblower_tip",
  "chip_smuggling",
  "corporate_evasion",
  "political_pressure",
  "public_backlash",
]);

function isPoppable(event: GameEvent): boolean {
  if (event.urgency === "red") return false;
  if (!POPPABLE_TYPES.has(event.type)) return false;
  const cheapest = Math.min(...event.responses.map((r) => r.politicalCapitalCost));
  return cheapest <= 5;
}

function getCooperationFill(cooperation: number): string {
  if (cooperation >= 70) return "rgba(34, 197, 94, 0.25)";
  if (cooperation >= 50) return "rgba(34, 197, 94, 0.15)";
  if (cooperation >= 30) return "rgba(234, 179, 8, 0.2)";
  if (cooperation >= 15) return "rgba(249, 115, 22, 0.2)";
  return "rgba(239, 68, 68, 0.25)";
}

export default function WorldMap({
  state,
  onSelectRegion,
  onPopEvent,
  onOpenEvent,
}: Props) {
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
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="inspector-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((frac) => (
          <line
            key={`h-${frac}`}
            x1={0}
            y1={VB_H * frac}
            x2={VB_W}
            y2={VB_H * frac}
            stroke="#1f293720"
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
            stroke="#1f293720"
            strokeWidth={0.5}
          />
        ))}

        {/* Region shapes */}
        {Object.entries(REGION_PATHS).map(([id, path]) => {
          const regionId = id as RegionId;
          const region = state.regions[regionId];

          return (
            <g key={regionId}>
              {region.inspectorDeployed && (
                <path
                  d={path}
                  fill="rgba(59, 130, 246, 0.15)"
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth={2}
                  filter="url(#inspector-glow)"
                />
              )}
              <path
                d={path}
                fill={getCooperationFill(region.cooperation)}
                stroke={region.inspectorDeployed ? "#3b82f6" : "#1f2937"}
                strokeWidth={1}
                className="cursor-pointer transition-colors hover:brightness-150"
                onClick={() => onSelectRegion(regionId)}
              />

              <text
                x={REGION_INFO[regionId].mapX * VB_W * 0.01}
                y={REGION_INFO[regionId].mapY * VB_H * 0.01}
                textAnchor="middle"
                className="text-[8px] fill-isia-muted pointer-events-none select-none"
              >
                {REGION_INFO[regionId].shortName}
              </text>

              {eventsByRegion[regionId].map((event, i) => {
                const centerX = REGION_INFO[regionId].mapX * VB_W * 0.01;
                const centerY = REGION_INFO[regionId].mapY * VB_H * 0.01 + 12;
                const count = eventsByRegion[regionId].length;
                const cx = centerX + (i - (count - 1) / 2) * 14;
                const cy = centerY;

                return (
                  <MapBubble
                    key={event.id}
                    event={event}
                    cx={cx}
                    cy={cy}
                    isPoppable={isPoppable(event)}
                    onPop={onPopEvent}
                    onOpenModal={onOpenEvent}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
