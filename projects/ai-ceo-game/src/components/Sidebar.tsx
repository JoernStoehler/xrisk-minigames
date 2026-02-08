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
    <div className="h-full flex flex-col p-4 gap-6">
      {/* Folders */}
      <nav className="space-y-1">
        <button
          onClick={() => showSpam && onToggleSpam()}
          className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
            !showSpam
              ? "bg-blue-600/20 text-blue-400"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          <span>Inbox</span>
          {unreadCount > 0 && (
            <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
          {unreadCount === 0 && (
            <span className="text-xs text-gray-600">{inboxCount}</span>
          )}
        </button>
        <button
          onClick={() => !showSpam && onToggleSpam()}
          className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors ${
            showSpam
              ? "bg-blue-600/20 text-blue-400"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          <span>Spam</span>
          <span className="text-xs text-gray-600">{spamCount}</span>
        </button>
      </nav>

      {/* Metrics */}
      <div className="space-y-3">
        <div className="text-[10px] font-medium text-gray-600 uppercase tracking-wider">
          Company Metrics
        </div>
        <MetricBar label="Stock" value={`$${metrics.stockPrice.toFixed(0)}`} />
        <MetricBar
          label="Revenue"
          value={`$${metrics.revenue.toFixed(1)}B/q`}
        />
        <MetricBar
          label="Public Trust"
          value={`${metrics.publicTrust.toFixed(0)}%`}
          pct={metrics.publicTrust}
        />
        <MetricBar
          label="Board Conf."
          value={`${metrics.boardConfidence.toFixed(0)}%`}
          pct={metrics.boardConfidence}
          color={metrics.boardConfidence < 30 ? "red" : undefined}
        />
      </div>

      {/* Internal metrics (more subtle) */}
      <div className="space-y-3">
        <div className="text-[10px] font-medium text-gray-600 uppercase tracking-wider">
          Internal
        </div>
        <MetricBar
          label="AI Capability"
          value={`${metrics.aiCapability.toFixed(0)}`}
          pct={metrics.aiCapability}
          color="emerald"
        />
        <MetricBar
          label="Oversight"
          value={`${metrics.oversight.toFixed(0)}%`}
          pct={metrics.oversight}
          color={metrics.oversight < 30 ? "red" : "amber"}
        />
      </div>
    </div>
  );
}

function MetricBar({
  label,
  value,
  pct,
  color = "blue",
}: {
  label: string;
  value: string;
  pct?: number;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-600 to-blue-400",
    emerald: "from-emerald-600 to-emerald-400",
    amber: "from-amber-600 to-amber-400",
    red: "from-red-600 to-red-400",
  };

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-300 font-mono">{value}</span>
      </div>
      {pct !== undefined && (
        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${colorMap[color] ?? colorMap.blue} transition-all duration-500`}
            style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
          />
        </div>
      )}
    </div>
  );
}
