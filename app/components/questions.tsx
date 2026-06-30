"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  FileSearch,
  FileText,
  Loader2,
  Search,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchJson } from "@/lib/api-client";

type QuestionsProps = {
  chatId: string;
  documentsCount: number;
  onChatsRefresh?: (preferredChatId?: string) => Promise<unknown>;
};

type Source = {
  title: string;
  chunkIndex: number | null;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

type ChatResponse = {
  success: boolean;
  answer: string;
  sources?: Source[];
};

type ChatStatus =
  | "idle"
  | "Searching documents"
  | "Retrieving relevant chunks"
  | "Generating answer";

const chatLoadingSteps: Exclude<ChatStatus, "idle">[] = [
  "Searching documents",
  "Retrieving relevant chunks",
  "Generating answer",
];

function dedupeSources(sources: Source[] = []) {
  return Array.from(
    sources
      .reduce((sourceMap, source) => {
        if (!source.title || sourceMap.has(source.title)) return sourceMap;
        sourceMap.set(source.title, source);
        return sourceMap;
      }, new Map<string, Source>())
      .values(),
  );
}

export default function Questions({
  chatId,
  documentsCount,
  onChatsRefresh,
}: QuestionsProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatStatus, setChatStatus] = useState<ChatStatus>("idle");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const hasDocuments = documentsCount > 0;

  const refreshMessages = useCallback(
    async (targetChatId: string, sources?: Source[]) => {
      if (!targetChatId) {
        setMessages([]);
        return [];
      }

      try {
        const data = await fetchJson<Message[]>(
          `/api/chat/${targetChatId}/messages`,
        );

        const cleanSources = dedupeSources(sources);

        if (cleanSources.length === 0) {
          setMessages(data);
          return data;
        }

        const updated = [...data];
        const lastAssistantIndex = updated.findLastIndex(
          (message) => message.role === "assistant",
        );

        if (lastAssistantIndex >= 0) {
          updated[lastAssistantIndex] = {
            ...updated[lastAssistantIndex],
            sources: cleanSources,
          };
        }

        setMessages(updated);
        return updated;
      } catch (error) {
        console.error("Failed to refresh messages:", error);
        return [];
      }
    },
    [],
  );

  const visibleMessages = useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        sources: dedupeSources(message.sources),
      })),
    [messages],
  );

  useEffect(() => {
    void Promise.resolve().then(() => refreshMessages(chatId));
  }, [chatId, refreshMessages]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [visibleMessages, chatStatus]);

  async function askQuestion() {
    if (!question.trim() || !chatId || loading || !hasDocuments) return;

    const userQuestion = question;
    let currentStep = 0;

    setQuestion("");
    setLoading(true);
    setChatStatus(chatLoadingSteps[currentStep]);
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `pending-${Date.now()}`,
        role: "user",
        content: userQuestion,
      },
    ]);

    const statusTimer = window.setInterval(() => {
      currentStep = Math.min(currentStep + 1, chatLoadingSteps.length - 1);
      setChatStatus(chatLoadingSteps[currentStep]);
    }, 1800);

    try {
      const data = await fetchJson<ChatResponse>("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userQuestion,
          chatId,
        }),
      });

      await Promise.all([
        refreshMessages(chatId, data.sources),
        onChatsRefresh?.(chatId),
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      window.clearInterval(statusTimer);
      setLoading(false);
      setChatStatus("idle");
    }
  }

  if (!hasDocuments) {
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

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#111111]">
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {visibleMessages.length === 0 ? (
            <div className="flex min-h-[48vh] flex-col items-center justify-center text-center">
              <div className="mb-5 rounded-full border border-zinc-800 bg-zinc-900 p-5 text-blue-300">
                <Sparkles size={32} />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
                Ask a question about your PDFs
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-zinc-400">
                I will search across the uploaded documents, retrieve relevant
                chunks, and answer with clean citations.
              </p>
            </div>
          ) : (
            visibleMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-blue-300">
                    <Bot size={17} />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-5 py-4 text-sm leading-7 shadow-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "border border-zinc-800 bg-zinc-900 text-zinc-100"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <div className="markdown-body">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}

                  {message.role === "assistant" &&
                    message.sources &&
                    message.sources.length > 0 && (
                      <div className="mt-4 border-t border-zinc-800 pt-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          Sources
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {message.sources.map((source) => (
                            <div
                              key={source.title}
                              className="flex min-w-0 items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/80 p-3"
                            >
                              <div className="rounded-md bg-blue-500/10 p-2 text-blue-300">
                                <FileText size={16} />
                              </div>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-zinc-200">
                                  {source.title}
                                </p>
                                {source.chunkIndex !== null && (
                                  <p className="text-xs text-zinc-500">
                                    Retrieved source
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {message.role === "user" && (
                  <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))
          )}

          {loading && (
            <div className="flex gap-4">
              <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-blue-300">
                <Bot size={17} />
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <Loader2 size={17} className="animate-spin text-blue-300" />
                  <span>{chatStatus}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  {chatLoadingSteps.map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 w-16 rounded-full ${
                        chatLoadingSteps.indexOf(step) <=
                        chatLoadingSteps.indexOf(
                          chatStatus as Exclude<ChatStatus, "idle">,
                        )
                          ? "bg-blue-500"
                          : "bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={endOfMessagesRef} />
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-zinc-800 bg-[#111111]/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-end gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 p-3 shadow-2xl shadow-black/20 focus-within:border-blue-500/70">
            <Search className="mt-3 shrink-0 text-zinc-500" size={18} />
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void askQuestion();
                }
              }}
              rows={1}
              placeholder="Ask about your uploaded PDFs..."
              className="max-h-36 min-h-11 flex-1 resize-none bg-transparent py-2 text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-500"
              disabled={loading}
            />
            <button
              type="button"
              title="Send message"
              onClick={() => void askQuestion()}
              disabled={!question.trim() || loading}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
            >
              {loading ? (
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
    </div>
  );
}
