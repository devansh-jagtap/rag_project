"use client";

import { FileText, Trash2 } from "lucide-react";
import type { Document } from "@/types/workspace";

type DocumentCardProps = {
  doc: Document;
  layout: "mobile" | "sidebar";
  onDeleteDocument: (documentId: string) => void;
};

export function DocumentCard({
  doc,
  layout,
  onDeleteDocument,
}: DocumentCardProps) {
  const cardClass =
    layout === "mobile"
      ? "flex min-w-72 items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3"
      : "group rounded-lg border border-zinc-800 bg-zinc-900/80 p-4 transition hover:border-zinc-700 hover:bg-zinc-900";

  return (
    <div key={doc.id} className={cardClass}>
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-blue-500/10 p-2 text-blue-300">
          <FileText size={layout === "mobile" ? 17 : 18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-100">
            {doc.title}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {layout === "mobile" ? "Ready for chat" : "Available for this chat"}
          </p>
        </div>
        <button
          type="button"
          title="Delete PDF"
          onClick={() => onDeleteDocument(doc.id)}
          className="rounded-md p-1.5 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
