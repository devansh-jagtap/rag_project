import { Sparkles } from "lucide-react";

export function ConversationEmptyState() {
  return (
    <div className="flex min-h-[48vh] flex-col items-center justify-center text-center">
      <div className="mb-5 rounded-[1.5rem] border border-white/80 bg-white/70 p-5 text-blue-600 shadow-xl shadow-slate-200/70 backdrop-blur-xl">
        <Sparkles size={32} />
      </div>
      <h2 className="text-2xl font-extrabold tracking-normal text-slate-950">
        Ask a question about your PDFs
      </h2>
      <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
        I will search across the uploaded documents, retrieve relevant chunks,
        and answer with clean citations.
      </p>
    </div>
  );
}
