import type { DeathInfo } from "../engine/types";

const RESOURCE_ICONS: Record<string, string> = {
  trust: "🛡",
  funding: "💰",
  intel: "👁",
  leverage: "⚖",
};

interface DeathScreenProps {
  death: DeathInfo;
  turnsSurvived: number;
  onRestart: () => void;
}

export function DeathScreen({
  death,
  turnsSurvived,
  onRestart,
}: DeathScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 text-center bg-isia-bg">
      <div className="text-6xl mb-6">{RESOURCE_ICONS[death.resource]}</div>

      <h1 className="text-3xl font-extrabold text-urgency-red mb-2 uppercase tracking-wider">
        {death.extreme === "depleted" ? "Collapsed" : "Overloaded"}
      </h1>

      <div className="text-isia-muted text-sm font-semibold mb-6 uppercase tracking-wider">
        {death.resource} — {death.extreme}
      </div>

      <p className="text-isia-muted text-base max-w-sm mb-8 leading-relaxed">
        {death.message}
      </p>

      <div className="text-isia-muted/60 text-xs font-medium mb-8">
        Survived {turnsSurvived} {turnsSurvived === 1 ? "decision" : "decisions"}
      </div>

      <button
        className="px-8 py-4 bg-isia-accent text-white rounded-xl font-bold uppercase tracking-wider text-sm active:bg-isia-accent/80 transition-colors min-h-[44px] shadow-lg"
        onClick={onRestart}
      >
        Try Again
      </button>
    </div>
  );
}
