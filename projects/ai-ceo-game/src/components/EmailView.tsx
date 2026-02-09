import type { Email } from "../engine/types";
import { Attachment } from "./Attachment";

interface EmailViewProps {
  email: Email;
  onBack: () => void;
  onReply: (emailId: string, replyId: string) => void;
  onSpam: (emailId: string) => void;
  isSpam: boolean;
}

export function EmailView({ email, onBack, onReply, onSpam, isSpam }: EmailViewProps) {
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
        {!isSpam && (
          <button
            onClick={() => onSpam(email.id)}
            className="px-3 py-1 text-[11px] text-[#8e8ea0] hover:text-[#c5221f] rounded-lg hover:bg-[#fce8e6] transition-colors"
            title="Move to spam"
          >
            Spam
          </button>
        )}
      </div>

      {/* Email content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-5 py-5 lg:px-8 lg:py-8">
          {/* Subject */}
          <h2 className="text-xl font-normal text-[#0d0d0d] mb-6 leading-snug">
            {email.subject}
          </h2>

          {/* Sender */}
          <div className="flex items-start gap-3 mb-6 pb-6 border-b border-[#ececf1]">
            <div className="w-9 h-9 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center text-xs font-medium shrink-0">
              {email.from.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm font-medium text-[#0d0d0d]">{email.from.name}</span>
                <span className="text-xs text-[#8e8ea0]">&lt;{email.from.email}&gt;</span>
              </div>
              <div className="text-[11px] text-[#8e8ea0] mt-0.5">{email.from.role}</div>
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
