"use client";

import { FileText } from "lucide-react";
import type { Document } from "../_lib/workspace-types";
import { DocumentCard } from "./document-card";

type DocumentsSidebarProps = {
  documents: Document[];
  onDeleteDocument: (documentId: string) => void;
};

export function DocumentsSidebar({
  documents,
  onDeleteDocument,
}: DocumentsSidebarProps) {
  return (
    <aside className="hidden min-h-0 border-l border-zinc-800 bg-[#161616] xl:flex xl:flex-col">
      <div className="border-b border-zinc-800 p-5">
        <h2 className="text-sm font-semibold text-zinc-100">Uploaded PDFs</h2>
        <p className="mt-1 text-sm text-zinc-500">
          {documents.length} document{documents.length === 1 ? "" : "s"} in
          this chat
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {documents.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full border border-zinc-800 bg-zinc-900 p-4 text-zinc-400">
              <FileText size={24} />
            </div>
            <p className="text-sm font-medium text-zinc-300">
              No PDFs uploaded
            </p>
            <p className="mt-1 max-w-56 text-sm text-zinc-500">
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
