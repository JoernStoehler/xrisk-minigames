import { useState, useEffect } from "react";
import type { Email, GameState } from "../engine/types";
import { saveUIState, loadUIState } from "../engine/useGame";
import { Inbox } from "./Inbox";
import { EmailView } from "./EmailView";
import { Sidebar } from "./Sidebar";
import { Disclaimer } from "./Disclaimer";

interface DashboardProps {
  state: GameState;
  emails: Email[];
  onAdvance: () => void;
  nextEmailDate: string | null;
  onReply: (emailId: string, replyId: string) => void;
  onRead: (emailId: string) => void;
  onToggleStar: (emailId: string) => void;
  onNewGame: () => void;
}

export function Dashboard({
  state,
  emails,
  onAdvance,
  nextEmailDate,
  onReply,
  onRead,
  onToggleStar,
  onNewGame,
}: DashboardProps) {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(() => loadUIState().selectedEmailId);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // Persist UI state
  useEffect(() => {
    saveUIState({ selectedEmailId });
  }, [selectedEmailId]);

  const effectiveSelectedId = emails.some((e) => e.id === selectedEmailId)
    ? selectedEmailId
    : null;
  const selectedEmail = effectiveSelectedId
    ? emails.find((e) => e.id === effectiveSelectedId)
    : undefined;

  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    onRead(id);
  };

  const handleBack = () => {
    setSelectedEmailId(null);
  };

  const unreadCount = emails.filter((e) => !e.read).length;
  const allCaughtUp = emails.length > 0 && unreadCount === 0;

  const advanceTitle = nextEmailDate
    ? `Skip to ${formatShortDate(nextEmailDate)}`
    : "Skip ahead";

  return (
    <div className="h-dvh flex flex-col bg-[#f7f7f8] text-[#0d0d0d]">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#e5e5e5] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-[#8e8ea0] hover:text-[#0d0d0d] lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#0d0d0d" />
              <circle cx="12" cy="12" r="3" fill="white" />
            </svg>
            <span className="text-sm font-medium text-[#0d0d0d]">Mail</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8e8ea0] tabular-nums">
            {formatDate(state.currentDate)}
          </span>
          <button
            onClick={onAdvance}
            title={advanceTitle}
            className={`
              w-7 h-7 flex items-center justify-center rounded-full transition-all
              ${allCaughtUp
                ? "bg-[#0d0d0d] text-white animate-pulse"
                : "bg-[#ececf1] text-[#6e6e80] hover:bg-[#d9d9e3] hover:text-[#0d0d0d]"}
            `}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className={`
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30
            w-60 bg-[#f7f7f8] border-r border-[#e5e5e5] transition-transform
            lg:block pt-12 lg:pt-0
          `}
        >
          <Sidebar
            metrics={state.metrics}
            emailCount={emails.length}
            unreadCount={unreadCount}
            onNewGame={() => { setShowSidebar(false); onNewGame(); }}
            onShowDisclaimer={() => { setShowSidebar(false); setShowDisclaimer(true); }}
          />
        </aside>

        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {selectedEmail ? (
            <EmailView
              email={selectedEmail}
              onBack={handleBack}
              onReply={onReply}
              onToggleStar={onToggleStar}
            />
          ) : (
            <Inbox
              emails={emails}
              onSelect={handleSelectEmail}
              onToggleStar={onToggleStar}
            />
          )}
        </main>
      </div>

      {showDisclaimer && (
        <Disclaimer onClose={() => setShowDisclaimer(false)} />
      )}
    </div>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
