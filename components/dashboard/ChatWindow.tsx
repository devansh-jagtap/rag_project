"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isAuthRedirectError } from "@/lib/api-client";
import { fetchJson } from "@/lib/api-client";
import { ChatComposer } from "./ChatInput";
import { ChatLoadingIndicator } from "./TypingIndicator";
import { ChatMessage } from "./ChatMessage";
import { ConversationEmptyState } from "./ConversationEmptyState";
import { NoDocumentsState } from "./EmptyState";
import { chatLoadingSteps } from "./chat-steps";
import { dedupeSources } from "./chat-utils";
import type {
  ChatResponse,
  ChatStatus,
  Message,
  QuestionsProps,
  Source,
} from "@/types/chat";

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
        if (isAuthRedirectError(error)) {
          setMessages([]);
          return [];
        }

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
    return <NoDocumentsState />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#111111]">
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {visibleMessages.length === 0 ? (
            <ConversationEmptyState />
          ) : (
            visibleMessages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}

          {loading && <ChatLoadingIndicator chatStatus={chatStatus} />}

          <div ref={endOfMessagesRef} />
        </div>
      </div>

      <ChatComposer
        disabled={loading}
        question={question}
        onAskQuestion={() => void askQuestion()}
        onQuestionChange={setQuestion}
      />
    </div>
  );
}
