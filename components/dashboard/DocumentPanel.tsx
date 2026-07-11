"use client";

import { FileText } from "lucide-react";
import type { Document } from "@/types/workspace";
import { DocumentCard } from "./DocumentCard";

type DocumentsSidebarProps = {
  documents: Document[];
  onDeleteDocument: (documentId: string) => void;
};

export function DocumentPanel({
  documents,
  onDeleteDocument,
}: DocumentsSidebarProps) {
  return (
    <aside className="hidden min-h-0 border-l border-white/70 bg-white/50 backdrop-blur-2xl xl:flex xl:flex-col">
      <div className="border-b border-white/70 p-5">
        <h2 className="text-sm font-extrabold text-slate-950">Uploaded PDFs</h2>
        <p className="mt-1 text-sm text-slate-500">
          {documents.length} document{documents.length === 1 ? "" : "s"} in
          this chat
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {documents.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-2xl border border-white/80 bg-white/75 p-4 text-blue-600 shadow-sm">
              <FileText size={24} />
            </div>
            <p className="text-sm font-extrabold text-slate-800">
              No PDFs uploaded
            </p>
            <p className="mt-1 max-w-56 text-sm text-slate-500">
              Upload a document to unlock retrieval-backed answers.
            </p>
          </div>
        ) : (
          documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              layout="sidebar"
              onDeleteDocument={onDeleteDocument}
            />
          ))
        )}
      </div>
    </aside>
  );
}
