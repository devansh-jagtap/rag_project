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
    <div className="sticky bottom-0 border-t border-zinc-800 bg-[#111111]/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 p-3 shadow-2xl shadow-black/20 focus-within:border-blue-500/70">
          <Search className="mt-3 shrink-0 text-zinc-500" size={18} />
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
            className="max-h-36 min-h-11 flex-1 resize-none bg-transparent py-2 text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-500"
            disabled={disabled}
          />
          <button
            type="button"
            title="Send message"
            onClick={onAskQuestion}
            disabled={!question.trim() || disabled}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            {disabled ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-zinc-600">
          Press Enter to send, Shift+Enter for a new line.
        </p>
      </div>
    </div>
  );
}
