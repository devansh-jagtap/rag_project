"use client";

import { useState } from "react";
type QuestionsProps = {
  chatId: string;
};

export default function Questions({chatId} : QuestionsProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function askQuestion() {
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

    setAnswer(data.answer);
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
      {answer && (
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/60 shadow-md w-full">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Answer
          </h2>
          <p className="text-zinc-200 leading-relaxed text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
}
