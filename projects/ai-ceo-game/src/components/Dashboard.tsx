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
    <div className="h-dvh flex flex-col bg-[#f7f7f8] text-[#0d0d0d]">
      {/* Top bar — minimal, OpenAI-style */}
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
            <span className="text-sm font-medium text-[#0d0d0d]">OpenAI Mail</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#8e8ea0]">
            {formatDate(state.currentDate)}
          </span>
          <button
            onClick={onNextDay}
            className="px-4 py-1.5 text-xs font-medium bg-[#0d0d0d] hover:bg-[#2d2d2d] text-white rounded-full transition-colors"
          >
            Next Day
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
