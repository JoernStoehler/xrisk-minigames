import type { Email } from "../engine/types";

interface InboxProps {
  emails: Email[];
  onSelect: (id: string) => void;
  isSpam: boolean;
}

export function Inbox({ emails, onSelect, isSpam }: InboxProps) {
  if (emails.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
        {isSpam ? "Spam folder is empty." : "No emails yet. Advance to the next day."}
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-800">
      {emails.map((email) => (
        <button
          key={email.id}
          onClick={() => onSelect(email.id)}
          className={`
            w-full text-left px-4 py-3 hover:bg-gray-900/50 transition-colors
            ${!email.read ? "bg-gray-900/30" : ""}
          `}
        >
          <div className="flex items-start gap-3">
            {/* Unread indicator */}
            <div className="pt-1.5 shrink-0">
              {!email.read && (
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              )}
              {email.read && <div className="w-2 h-2" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className={`text-sm truncate ${!email.read ? "font-semibold text-white" : "text-gray-300"}`}
                >
                  {email.from.name}
                </span>
                <span className="text-xs text-gray-600 shrink-0 font-mono">
                  {formatShortDate(email.date)}
                </span>
              </div>
              <div
                className={`text-sm truncate ${!email.read ? "font-medium text-gray-200" : "text-gray-400"}`}
              >
                {email.subject}
              </div>
              <div className="text-xs text-gray-600 truncate mt-0.5">
                {getPreview(email.body)}
              </div>
              {/* Indicators */}
              <div className="flex gap-1.5 mt-1">
                {email.replyOptions && !email.chosenReply && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-amber-900/50 text-amber-400 rounded">
                    Action needed
                  </span>
                )}
                {email.chosenReply && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-900/50 text-green-400 rounded">
                    Replied
                  </span>
                )}
                {email.attachments && email.attachments.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 text-gray-400 rounded">
                    {email.attachments.length} attachment{email.attachments.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getPreview(body: string): string {
  // Get first meaningful line
  const lines = body.split("\n").filter((l) => l.trim().length > 0);
  // Skip greeting
  const start = lines.findIndex(
    (l) => !l.trim().endsWith(",") && l.trim().length > 20,
  );
  if (start >= 0) return lines[start].trim().slice(0, 100);
  return lines[0]?.trim().slice(0, 100) ?? "";
}
