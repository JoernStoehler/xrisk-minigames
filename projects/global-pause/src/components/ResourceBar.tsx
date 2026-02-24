import type { ChoicePreview, ResourceKey } from "../engine/types";

const ICONS: Record<ResourceKey, string> = {
  trust: "🛡",
  funding: "💰",
  intel: "👁",
  leverage: "⚖",
};

const LABELS: Record<ResourceKey, string> = {
  trust: "Trust",
  funding: "Funding",
  intel: "Intel",
  leverage: "Leverage",
};

const BAR_COLORS: Record<ResourceKey, string> = {
  trust: "#2563EB",
  funding: "#CA8A04",
  intel: "#7C3AED",
  leverage: "#DC2626",
};

interface ResourceBarProps {
  resource: ResourceKey;
  value: number;
  preview: ChoicePreview | null;
}

export function ResourceBar({ resource, value, preview }: ResourceBarProps) {
  const danger = value <= 15 || value >= 85;

  let arrowText = "";
  if (preview) {
    if (preview.direction === "up") {
      arrowText = preview.size === "large" ? "▲▲" : "▲";
    } else {
      arrowText = preview.size === "large" ? "▼▼" : "▼";
    }
  }

  const isUp = preview?.direction === "up";

  return (
    <div className="flex flex-col items-center gap-1 w-[72px]">
      <span className="text-xl">{ICONS[resource]}</span>
      <div
        className={`relative w-5 h-28 rounded-md overflow-hidden border-2 ${
          danger
            ? "border-urgency-red bg-urgency-red/10"
            : "border-isia-border bg-isia-border/30"
        }`}
      >
        {/* Fill from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-[height] duration-400 ease-out"
          style={{ height: `${value}%`, backgroundColor: BAR_COLORS[resource] + "B3" }}
        />
        {/* Preview arrow overlay */}
        {preview && (
          <div
            className={`absolute inset-0 flex items-center justify-center text-xs font-bold animate-bar-pulse ${
              isUp ? "text-success" : "text-urgency-red"
            }`}
          >
            {arrowText}
          </div>
        )}
      </div>
      <span className="text-[11px] text-isia-muted font-semibold uppercase tracking-wider">
        {LABELS[resource]}
      </span>
    </div>
  );
}
