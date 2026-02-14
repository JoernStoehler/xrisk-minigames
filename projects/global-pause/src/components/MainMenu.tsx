import type { Difficulty } from "../engine/types";
import { DIFFICULTIES } from "../data/difficulties";

interface Props {
  onStart: (difficulty: Difficulty) => void;
}

const DIFFICULTY_ORDER: Difficulty[] = ["tutorial", "normal", "realistic"];

export default function MainMenu({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-isia-bg flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-2 text-isia-accent text-sm tracking-[0.3em] uppercase">
          International Superintelligence Agency
        </div>
        <h1 className="text-5xl font-bold mb-2 tracking-tight">THE PAUSE</h1>
        <p className="text-isia-muted mb-12 text-lg">
          Enforce the treaty. Prevent extinction. Buy time for humanity.
        </p>

        <div className="grid gap-4 max-w-md mx-auto">
          {DIFFICULTY_ORDER.map((key) => {
            const config = DIFFICULTIES[key];
            return (
              <button
                key={key}
                onClick={() => onStart(key)}
                className="bg-isia-panel border border-isia-border rounded-lg p-4 text-left
                  hover:border-isia-accent hover:bg-isia-border/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-lg">{config.label}</span>
                  <span className="text-xs text-isia-muted">
                    {Math.round(config.maxWeeks / 52)} years
                  </span>
                </div>
                <p className="text-sm text-isia-muted">{config.description}</p>
              </button>
            );
          })}
        </div>

        <p className="text-isia-muted/50 text-xs mt-12">
          Based on the IABIED treaty framework &middot; MIRI Technical
          Governance proposals
        </p>
      </div>
    </div>
  );
}
