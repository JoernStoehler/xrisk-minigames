import type { GameEvent } from "../engine/types";

interface Props {
  events: GameEvent[];
  eventLog: GameEvent[];
}

export default function NewsTicker({ events, eventLog }: Props) {
  // Show recent headlines: active events + last 3 resolved
  const recentResolved = eventLog
    .filter((e) => e.outcome)
    .slice(-3)
    .map((e) => {
      const prefix = e.outcome === "success" ? "RESOLVED" : e.outcome === "failure" ? "FAILED" : "EXPIRED";
      return `${prefix}: ${e.headline}`;
    });

  const activeHeadlines = events
    .filter((e) => !e.resolved)
    .map((e) => e.headline);

  const allHeadlines = [...activeHeadlines, ...recentResolved];
  if (allHeadlines.length === 0) {
    allHeadlines.push("ISIA operations nominal. Monitoring global compute activity.");
  }

  const tickerText = allHeadlines.join(" \u2022 ");

  return (
    <div className="bg-isia-panel border-b border-isia-border h-6 overflow-hidden relative">
      <div className="absolute whitespace-nowrap animate-ticker text-[11px] text-isia-muted leading-6">
        {tickerText} &nbsp;&bull;&nbsp; {tickerText}
      </div>
    </div>
  );
}
