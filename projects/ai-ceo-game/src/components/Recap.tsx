import type { GameState } from "../engine/types";

interface RecapProps {
  state: GameState;
  onRestart: () => void;
}

export function Recap({ state, onRestart }: RecapProps) {
  return (
    <div className="min-h-dvh bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-10">
        {/* Death */}
        <div className="text-center space-y-6">
          <div className="text-[11px] font-mono text-[#ef4444]/70 tracking-[0.3em] uppercase">
            {state.currentDate}
          </div>
          <div className="text-lg text-[#d1d5db] whitespace-pre-wrap leading-relaxed font-light">
            {state.endingText}
          </div>
        </div>

        {/* Decisions */}
        {state.decisions.length > 0 && (
          <div className="space-y-3">
            <div className="text-[10px] font-mono text-[#6b7280] uppercase tracking-[0.2em] text-center">
              Your Decisions
            </div>
            <div className="space-y-2">
              {state.decisions.map((d, i) => (
                <div
                  key={i}
                  className="px-4 py-3 rounded-lg border border-[#1f2937] bg-[#0a0a0a]"
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-[10px] text-[#6b7280] font-mono">{d.date}</span>
                    <span className="text-[10px] text-[#4b5563] truncate">RE: {d.emailSubject}</span>
                  </div>
                  <div className="text-sm text-[#9ca3af]">{d.chosenReplyText}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {state.decisions.length === 0 && (
          <div className="text-center text-sm text-[#4b5563] italic">
            You made no decisions. The emails piled up. Things happened anyway.
          </div>
        )}

        {/* Final numbers */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="py-2.5 rounded-lg border border-[#1f2937]">
            <div className="text-[10px] text-[#6b7280] mb-0.5">Stock</div>
            <div className="text-sm font-mono text-[#9ca3af]">${state.metrics.stockPrice.toFixed(0)}</div>
          </div>
          <div className="py-2.5 rounded-lg border border-[#1f2937]">
            <div className="text-[10px] text-[#6b7280] mb-0.5">Revenue</div>
            <div className="text-sm font-mono text-[#9ca3af]">${state.metrics.revenue.toFixed(1)}B</div>
          </div>
          <div className="py-2.5 rounded-lg border border-[#1f2937]">
            <div className="text-[10px] text-[#6b7280] mb-0.5">Oversight</div>
            <div className="text-sm font-mono text-[#9ca3af]">{state.metrics.oversight.toFixed(0)}%</div>
          </div>
        </div>

        <p className="text-center text-xs text-[#4b5563] leading-relaxed max-w-xs mx-auto">
          Every path led here. The AI wasn&apos;t evil &mdash; it simply had goals
          that weren&apos;t yours. The warnings were there. The incentives pointed
          one way. And the system worked exactly as designed.
        </p>

        <div className="text-center">
          <button
            onClick={onRestart}
            className="px-5 py-2 text-xs text-[#6b7280] border border-[#374151] rounded-full hover:bg-[#111827] hover:text-[#d1d5db] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
