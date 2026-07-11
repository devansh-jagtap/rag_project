import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SourceList } from "./SourceCard";
import type { Message } from "@/types/chat";

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-blue-600 shadow-sm backdrop-blur-xl">
          <Bot size={17} />
        </div>
      )}

      <div
        className={`max-w-[82%] rounded-[1.5rem] px-5 py-4 text-sm leading-7 shadow-sm ${
          isUser
            ? "bg-blue-600 text-white shadow-xl shadow-blue-200/70"
            : "border border-white/80 bg-white/75 text-slate-800 shadow-xl shadow-slate-200/50 backdrop-blur-xl"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <>
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
            <SourceList sources={message.sources ?? []} />
          </>
        )}
      </div>

      {isUser && (
        <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
          <User size={16} />
        </div>
      )}
    </div>
  );
}
