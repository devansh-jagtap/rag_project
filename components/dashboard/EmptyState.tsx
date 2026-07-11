import { FileSearch } from "lucide-react";

export function NoDocumentsState() {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-8">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="mb-5 rounded-[1.5rem] border border-white/80 bg-white/70 p-5 text-blue-600 shadow-xl shadow-slate-200/70 backdrop-blur-xl">
          <FileSearch size={34} />
        </div>
        <h2 className="text-2xl font-extrabold tracking-normal text-slate-950">
          Upload your first PDF
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Upload one or more PDFs to begin chatting with your documents.
        </p>
      </div>
    </div>
  );
}
