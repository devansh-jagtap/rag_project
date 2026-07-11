"use client";

import type { Document } from "@/types/workspace";
import { DocumentCard } from "./DocumentCard";

type MobileDocumentsProps = {
  documents: Document[];
  onDeleteDocument: (documentId: string) => void;
};

export function MobileDocuments({
  documents,
  onDeleteDocument,
}: MobileDocumentsProps) {
  return (
    <div className="border-b border-white/70 bg-white/45 p-4 backdrop-blur-2xl xl:hidden">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-extrabold text-slate-950">Uploaded PDFs</h2>
          <p className="mt-1 text-xs text-slate-500">
            {documents.length} document{documents.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {documents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/55 p-4 text-sm text-slate-500">
          Upload a PDF to enable chat.
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              layout="mobile"
              onDeleteDocument={onDeleteDocument}
            />
          ))}
        </div>
      )}
    </div>
  );
}
