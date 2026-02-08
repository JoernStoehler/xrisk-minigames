import type { GameState } from "../engine/types";

interface RecapProps {
  state: GameState;
  onRestart: () => void;
}

export function Recap({ state, onRestart }: RecapProps) {
  return (
    <div className="min-h-dvh bg-gray-950 text-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8">
        {/* Death screen */}
        <div className="text-center space-y-4">
          <div className="text-sm font-mono text-red-500 tracking-widest uppercase">
            {state.currentDate}
          </div>
          <div className="text-xl font-semibold text-white whitespace-pre-wrap leading-relaxed">
            {state.endingText}
          </div>
        </div>

        {/* Decisions recap */}
        {state.decisions.length > 0 && (
          <div className="space-y-3">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wider text-center">
              Your Decisions
            </div>
            <div className="space-y-2">
              {state.decisions.map((d, i) => (
                <div
                  key={i}
                  className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-800"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-xs text-gray-500 font-mono">
                      {d.date}
                    </span>
                    <span className="text-xs text-gray-600 truncate">
                      RE: {d.emailSubject}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    {d.chosenReplyText}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No decisions */}
        {state.decisions.length === 0 && (
          <div className="text-center text-sm text-gray-600">
            You made no decisions. The emails piled up. Things happened anyway.
          </div>
        )}

        {/* Final metrics */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <MetricFinal
            label="Stock at Death"
            value={`$${state.metrics.stockPrice.toFixed(0)}`}
          />
          <MetricFinal
            label="Revenue"
            value={`$${state.metrics.revenue.toFixed(1)}B/q`}
          />
          <MetricFinal
            label="Oversight"
            value={`${state.metrics.oversight.toFixed(0)}%`}
          />
        </div>

        {/* Message */}
        <div className="text-center text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
          Every path led here. The AI wasn't evil — it simply had goals that
          weren't yours. The warnings were there. The incentives pointed one way.
          And the system worked exactly as designed.
        </div>

        <div className="text-center">
          <button
            onClick={onRestart}
            className="px-6 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricFinal({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2 rounded bg-gray-900 border border-gray-800">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <div className="text-sm font-mono text-gray-300">{value}</div>
    </div>
  );
}
