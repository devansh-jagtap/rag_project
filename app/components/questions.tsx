"use client";

import { useState } from "react";
type QuestionsProps = {
  chatId: string;
};

export default function Questions({ chatId }: QuestionsProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);

  async function askQuestion() {
    if (!question.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
        chatId,
      }),
    });

    const data = await response.json();

    console.log(data);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.answer,
      },
    ]);
    setQuestion("");
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Input Bar Card */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg w-full">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          className="block w-full text-sm bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-md py-2.5 px-4 focus:outline-none focus:border-blue-500 transition-colors placeholder-zinc-500"
        />

        <button
          onClick={askQuestion}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-6 rounded-md transition-colors shrink-0"
        >
          Ask
        </button>
      </div>

      {/* Answer Section (Only shows if there is an answer) */}

      <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/60 shadow-md w-full">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          Chat
        </h2>

        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.role === "user" ? "text-right" : "text-left"}
            >
              <p className="text-xs text-zinc-500 mb-1">
                {message.role === "user" ? "You" : "AI"}
              </p>

              <div
                className={`inline-block rounded-xl px-4 py-3 max-w-[80%] ${
                  message.role === "user" ? "bg-blue-600" : "bg-zinc-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
