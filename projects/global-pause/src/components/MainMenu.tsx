import type { Difficulty } from "../engine/types";
import { DIFFICULTIES } from "../data/difficulties";

interface Props {
  onStart: (difficulty: Difficulty) => void;
}

const DIFFICULTY_ORDER: Difficulty[] = ["tutorial", "normal", "realistic"];

export default function MainMenu({ onStart }: Props) {
  return (
    <div className="h-dvh bg-isia-bg flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center">
        <div className="mb-2 text-isia-accent text-[10px] tracking-[0.3em] uppercase">
          International Superintelligence Agency
        </div>
        <h1 className="text-4xl font-bold mb-2 tracking-tight">THE PAUSE</h1>
        <p className="text-isia-muted mb-10 text-sm leading-relaxed">
          Enforce the treaty. Prevent extinction. Buy time for humanity.
        </p>

        <div className="flex flex-col gap-3">
          {DIFFICULTY_ORDER.map((key) => {
            const config = DIFFICULTIES[key];
            return (
              <button
                key={key}
                onClick={() => onStart(key)}
                className="bg-isia-panel border border-isia-border rounded-lg p-4 text-left
                  hover:border-isia-accent active:bg-isia-border/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">{config.label}</span>
                  <span className="text-[10px] text-isia-muted">
                    {Math.round(config.maxWeeks / 52)} years
                  </span>
                </div>
                <p className="text-xs text-isia-muted leading-relaxed">{config.description}</p>
              </button>
            );
          })}
        </div>

        <p className="text-isia-muted/50 text-[9px] mt-10">
          Based on the IABIED treaty framework &middot; MIRI Technical
          Governance proposals
        </p>
      </div>
    </div>
  );
}
