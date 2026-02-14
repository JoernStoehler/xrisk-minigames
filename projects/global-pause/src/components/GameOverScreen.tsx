import type { GameState, LossReason } from "../engine/types";
import { weekToDate } from "../engine/state";

interface Props {
  state: GameState;
  onRestart: () => void;
}

const LOSS_MESSAGES: Record<LossReason, { title: string; description: string }> = {
  asi_created: {
    title: "EXTINCTION",
    description:
      "An undetected training run completed. Artificial superintelligence was created before alignment was solved. The pause failed.",
  },
  treaty_collapsed: {
    title: "TREATY COLLAPSED",
    description:
      "Too many signatory nations withdrew from the treaty. Without international enforcement, the race to ASI resumed. Extinction followed.",
  },
  public_revolt: {
    title: "PUBLIC REVOLT",
    description:
      "Public support for the treaty collapsed entirely. The ISIA was defunded and disbanded. Without monitoring, the pause could not hold.",
  },
};

export default function GameOverScreen({ state, onRestart }: Props) {
  const won = state.phase === "won";

  return (
    <div className="min-h-screen bg-isia-bg flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {won ? (
          <>
            <div className="text-success text-6xl mb-4">&#10003;</div>
            <h1 className="text-4xl font-bold mb-2 text-success">
              HUMANITY SURVIVES
            </h1>
            <p className="text-isia-muted mb-8">
              Safety research reached completion. Human intelligence
              augmentation provides a lasting off-ramp from ASI risk. The pause
              held long enough for humanity to find another path forward.
            </p>
          </>
        ) : (
          <>
            <div className="text-urgency-red text-6xl mb-4">&#10007;</div>
            <h1 className="text-4xl font-bold mb-2 text-urgency-red">
              {state.lossReason
                ? LOSS_MESSAGES[state.lossReason].title
                : "GAME OVER"}
            </h1>
            <p className="text-isia-muted mb-8">
              {state.lossReason
                ? LOSS_MESSAGES[state.lossReason].description
                : "The pause failed."}
            </p>
          </>
        )}

        {/* Stats */}
        <div className="bg-isia-panel border border-isia-border rounded-lg p-4 mb-8 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-isia-muted mb-3">
            Mission Summary
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-isia-muted">Duration</div>
            <div className="font-mono">
              {weekToDate(state.week)} ({state.stats.weeksSurvived} weeks)
            </div>
            <div className="text-isia-muted">Events handled</div>
            <div className="font-mono">{state.stats.eventsHandled}</div>
            <div className="text-isia-muted">Events missed</div>
            <div className="font-mono">{state.stats.eventsIgnored}</div>
            <div className="text-isia-muted">Inspections</div>
            <div className="font-mono">{state.stats.inspectionsLaunched}</div>
            <div className="text-isia-muted">Sanctions</div>
            <div className="font-mono">{state.stats.sanctionsApplied}</div>
            <div className="text-isia-muted">Protective actions</div>
            <div className="font-mono">{state.stats.protectiveActions}</div>
            <div className="text-isia-muted">Safety research</div>
            <div className="font-mono">
              {Math.round(state.resources.safetyResearchProgress)}%
            </div>
            <div className="text-isia-muted">ASI risk at end</div>
            <div className="font-mono">
              {Math.round(state.algorithmicProgress)}%
            </div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="bg-isia-accent hover:bg-isia-accent/80 text-white font-bold py-3 px-8 rounded-lg cursor-pointer transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
