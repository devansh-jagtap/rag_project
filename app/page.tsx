"use client";

import { useEffect, useState } from "react";
import Questions from "./components/questions";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  // const [documentId, setDocumentId] = useState("");
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState<{ id: string; title: string }[]>([]);
  const [documents, setDocuments] = useState<{ id: string; title: string }[]>(
    [],
  );

  useEffect(() => {
    if (!chatId) return;

    async function loadDocuments() {
      const response = await fetch(`/api/chat/${chatId}/documents`);
      const data = await response.json();

      setDocuments(data);
    }

    loadDocuments();
  }, [chatId]);

  async function createChat() {
    const response = await fetch("/api/chat/create", {
      method: "POST",
    });

    const chat = await response.json();

    setChats((prev) => [...prev, chat]);

    setChatId(chat.id);
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  async function loadChats() {
    const response = await fetch("/api/chat");
    const data = await response.json();

    setChats(data);

    if (!chatId && data.length > 0) {
      setChatId(data[0].id);
    }
  }

  useEffect(() => {
    loadChats();
  }, []);
  const handleClick = async () => {
    if (!chatId) {
      alert("Create a chat first");
      return;
    }
    if (!file) return;
    const formData = new FormData();

    formData.append("pdf", file);
    let currentChatId = chatId;

    // if (!currentChatId) {
    //   const response = await fetch("/api/chat/create", {
    //     method: "POST",
    //   });

    //   const chat = await response.json();

    //   currentChatId = chat.id;

    //   setChatId(chat.id);
    // }
    formData.append("chatId", currentChatId);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    console.log("Status:", response.status);

    // const text = await response.text();

    // console.log(text);
    const data = await response.json();
    setDocuments((prev) => [
      ...prev,
      {
        id: data.documentId,
        title: file.name,
      },
    ]);

    console.log(data);

    // setDocumentId(data.documentId);
    // console.log(response);
    // console.log(data.documentId);

    //      if (!file) return;

    //   const arrayBuffer = await file.arrayBuffer();

    //   console.log(arrayBuffer);
    //   console.log(arrayBuffer.byteLength);
    //   const uint8 = new Uint8Array(arrayBuffer);
    // console.log(uint8.slice(0, 20));
    //   console.log("selected file name is : " , file?.name)
    //   console.log(file);

    // console.log("Name:", file?.name);
    // console.log("Size:", file?.size);
    // console.log("Type:", file?.type);

    // Reload the chats list to instantly capture updated titles
    await loadChats();
  };
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-zinc-800 p-5 flex flex-col">
        <button
          onClick={createChat}
          className="w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-3 font-medium"
        >
          + New Chat
        </button>

        <div className="mt-8 space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setChatId(chat.id)}
              className={`rounded-lg p-3 cursor-pointer transition ${
                chat.id === chatId
                  ? "bg-zinc-800"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-10">
        <h1 className="text-4xl font-bold mb-8">Chat with your PDFs</h1>

        <div className="flex flex-col sm:flex-row gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-zinc-400
          file:mr-4
          file:py-2
          file:px-4
          file:rounded-md
          file:border-0
          file:bg-zinc-800
          file:text-white"
          />

          <button
            onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-500 rounded-md px-6"
          >
            Upload
          </button>
        </div>
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="font-semibold mb-4">Uploaded PDFs</h2>

          <div className="space-y-2">
            {documents.length === 0 ? (
              <p className="text-zinc-500 text-sm">No PDFs uploaded yet.</p>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="bg-zinc-800 rounded-lg px-4 py-3">
                  📄 {doc.title}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="mt-8">
          <Questions chatId={chatId} />
        </div>
      </main>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import Questions from "./components/questions";

// export default function Home() {
//   const [file, setFile] = useState<File | null>(null);
//   // const [documentId, setDocumentId] = useState("");
//   const [chatId, setChatId] = useState("");
//   const [chats, setChats] = useState<{ id: string; title: string }[]>([]);
//   const [documents, setDocuments] = useState<{ id: string; title: string }[]>(
//     [],
//   );

//   useEffect(() => {
//     if (!chatId) return;

//     async function loadDocuments() {
//       const response = await fetch(`/api/chat/${chatId}/documents`);
//       const data = await response.json();

//       setDocuments(data);
//     }

//     loadDocuments();
//   }, [chatId]);

//   useEffect(() => {
//     async function loadChats() {
//       const response = await fetch("/api/chat");
//       const data = await response.json();

//       setChats(data);

//       if (data.length > 0) {
//         setChatId(data[0].id);
//       }
//     }

//     loadChats();
//   }, []);
//   async function createChat() {
//     const response = await fetch("/api/chat/create", {
//       method: "POST",
//     });

//     const chat = await response.json();

//     setChats((prev) => [...prev, chat]);

//     setChatId(chat.id);
//   }
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };
//   async function loadChats() {
//     const response = await fetch("/api/chat");
//     const data = await response.json();

//     setChats(data);

//     if (!chatId && data.length > 0) {
//       setChatId(data[0].id);
//     }
//   }

//   useEffect(() => {
//     loadChats();
//   }, []);
//   const handleClick = async () => {
//     if (!chatId) {
//       alert("Create a chat first");
//       return;
//     }
//     if (!file) return;
//     const formData = new FormData();

//     formData.append("pdf", file);
//     let currentChatId = chatId;

//     // if (!currentChatId) {
//     //   const response = await fetch("/api/chat/create", {
//     //     method: "POST",
//     //   });

//     //   const chat = await response.json();

//     //   currentChatId = chat.id;

//     //   setChatId(chat.id);
//     // }
//     formData.append("chatId", currentChatId);
//     const response = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });
//     console.log("Status:", response.status);

//     // const text = await response.text();

//     // console.log(text);
//     const data = await response.json();
//     setDocuments((prev) => [
//       ...prev,
//       {
//         id: data.documentId,
//         title: file.name,
//       },
//     ]);

//     console.log(data);

//     // setDocumentId(data.documentId);
//     // console.log(response);
//     // console.log(data.documentId);

//     //      if (!file) return;

//     //   const arrayBuffer = await file.arrayBuffer();

//     //   console.log(arrayBuffer);
//     //   console.log(arrayBuffer.byteLength);
//     //   const uint8 = new Uint8Array(arrayBuffer);
//     // console.log(uint8.slice(0, 20));
//     //   console.log("selected file name is : " , file?.name)
//     //   console.log(file);

//     // console.log("Name:", file?.name);
//     // console.log("Size:", file?.size);
//     // console.log("Type:", file?.type);
//   };
//   return (
//     <div className="flex h-screen bg-zinc-950 text-white">
//       {/* Sidebar */}
//       <aside className="w-72 border-r border-zinc-800 p-5 flex flex-col">
//         <button
//           onClick={createChat}
//           className="w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-3 font-medium"
//         >
//           + New Chat
//         </button>

//         <div className="mt-8 space-y-2">
//           {chats.map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => setChatId(chat.id)}
//               className={`rounded-lg p-3 cursor-pointer transition ${
//                 chat.id === chatId
//                   ? "bg-zinc-800"
//                   : "bg-zinc-900 hover:bg-zinc-800"
//               }`}
//             >
//               {chat.title}
//             </div>
//           ))}
//         </div>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 overflow-y-auto p-10">
//         <h1 className="text-4xl font-bold mb-8">Chat with your PDFs</h1>

//         <div className="flex flex-col sm:flex-row gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-zinc-400
//           file:mr-4
//           file:py-2
//           file:px-4
//           file:rounded-md
//           file:border-0
//           file:bg-zinc-800
//           file:text-white"
//           />

//           <button
//             onClick={handleClick}
//             className="bg-blue-600 hover:bg-blue-500 rounded-md px-6"
//           >
//             Upload
//           </button>
//         </div>
//         <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
//           <h2 className="font-semibold mb-4">Uploaded PDFs</h2>

//           <div className="space-y-2">
//             {documents.length === 0 ? (
//               <p className="text-zinc-500 text-sm">No PDFs uploaded yet.</p>
//             ) : (
//               documents.map((doc) => (
//                 <div key={doc.id} className="bg-zinc-800 rounded-lg px-4 py-3">
//                   📄 {doc.title}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         <div className="mt-8">
//           <Questions chatId={chatId} />
//         </div>
//       </main>
//     </div>
//   );
// }
