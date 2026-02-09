import type { Email } from "../engine/types";

interface InboxProps {
  emails: Email[];
  onSelect: (id: string) => void;
}

export function Inbox({ emails, onSelect }: InboxProps) {
  if (emails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[#8e8ea0] text-sm gap-3 p-8">
        <svg className="w-16 h-16 text-[#d9d9e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        No new messages
      </div>
    );
  }

  return (
    <div className="bg-white h-full">
      {emails.map((email, i) => (
        <button
          key={email.id}
          onClick={() => onSelect(email.id)}
          className={`
            w-full text-left px-5 py-3 transition-colors cursor-pointer
            ${i > 0 ? "border-t border-[#ececf1]" : ""}
            ${!email.read ? "bg-white" : "bg-[#fafafb]"}
            hover:bg-[#f0f0f3]
          `}
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className={`
              w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-medium mt-0.5
              ${!email.read ? "bg-[#0d0d0d] text-white" : "bg-[#e5e5e5] text-[#6e6e80]"}
            `}>
              {email.from.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className={`text-[13px] truncate ${!email.read ? "font-semibold text-[#0d0d0d]" : "text-[#6e6e80]"}`}>
                  {email.from.name}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {email.starred && (
                    <svg className="w-3 h-3 text-[#f59e0b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  )}
                  <span className="text-[11px] text-[#8e8ea0]">
                    {formatShortDate(email.date)}
                  </span>
                </div>
              </div>
              <div className={`text-[13px] truncate ${!email.read ? "font-medium text-[#353740]" : "text-[#8e8ea0]"}`}>
                {email.subject}
              </div>
              <div className="text-xs text-[#8e8ea0] truncate mt-0.5 leading-relaxed">
                {getPreview(email.body)}
              </div>
              {/* Badges */}
              <div className="flex gap-1.5 mt-1.5">
                {email.replyOptions && !email.chosenReply && (
                  <span className="text-[10px] px-2 py-0.5 bg-[#fff3cd] text-[#856404] rounded-full font-medium">
                    Action needed
                  </span>
                )}
                {email.chosenReply && (
                  <span className="text-[10px] px-2 py-0.5 bg-oai-green-light text-[#065f46] rounded-full font-medium">
                    Replied
                  </span>
                )}
                {email.attachments && email.attachments.length > 0 && (
                  <span className="text-[10px] px-2 py-0.5 bg-[#f0f0f3] text-[#6e6e80] rounded-full flex items-center gap-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    {email.attachments.length}
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
  const lines = body.split("\n").filter((l) => l.trim().length > 0);
  const start = lines.findIndex(
    (l) => !l.trim().endsWith(",") && l.trim().length > 20,
  );
  if (start >= 0) return lines[start].trim().slice(0, 100);
  return lines[0]?.trim().slice(0, 100) ?? "";
}
