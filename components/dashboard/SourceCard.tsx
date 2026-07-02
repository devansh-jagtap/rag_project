import { FileText } from "lucide-react";
import type { Source } from "@/types/chat";

type SourceListProps = {
  sources: Source[];
};

export function SourceList({ sources }: SourceListProps) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-4 border-t border-zinc-800 pt-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Sources
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {sources.map((source) => (
          <div
            key={source.title}
            className="flex min-w-0 items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/80 p-3"
          >
            <div className="rounded-md bg-blue-500/10 p-2 text-blue-300">
              <FileText size={16} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-200">
                {source.title}
              </p>
              {source.chunkIndex !== null && (
                <p className="text-xs text-zinc-500">Retrieved source</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
