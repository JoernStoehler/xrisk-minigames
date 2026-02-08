import type { EmailAttachment } from "../engine/types";

interface AttachmentProps {
  attachment: EmailAttachment;
}

export function Attachment({ attachment }: AttachmentProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
      <div className="text-xs font-medium text-gray-400 mb-3">
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
          <span className="text-xs text-gray-500 w-20 text-right shrink-0 font-mono">
            {label}
          </span>
          <div className="flex-1 bg-gray-800 rounded-full h-4 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 w-12 font-mono">{value.toFixed(1)}</span>
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
    <div className="flex items-end gap-2 h-24">
      {entries.map(([label, value]) => (
        <div key={label} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] text-gray-500 font-mono">
            {prefix}{value.toFixed(1)}{suffix}
          </span>
          <div className="w-full bg-gray-800 rounded-t relative" style={{ height: "100%" }}>
            <div
              className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-500"
              style={{ height: `${(value / max) * 100}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-500">{label}</span>
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
          <tr key={key} className="border-t border-gray-800">
            <td className="py-1.5 text-gray-400">{key}</td>
            <td className="py-1.5 text-gray-300 text-right font-mono">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
