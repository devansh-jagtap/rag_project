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
      ? "flex min-w-72 items-center gap-3 rounded-2xl border border-white/80 bg-white/75 p-3 shadow-sm backdrop-blur-xl"
      : "group rounded-2xl border border-white/80 bg-white/65 p-4 shadow-sm backdrop-blur-xl transition hover:bg-white";

  return (
    <div key={doc.id} className={cardClass}>
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-blue-50 p-2 text-blue-600">
          <FileText size={layout === "mobile" ? 17 : 18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-slate-900">
            {doc.title}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {layout === "mobile" ? "Ready for chat" : "Available for this chat"}
          </p>
        </div>
        <button
          type="button"
          title="Delete PDF"
          onClick={() => onDeleteDocument(doc.id)}
          className="rounded-xl p-1.5 text-slate-400 transition hover:bg-red-500/10 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
