import type { Email } from "../engine/types";
import { Attachment } from "./Attachment";

interface EmailViewProps {
  email: Email;
  onBack: () => void;
  onReply: (emailId: string, replyId: string) => void;
  onToggleStar: (emailId: string) => void;
}

export function EmailView({ email, onBack, onReply, onToggleStar }: EmailViewProps) {
  const emailDate = new Date(email.date + "T12:00:00");
  const dateStr = emailDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="px-4 py-2 border-b border-[#ececf1] shrink-0 flex items-center gap-2">
        <button
          onClick={onBack}
          className="p-1.5 text-[#8e8ea0] hover:text-[#0d0d0d] rounded-lg hover:bg-[#f0f0f3] transition-colors"
          aria-label="Back to inbox"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1" />
        <button
          onClick={() => onToggleStar(email.id)}
          className={`p-1.5 rounded-lg transition-colors ${
            email.starred
              ? "text-[#f59e0b]"
              : "text-[#d9d9e3] hover:text-[#f59e0b]"
          }`}
          aria-label={email.starred ? "Unstar" : "Star"}
        >
          <svg className="w-4 h-4" fill={email.starred ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        </button>
      </div>

      {/* Email content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-5 py-5 lg:px-8 lg:py-8">
          {/* Subject */}
          <h2 className="text-xl font-normal text-[#0d0d0d] mb-6 leading-snug">
            {email.subject}
          </h2>

          {/* Sender header */}
          <div className="flex items-start gap-3 mb-6 pb-6 border-b border-[#ececf1]">
            <div className="w-9 h-9 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center text-xs font-medium shrink-0">
              {email.from.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm font-medium text-[#0d0d0d]">{email.from.name}</span>
                <span className="text-xs text-[#8e8ea0]">&lt;{email.from.email}&gt;</span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-[11px] text-[#8e8ea0]">{email.from.role}</span>
                <span className="text-[11px] text-[#c5c5d2]">·</span>
                <span className="text-[11px] text-[#8e8ea0]">{dateStr}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="text-[14px] text-[#353740] whitespace-pre-wrap leading-[1.7]">
            {email.body}
          </div>

          {/* Attachments */}
          {email.attachments && email.attachments.length > 0 && (
            <div className="mt-8 space-y-3">
              {email.attachments.map((att, i) => (
                <Attachment key={i} attachment={att} />
              ))}
            </div>
          )}

          {/* Reply options */}
          {email.replyOptions && !email.chosenReply && (
            <div className="mt-8 pt-6 border-t border-[#ececf1] space-y-2">
              <div className="text-[11px] font-medium text-[#8e8ea0] uppercase tracking-wider mb-3">
                Reply
              </div>
              {email.replyOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onReply(email.id, option.id)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-[#d9d9e3] hover:border-[#0d0d0d] hover:bg-[#fafafa] transition-all text-[13px] text-[#353740]"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}

          {/* Chosen reply */}
          {email.chosenReply && (
            <div className="mt-8 pt-6 border-t border-[#ececf1]">
              <div className="px-4 py-3 rounded-xl bg-oai-green-light border border-oai-green/20 text-[13px] text-[#065f46]">
                <div className="text-[10px] uppercase tracking-wider text-oai-green/60 font-medium mb-1">You replied</div>
                {email.replyOptions?.find((r) => r.id === email.chosenReply)?.text}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
