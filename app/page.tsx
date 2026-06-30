"use client";

import { useEffect, useState } from "react";
import Questions from "./components/questions";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState<{ id: string; title: string }[]>([]);
  const [documents, setDocuments] = useState<{ id: string; title: string }[]>(
    [],
  );

  async function loadDocuments() {
    if (!chatId) return;
    const response = await fetch(`/api/chat/${chatId}/documents`);
    const data = await response.json();

    setDocuments(data);
  }

  useEffect(() => {
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

  async function deleteChat(targetChatId: string) {
    await fetch(`/api/chat/${targetChatId}`, {
      method: "DELETE",
    });

    await loadChats();

    if (targetChatId === chatId) {
      setChatId("");
    }
  }

  async function deleteDocument(docId: string) {
    await fetch(`/api/document/${docId}`, {
      method: "DELETE",
    });

   
    await loadDocuments();
  }

  const handleClick = async () => {
    if (!chatId) {
      alert("Create a chat first");
      return;
    }
    if (!file) return;
    const formData = new FormData();

    formData.append("pdf", file);
    let currentChatId = chatId;

    formData.append("chatId", currentChatId);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    
    console.log("Status:", response.status);

    const data = await response.json();
    setDocuments((prev) => [
      ...prev,
      {
        id: data.documentId,
        title: file.name,
      },
    ]);

    console.log(data);

  
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
              className={`flex justify-between items-center rounded-lg p-3 cursor-pointer transition ${
                chat.id === chatId
                  ? "bg-zinc-800"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              <span>{chat.title}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
              >
                🗑
              </button>
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
                <div
                  key={doc.id}
                  className="bg-zinc-800 rounded-lg px-4 py-3 flex items-center justify-between"
                >
                  <span>📄 {doc.title}</span>

                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="text-red-400 hover:text-red-300 p-1 transition-colors"
                  >
                    🗑
                  </button>
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