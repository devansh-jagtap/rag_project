import { FileText } from "lucide-react";
import type { Source } from "@/types/chat";

type SourceListProps = {
  sources: Source[];
};

export function SourceList({ sources }: SourceListProps) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-4 border-t border-slate-200/80 pt-4">
      <p className="mb-2 text-xs font-extrabold uppercase text-slate-400">
        Sources
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {sources.map((source) => (
          <div
            key={source.title}
            className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3 shadow-sm"
          >
            <div className="rounded-2xl bg-blue-50 p-2 text-blue-600">
              <FileText size={16} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800">
                {source.title}
              </p>
              {source.chunkIndex !== null && (
                <p className="text-xs text-slate-500">Retrieved source</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
