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
    <div className="h-full flex flex-col">
      {/* Email header */}
      <div className="px-4 py-3 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Back to inbox"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-base font-semibold text-white truncate flex-1">
            {email.subject}
          </h2>
          {!isSpam && (
            <button
              onClick={() => onSpam(email.id)}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors shrink-0"
              title="Move to spam"
            >
              Spam
            </button>
          )}
        </div>
        <div className="flex items-baseline gap-2 text-sm ml-8">
          <span className="text-gray-300 font-medium">{email.from.name}</span>
          <span className="text-gray-600 text-xs">&lt;{email.from.email}&gt;</span>
        </div>
        <div className="text-xs text-gray-600 ml-8 mt-0.5">{email.from.role}</div>
      </div>

      {/* Email body */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl">
          <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
            {email.body}
          </div>

          {/* Attachments */}
          {email.attachments && email.attachments.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attachments
              </div>
              {email.attachments.map((att, i) => (
                <Attachment key={i} attachment={att} />
              ))}
            </div>
          )}

          {/* Reply options */}
          {email.replyOptions && !email.chosenReply && (
            <div className="mt-6 space-y-2">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reply
              </div>
              {email.replyOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onReply(email.id, option.id)}
                  className="w-full text-left px-4 py-3 rounded-lg border border-gray-700 hover:border-blue-500 hover:bg-blue-950/30 transition-all text-sm text-gray-300"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}

          {/* Chosen reply */}
          {email.chosenReply && (
            <div className="mt-6">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Your Reply
              </div>
              <div className="px-4 py-3 rounded-lg bg-blue-950/20 border border-blue-900/30 text-sm text-blue-300">
                {email.replyOptions?.find((r) => r.id === email.chosenReply)?.text}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
