"use client";

import { useEffect, useState } from "react";

type QuestionsProps = {
  chatId: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Questions({ chatId }: QuestionsProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Load messages from the database
  async function loadMessages() {
    if (!chatId) return;

    try {
      const res = await fetch(`/api/chat/${chatId}/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  }

  // 2. Trigger message reload when chatId changes
  useEffect(() => {
    loadMessages();
  }, [chatId]);

  // 3. Handle sending a question
  async function askQuestion() {
    if (!question.trim() || !chatId || loading) return;

    const userQuestion = question;

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userQuestion,
          chatId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return;
      }

      // Reload entire conversation from database to maintain synchronized state
      await loadMessages();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Input Bar Section */}
      <div className="flex gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg w-full">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
          placeholder="Ask something..."
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 text-zinc-200 outline-none focus:border-blue-500 transition-colors placeholder-zinc-500"
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium px-6 rounded-md transition-colors shrink-0 dashboard-btn"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {/* Chat History Display Section */}
      <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 shadow-md w-full">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
          Chat
        </h2>

        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  message.role === "user" ? "bg-blue-600" : "bg-zinc-800"
                }`}
              >
                <p className="text-xs opacity-70 mb-2">
                  {message.role === "user" ? "You" : "AI"}
                </p>

                <p className="whitespace-pre-wrap text-zinc-100">{message.content}</p>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <p className="text-zinc-500 text-center py-4">
              Start a conversation...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// type QuestionsProps = {
//   chatId: string;
// };

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// export default function Questions({ chatId }: QuestionsProps) {
//   const [question, setQuestion] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);

//   async function loadMessages() {
//     if (!chatId) return;

//     const res = await fetch(`/api/chat/${chatId}/messages`);
//     const data = await res.json();

//     setMessages(data);
//   }

//   useEffect(() => {
//     loadMessages();
//   }, [chatId]);
//   async function askQuestion() {
//     if (!question.trim() || !chatId) return;

//     const userQuestion = question;

//     setQuestion("");
//     setLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           message: userQuestion,
//           chatId,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         console.error(data);
//         return;
//       }

//       // Reload messages from database
//       await loadMessages();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }
//   // async function askQuestion() {
//   //   if (!question.trim() || loading) return;

//   //   const userQuestion = question;

//   //   setQuestion("");
//   //   setLoading(true);

//   //   try {
//   //     const response = await fetch("/api/chat", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         message: userQuestion,
//   //         chatId,
//   //       }),
//   //     });

//   //     const data = await response.json();

//   //     if (!response.ok) {
//   //       console.error(data);
//   //       return;
//   //     }

//   //     // Reload the entire conversation from DB
//   //     await loadMessages();
//   //   } catch (err) {
//   //     console.error(err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }

//   return (
//     <div className="w-full flex flex-col gap-4">
//       {/* Chat */}
//       <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
//         <h2 className="text-sm font-semibold text-zinc-400 uppercase mb-4">
//           Chat
//         </h2>

//         <div className="space-y-6">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={
//                 message.role === "user"
//                   ? "flex justify-end"
//                   : "flex justify-start"
//               }
//             >
//               <div
//                 className={`max-w-[80%] rounded-xl px-4 py-3 ${
//                   message.role === "user" ? "bg-blue-600" : "bg-zinc-800"
//                 }`}
//               >
//                 <p className="text-xs opacity-70 mb-2">
//                   {message.role === "user" ? "You" : "AI"}
//                 </p>

//                 <p className="whitespace-pre-wrap">{message.content}</p>
//               </div>
//             </div>
//           ))}

//           {messages.length === 0 && (
//             <p className="text-zinc-500 text-center">Start a conversation...</p>
//           )}
//         </div>
//         {/* Input */}
//         <div className="flex gap-4 m-2 bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg">
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 askQuestion();
//               }
//             }}
//             placeholder="Ask something..."
//             className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md px-4 py-3 outline-none focus:border-blue-500"
//           />

//           <button
//             onClick={askQuestion}
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-6 rounded-md"
//           >
//             {loading ? "Thinking..." : "Ask"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
