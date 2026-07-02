import { Sparkles } from "lucide-react";

export function ConversationEmptyState() {
  return (
    <div className="flex min-h-[48vh] flex-col items-center justify-center text-center">
      <div className="mb-5 rounded-full border border-zinc-800 bg-zinc-900 p-5 text-blue-300">
        <Sparkles size={32} />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
        Ask a question about your PDFs
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-zinc-400">
        I will search across the uploaded documents, retrieve relevant chunks,
        and answer with clean citations.
      </p>
    </div>
  );
}
