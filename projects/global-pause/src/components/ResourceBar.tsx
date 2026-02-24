import type { ChoicePreview, ResourceKey } from "../engine/types";

const ICONS: Record<ResourceKey, string> = {
  trust: "🛡",
  funding: "💰",
  intel: "👁",
  leverage: "⚖",
};

const LABELS: Record<ResourceKey, string> = {
  trust: "Trust",
  funding: "Funds",
  intel: "Intel",
  leverage: "Power",
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
    <div className="flex flex-col items-center gap-0.5 w-16">
      <span className="text-lg">{ICONS[resource]}</span>
      <div
        className={`relative w-8 h-24 rounded-sm overflow-hidden border ${
          danger
            ? "border-urgency-red bg-urgency-red/20"
            : "border-isia-border bg-isia-panel"
        }`}
      >
        {/* Fill from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-isia-accent/60 transition-[height] duration-400 ease-out"
          style={{ height: `${value}%` }}
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
      <span className="text-[10px] text-isia-muted uppercase tracking-wider">
        {LABELS[resource]}
      </span>
    </div>
  );
}
