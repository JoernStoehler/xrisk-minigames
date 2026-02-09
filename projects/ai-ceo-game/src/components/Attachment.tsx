import type { EmailAttachment } from "../engine/types";

interface AttachmentProps {
  attachment: EmailAttachment;
}

export function Attachment({ attachment }: AttachmentProps) {
  return (
    <div className="rounded-xl border border-[#d9d9e3] bg-[#f7f7f8] p-4">
      <div className="text-[11px] font-medium text-[#6e6e80] mb-3 flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
        {attachment.label}
      </div>
      {attachment.type === "benchmark" && (
        <BenchmarkChart data={attachment.data} />
      )}
      {attachment.type === "chart" && (
        <BarChart data={attachment.data} prefix="$" suffix="B" />
      )}
      {attachment.type === "report" && (
        <ReportTable data={attachment.data} />
      )}
    </div>
  );
}

function BenchmarkChart({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data);
  const max = Math.max(...entries.map(([, v]) => v));

  return (
    <div className="space-y-2">
      {entries.map(([label, value]) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-[11px] text-[#6e6e80] w-20 text-right shrink-0 font-mono">
            {label}
          </span>
          <div className="flex-1 bg-[#e5e5e5] rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#0d0d0d] transition-all duration-500"
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
          <span className="text-[11px] text-[#353740] w-10 font-mono tabular-nums">{value.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}

function BarChart({
  data,
  prefix = "",
  suffix = "",
}: {
  data: Record<string, number>;
  prefix?: string;
  suffix?: string;
}) {
  const entries = Object.entries(data);
  const max = Math.max(...entries.map(([, v]) => v));

  return (
    <div className="flex items-end gap-3 h-24">
      {entries.map(([label, value]) => (
        <div key={label} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] text-[#6e6e80] font-mono tabular-nums">
            {prefix}{value.toFixed(1)}{suffix}
          </span>
          <div className="w-full bg-[#e5e5e5] rounded-t relative" style={{ height: "100%" }}>
            <div
              className="absolute bottom-0 w-full bg-[#0d0d0d] rounded-t transition-all duration-500"
              style={{ height: `${(value / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-[#6e6e80] font-medium">{label}</span>
        </div>
      ))}
    </div>
  );
}

function ReportTable({ data }: { data: Record<string, number> }) {
  return (
    <table className="w-full text-xs">
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key} className="border-t border-[#e5e5e5]">
            <td className="py-1.5 text-[#6e6e80]">{key}</td>
            <td className="py-1.5 text-[#353740] text-right font-mono tabular-nums">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
