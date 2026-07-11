"use client";

import { Loader2, Search, Send } from "lucide-react";

type ChatComposerProps = {
  disabled: boolean;
  question: string;
  onAskQuestion: () => void;
  onQuestionChange: (question: string) => void;
};

export function ChatComposer({
  disabled,
  question,
  onAskQuestion,
  onQuestionChange,
}: ChatComposerProps) {
  return (
    <div className="sticky bottom-0 border-t border-white/70 bg-white/45 px-6 py-4 backdrop-blur-2xl">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end gap-3 rounded-[1.5rem] border border-white/80 bg-white/75 p-3 shadow-2xl shadow-slate-300/60 backdrop-blur-xl focus-within:border-blue-300">
          <Search className="mt-3 shrink-0 text-slate-400" size={18} />
          <textarea
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onAskQuestion();
              }
            }}
            rows={1}
            placeholder="Ask about your uploaded PDFs..."
            className="max-h-36 min-h-11 flex-1 resize-none bg-transparent py-2 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400"
            disabled={disabled}
          />
          <button
            type="button"
            title="Send message"
            onClick={onAskQuestion}
            disabled={!question.trim() || disabled}
            className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200/70 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            {disabled ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
        <p className="mt-2 text-center text-xs font-semibold text-slate-400">
          Press Enter to send, Shift+Enter for a new line.
        </p>
      </div>
    </div>
  );
}
