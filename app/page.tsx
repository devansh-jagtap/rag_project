"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  MessageSquarePlus,
  PanelLeft,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { fetchJson } from "@/lib/api-client";
import Questions from "./components/questions";

type Chat = {
  id: string;
  title: string;
};

type Document = {
  id: string;
  title: string;
};

type UploadStatus =
  | "idle"
  | "Uploading PDF"
  | "Extracting text"
  | "Creating embeddings"
  | "Saving vectors"
  | "Completed";

type Toast = {
  id: string;
  type: "success" | "error";
  title: string;
  message?: string;
};

const uploadSteps: Exclude<UploadStatus, "idle">[] = [
  "Uploading PDF",
  "Extracting text",
  "Creating embeddings",
  "Saving vectors",
  "Completed",
];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeChat = chats.find((chat) => chat.id === chatId);
  const isUploading = uploadStatus !== "idle";

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();

    setToasts((currentToasts) => [...currentToasts, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((currentToast) => currentToast.id !== id),
      );
    }, 4200);
  }, []);

  const refreshChats = useCallback(async (preferredChatId?: string) => {
    try {
      const data = await fetchJson<Chat[]>("/api/chat");

      setChats(data);
      setChatId((currentChatId) => {
        if (
          preferredChatId &&
          data.some((chat) => chat.id === preferredChatId)
        ) {
          return preferredChatId;
        }

        if (currentChatId && data.some((chat) => chat.id === currentChatId)) {
          return currentChatId;
        }

        return data[0]?.id ?? "";
      });

      return data;
    } catch (error) {
      console.error("Failed to refresh chats:", error);
      return [];
    }
  }, []);

  const refreshDocuments = useCallback(async (targetChatId: string) => {
    if (!targetChatId) {
      setDocuments([]);
      return [];
    }

    try {
      const data = await fetchJson<Document[]>(
        `/api/chat/${targetChatId}/documents`,
      );

      setDocuments(data);
      return data;
    } catch (error) {
      console.error("Failed to refresh documents:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => refreshDocuments(chatId));
  }, [chatId, refreshDocuments]);

  async function createChat() {
    try {
      const chat = await fetchJson<Chat>("/api/chat/create", {
        method: "POST",
      });

      await refreshChats(chat.id);
      await refreshDocuments(chat.id);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    void Promise.resolve().then(() => refreshChats());
  }, [refreshChats]);

  async function deleteChat(targetChatId: string) {
    const targetChat = chats.find((chat) => chat.id === targetChatId);
    const confirmed = window.confirm(
      `Delete "${targetChat?.title ?? "this chat"}" and all of its PDFs? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await fetchJson<{ success: boolean }>(`/api/chat/${targetChatId}`, {
        method: "DELETE",
      });

      await refreshChats();
      addToast({
        type: "success",
        title: "Chat deleted",
        message: "The chat, messages, documents, and vectors were removed.",
      });
    } catch (error) {
      console.error("Failed to delete chat:", error);
      addToast({
        type: "error",
        title: "Delete failed",
        message: "The chat could not be deleted. Check the console for details.",
      });
    }
  }

  async function deleteDocument(docId: string) {
    if (!chatId) return;

    const document = documents.find((doc) => doc.id === docId);
    const confirmed = window.confirm(
      `Delete "${document?.title ?? "this PDF"}" from this chat?`,
    );

    if (!confirmed) return;

    try {
      await fetchJson<{ success: boolean }>(
        `/api/chat/${chatId}/documents/${docId}`,
        {
          method: "DELETE",
        },
      );

      await refreshDocuments(chatId);
      addToast({
        type: "success",
        title: "PDF deleted",
        message: "The document and its vectors were removed.",
      });
    } catch (error) {
      console.error("Failed to delete document:", error);
      addToast({
        type: "error",
        title: "Delete failed",
        message: "The PDF could not be deleted. Check the console for details.",
      });
    }
  }

  const handleClick = async () => {
    if (!chatId) {
      addToast({
        type: "error",
        title: "Create a chat first",
        message: "Start a chat before uploading a PDF.",
      });
      return;
    }
    if (!file) return;
    const formData = new FormData();
    let currentUploadStep = 0;

    formData.append("pdf", file);
    formData.append("chatId", chatId);

    setUploadStatus(uploadSteps[currentUploadStep]);
    const uploadProgressTimer = window.setInterval(() => {
      currentUploadStep = Math.min(currentUploadStep + 1, uploadSteps.length - 2);
      setUploadStatus(uploadSteps[currentUploadStep]);
    }, 1800);

    try {
      await fetchJson<{ success: boolean; documentId: string }>("/api/upload", {
        method: "POST",
        body: formData,
      });

      window.clearInterval(uploadProgressTimer);
      setUploadStatus("Completed");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await Promise.all([refreshDocuments(chatId), refreshChats(chatId)]);
      addToast({
        type: "success",
        title: "Upload successful",
        message: `${file.name} is ready for questions.`,
      });
    } catch (error) {
      window.clearInterval(uploadProgressTimer);
      console.error("Failed to upload document:", error);
      addToast({
        type: "error",
        title: "Upload failed",
        message: "The PDF could not be processed. Check the console for details.",
      });
    } finally {
      window.setTimeout(() => {
        setUploadStatus("idle");
      }, 900);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#111111] text-zinc-100 md:flex-row">
      <aside className="flex max-h-72 w-full shrink-0 flex-col border-b border-zinc-800 bg-[#171717] md:max-h-none md:w-80 md:border-b-0 md:border-r">
        <div className="border-b border-zinc-800 p-4">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <PanelLeft size={18} />
            PDF Workspace
          </div>

          <button
            onClick={createChat}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-zinc-100 px-4 text-sm font-semibold text-zinc-950 transition hover:bg-white"
          >
            <MessageSquarePlus size={18} />
            New Chat
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Chats
          </p>

          <div className="space-y-1">
            {chats.length === 0 ? (
              <p className="px-2 py-3 text-sm text-zinc-500">
                Create a chat to begin.
              </p>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setChatId(chat.id)}
                  className={`group flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2.5 text-sm transition ${
                    chat.id === chatId
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-100"
                  }`}
                >
                  <span className="min-w-0 truncate">{chat.title}</span>

                  <button
                    type="button"
                    title="Delete chat"
                    onClick={(e) => {
                      e.stopPropagation();
                      void deleteChat(chat.id);
                    }}
                    className="rounded-md p-1 text-zinc-500 opacity-0 transition hover:bg-red-500/10 hover:text-red-300 group-hover:opacity-100"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-zinc-800 bg-[#111111]/95 px-8 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-zinc-500">Current chat</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
                {activeChat?.title ?? "Chat with your PDFs"}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex h-11 min-w-0 cursor-pointer items-center gap-3 rounded-md border border-zinc-700 bg-zinc-900 px-4 text-sm text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800">
                <Plus size={17} />
                <span className="max-w-56 truncate">
                  {file?.name ?? "Choose PDF"}
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>

              <button
                onClick={handleClick}
                disabled={!file || isUploading}
                className="flex h-11 items-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUploading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Upload size={17} />
                )}
                Upload
              </button>
            </div>
          </div>

          {uploadStatus !== "idle" && (
            <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-950/80 p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium text-zinc-200">
                  {uploadStatus}
                </span>
                <span className="text-zinc-500">
                  {uploadStatus === "Completed" ? "Done" : "Processing"}
                </span>
              </div>

              <div className="grid gap-2 sm:grid-cols-5">
                {uploadSteps.map((step) => {
                  const isComplete =
                    uploadSteps.indexOf(step) <= uploadSteps.indexOf(uploadStatus);

                  return (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className={`h-2 flex-1 rounded-full ${
                          isComplete ? "bg-blue-500" : "bg-zinc-800"
                        }`}
                      />
                      <span
                        className={`hidden text-xs sm:block ${
                          isComplete ? "text-zinc-200" : "text-zinc-600"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </header>

        <div className="border-b border-zinc-800 bg-[#151515] p-4 xl:hidden">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">
                Uploaded PDFs
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                {documents.length} document{documents.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {documents.length === 0 ? (
            <div className="rounded-lg border border-dashed border-zinc-800 p-4 text-sm text-zinc-500">
              Upload a PDF to enable chat.
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex min-w-72 items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3"
                >
                  <div className="rounded-md bg-blue-500/10 p-2 text-blue-300">
                    <FileText size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-100">
                      {doc.title}
                    </p>
                    <p className="text-xs text-zinc-500">Ready for chat</p>
                  </div>
                  <button
                    type="button"
                    title="Delete PDF"
                    onClick={() => void deleteDocument(doc.id)}
                    className="rounded-md p-1.5 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <section className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden xl:grid-cols-[minmax(0,1fr)_340px]">
          <Questions
            chatId={chatId}
            documentsCount={documents.length}
            onChatsRefresh={refreshChats}
          />

          <aside className="hidden min-h-0 border-l border-zinc-800 bg-[#161616] xl:flex xl:flex-col">
            <div className="border-b border-zinc-800 p-5">
              <h2 className="text-sm font-semibold text-zinc-100">
                Uploaded PDFs
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {documents.length} document{documents.length === 1 ? "" : "s"} in
                this chat
              </p>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
              {documents.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full border border-zinc-800 bg-zinc-900 p-4 text-zinc-400">
                    <FileText size={24} />
                  </div>
                  <p className="text-sm font-medium text-zinc-300">
                    No PDFs uploaded
                  </p>
                  <p className="mt-1 max-w-56 text-sm text-zinc-500">
                    Upload a document to unlock retrieval-backed answers.
                  </p>
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="group rounded-lg border border-zinc-800 bg-zinc-900/80 p-4 transition hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-blue-500/10 p-2 text-blue-300">
                        <FileText size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-100">
                          {doc.title}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          Available for this chat
                        </p>
                      </div>
                      <button
                        type="button"
                        title="Delete PDF"
                        onClick={() => void deleteDocument(doc.id)}
                        className="rounded-md p-1.5 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </section>
      </main>

      <div className="fixed right-5 top-5 z-50 flex w-96 max-w-[calc(100vw-2.5rem)] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 shadow-2xl shadow-black/30"
          >
            <div className="flex gap-3">
              <div
                className={
                  toast.type === "success" ? "text-emerald-400" : "text-red-400"
                }
              >
                {toast.type === "success" ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-zinc-100">
                  {toast.title}
                </p>
                {toast.message && (
                  <p className="mt-1 text-sm text-zinc-400">{toast.message}</p>
                )}
              </div>
              <button
                type="button"
                title="Dismiss notification"
                onClick={() =>
                  setToasts((currentToasts) =>
                    currentToasts.filter(
                      (currentToast) => currentToast.id !== toast.id,
                    ),
                  )
                }
                className="rounded-md p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
