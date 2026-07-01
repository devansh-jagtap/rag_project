import { FileSearch } from "lucide-react";

export function NoDocumentsState() {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-8">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="mb-5 rounded-full border border-zinc-800 bg-zinc-900 p-5 text-blue-300 shadow-xl shadow-black/20">
          <FileSearch size={34} />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Upload a PDF to start chatting
        </h2>
        <p className="mt-3 text-base leading-7 text-zinc-400">
          Add a document from the upload control above. Once processing
          completes, the chat input and conversation history will appear here.
        </p>
      </div>
    </div>
  );
}
