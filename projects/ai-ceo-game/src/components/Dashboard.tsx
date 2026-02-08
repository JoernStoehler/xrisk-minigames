import { useState } from "react";
import type { Email, GameState } from "../engine/types";
import { Inbox } from "./Inbox";
import { EmailView } from "./EmailView";
import { Sidebar } from "./Sidebar";

interface DashboardProps {
  state: GameState;
  inboxEmails: Email[];
  spamEmails: Email[];
  onNextDay: () => void;
  onReply: (emailId: string, replyId: string) => void;
  onSpam: (emailId: string) => void;
  onRead: (emailId: string) => void;
}

export function Dashboard({
  state,
  inboxEmails,
  spamEmails,
  onNextDay,
  onReply,
  onSpam,
  onRead,
}: DashboardProps) {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [showSpam, setShowSpam] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const currentList = showSpam ? spamEmails : inboxEmails;
  const selectedEmail = currentList.find((e) => e.id === selectedEmailId);

  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    onRead(id);
  };

  const handleBack = () => {
    setSelectedEmailId(null);
  };

  const unreadCount = inboxEmails.filter((e) => !e.read).length;

  return (
    <div className="h-dvh flex flex-col bg-gray-950 text-gray-100">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-400 hover:text-white lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-sm font-semibold tracking-wide text-gray-300">
            OpenAI — CEO Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-mono">
            {formatDate(state.currentDate)}
          </span>
          <button
            onClick={onNextDay}
            className="px-3 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-500 rounded transition-colors"
          >
            Next Day
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar - hidden on mobile unless toggled */}
        <aside
          className={`
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30
            w-64 bg-gray-900 border-r border-gray-800 transition-transform
            lg:block pt-14 lg:pt-0
          `}
        >
          <Sidebar
            metrics={state.metrics}
            showSpam={showSpam}
            onToggleSpam={() => {
              setShowSpam(!showSpam);
              setSelectedEmailId(null);
            }}
            inboxCount={inboxEmails.length}
            unreadCount={unreadCount}
            spamCount={spamEmails.length}
          />
        </aside>

        {/* Overlay for mobile sidebar */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
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
              onSpam={onSpam}
              isSpam={showSpam}
            />
          ) : (
            <Inbox
              emails={currentList}
              onSelect={handleSelectEmail}
              isSpam={showSpam}
            />
          )}
        </main>
      </div>
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
