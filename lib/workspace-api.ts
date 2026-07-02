import { fetchJson } from "@/lib/api-client";
import type { Chat, Document } from "@/types/workspace";

export function listChats() {
  return fetchJson<Chat[]>("/api/chat");
}

export function createChatRequest() {
  return fetchJson<Chat>("/api/chat/create", {
    method: "POST",
  });
}

export function deleteChatRequest(chatId: string) {
  return fetchJson<{ success: boolean }>(`/api/chat/${chatId}`, {
    method: "DELETE",
  });
}

export function listDocuments(chatId: string) {
  return fetchJson<Document[]>(`/api/chat/${chatId}/documents`);
}

export function deleteDocumentRequest(chatId: string, documentId: string) {
  return fetchJson<{ success: boolean }>(
    `/api/chat/${chatId}/documents/${documentId}`,
    {
      method: "DELETE",
    },
  );
}

export function uploadPdf(formData: FormData) {
  return fetchJson<{ success: boolean; documentId: string }>("/api/upload", {
    method: "POST",
    body: formData,
  });
}
