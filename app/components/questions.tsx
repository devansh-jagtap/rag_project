"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

type QuestionsProps = {
  chatId: string;
};

export default function Questions({ chatId }: QuestionsProps) {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Input */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <form
          className="flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();

            if (!input.trim()) return;

            sendMessage(
              {
                text: input,
              },
              {
                body: {
                  chatId,
                },
              }
            );

            setInput("");
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md px-4 py-2"
          />

          <button
            type="submit"
            disabled={status === "streaming"}
            className="bg-blue-600 hover:bg-blue-500 rounded-md px-6"
          >
            {status === "streaming" ? "Thinking..." : "Ask"}
          </button>
        </form>
      </div>

      {/* Chat */}
      <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              <div className="font-semibold mb-1">
                {message.role === "user" ? "You" : "AI"}
              </div>

              {message.parts.map((part, index) => {
                if (part.type === "text") {
                  return (
                    <p key={index} className="whitespace-pre-wrap">
                      {part.text}
                    </p>
                  );
                }

                return null;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useChat } from "@ai-sdk/react";
// type QuestionsProps = {
//   chatId: string;
// };

// export default function Questions({ chatId }: QuestionsProps) {
//   // const [question, setQuestion] = useState("");
//   // const [messages, setMessages] = useState<
//   //   {
//   //     role: "user" | "assistant";
//   //     content: string;
//   //   }[]
//   // >([]);
//   const { messages, input, handleInputChange, handleSubmit, status } = useChat({
//     api: "/api/chat",

//     body: {
//       chatId,
//     },
//   });
//   // async function askQuestion() {
//   //   if (!question.trim()) return;
//   //   setMessages((prev) => [
//   //     ...prev,
//   //     {
//   //       role: "user",
//   //       content: question,
//   //     },
//   //   ]);
//   //   const response = await fetch("/api/chat", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({
//   //       message: question,
//   //       chatId,
//   //     }),
//   //   });

//   //   const data = await response.json();

//   //   console.log(data);
//   //   setMessages((prev) => [
//   //     ...prev,
//   //     {
//   //       role: "assistant",
//   //       content: data.answer,
//   //     },
//   //   ]);
//   //   setQuestion("");
//   // }

//   return (
//     <div className="w-full flex flex-col gap-4">
//       {/* Input Bar Card */}
//       <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg w-full">
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={input}
//             onChange={handleInputChange}
//             placeholder="Ask something..."
//             className="block w-full text-sm bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-md py-2.5 px-4 focus:outline-none focus:border-blue-500 transition-colors placeholder-zinc-500"
//           />

//           <button
//             type="submit"
//             className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-6 rounded-md transition-colors shrink-0"
//           >
//             Ask
//           </button>
//         </form>
//       </div>

//       {/* Answer Section (Only shows if there is an answer) */}

//       <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/60 shadow-md w-full">
//         <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
//           Chat
//         </h2>

//         <div className="space-y-6">
//           {messages.map((message) => (
//             <div key={message.id}>
//               <b>{message.role}</b>

//               {message.parts.map((part, index) => {
//                 if (part.type === "text") {
//                   return <p key={index}>{part.text}</p>;
//                 }

//                 return null;
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
