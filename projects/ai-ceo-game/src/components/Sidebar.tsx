import type { GameMetrics } from "../engine/types";

interface SidebarProps {
  metrics: GameMetrics;
  showSpam: boolean;
  onToggleSpam: () => void;
  inboxCount: number;
  unreadCount: number;
  spamCount: number;
}

export function Sidebar({
  metrics,
  showSpam,
  onToggleSpam,
  inboxCount,
  unreadCount,
  spamCount,
}: SidebarProps) {
  return (
    <div className="h-full flex flex-col p-3 gap-5 overflow-y-auto">
      {/* Folders */}
      <nav className="space-y-0.5">
        <button
          onClick={() => showSpam && onToggleSpam()}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors ${
            !showSpam
              ? "bg-[#ececf1] text-[#0d0d0d] font-medium"
              : "text-[#6e6e80] hover:bg-[#ececf1]/50"
          }`}
        >
          <span>Inbox</span>
          {unreadCount > 0 && (
            <span className="text-[11px] bg-[#0d0d0d] text-white w-5 h-5 flex items-center justify-center rounded-full font-medium">
              {unreadCount}
            </span>
          )}
          {unreadCount === 0 && (
            <span className="text-[11px] text-[#8e8ea0]">{inboxCount}</span>
          )}
        </button>
        <button
          onClick={() => !showSpam && onToggleSpam()}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors ${
            showSpam
              ? "bg-[#ececf1] text-[#0d0d0d] font-medium"
              : "text-[#6e6e80] hover:bg-[#ececf1]/50"
          }`}
        >
          <span>Spam</span>
          <span className="text-[11px] text-[#8e8ea0]">{spamCount}</span>
        </button>
      </nav>

      <div className="h-px bg-[#ececf1]" />

      {/* Metrics */}
      <div className="space-y-3">
        <div className="text-[10px] font-medium text-[#8e8ea0] uppercase tracking-wider px-1">
          Company
        </div>
        <MetricRow label="OAIN" value={`$${metrics.stockPrice.toFixed(0)}`} />
        <MetricRow label="Revenue" value={`$${metrics.revenue.toFixed(1)}B/q`} />
        <MetricBar
          label="Public Trust"
          value={`${metrics.publicTrust.toFixed(0)}%`}
          pct={metrics.publicTrust}
        />
        <MetricBar
          label="Board"
          value={`${metrics.boardConfidence.toFixed(0)}%`}
          pct={metrics.boardConfidence}
          warn={metrics.boardConfidence < 30}
        />
      </div>

      <div className="space-y-3">
        <div className="text-[10px] font-medium text-[#8e8ea0] uppercase tracking-wider px-1">
          Internal
        </div>
        <MetricBar
          label="AI Capability"
          value={`${metrics.aiCapability.toFixed(0)}`}
          pct={metrics.aiCapability}
          color="dark"
        />
        <MetricBar
          label="Oversight"
          value={`${metrics.oversight.toFixed(0)}%`}
          pct={metrics.oversight}
          warn={metrics.oversight < 30}
          color="amber"
        />
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline px-1">
      <span className="text-xs text-[#6e6e80]">{label}</span>
      <span className="text-[13px] font-medium text-[#0d0d0d] tabular-nums">{value}</span>
    </div>
  );
}

function MetricBar({
  label,
  value,
  pct,
  color = "default",
  warn = false,
}: {
  label: string;
  value: string;
  pct: number;
  color?: string;
  warn?: boolean;
}) {
  const barColor = warn
    ? "bg-[#ef4444]"
    : color === "dark"
      ? "bg-[#0d0d0d]"
      : color === "amber"
        ? "bg-[#f59e0b]"
        : "bg-[#6e6e80]";

  return (
    <div className="px-1">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#6e6e80]">{label}</span>
        <span className={`tabular-nums ${warn ? "text-[#ef4444] font-medium" : "text-[#353740]"}`}>
          {value}
        </span>
      </div>
      <div className="w-full bg-[#ececf1] rounded-full h-1 overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        />
      </div>
    </div>
  );
}
