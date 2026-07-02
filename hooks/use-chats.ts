"use client";

import { useCallback, useEffect, useState } from "react";
import { isAuthRedirectError } from "@/lib/api-client";
import {
  createChatRequest,
  deleteChatRequest,
  deleteDocumentRequest,
  listChats,
  listDocuments,
} from "@/lib/workspace-api";
import type { Chat, Document, Toast } from "@/types/workspace";

type UseChatDocumentsOptions = {
  addToast: (toast: Omit<Toast, "id">) => void;
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
};

export function useChatDocuments({
  addToast,
  isLoaded,
  isSignedIn,
}: UseChatDocumentsOptions) {
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const activeChat = chats.find((chat) => chat.id === chatId);

  const refreshChats = useCallback(async (preferredChatId?: string) => {
    if (!isLoaded || !isSignedIn) {
      setChats([]);
      setChatId("");
      return [];
    }

    try {
      const data = await listChats();

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
      if (isAuthRedirectError(error)) {
        setChats([]);
        setChatId("");
        return [];
      }

      console.error("Failed to refresh chats:", error);
      return [];
    }
  }, [isLoaded, isSignedIn]);

  const refreshDocuments = useCallback(async (targetChatId: string) => {
    if (!targetChatId || !isLoaded || !isSignedIn) {
      setDocuments([]);
      return [];
    }

    try {
      const data = await listDocuments(targetChatId);

      setDocuments(data);
      return data;
    } catch (error) {
      if (isAuthRedirectError(error)) {
        setDocuments([]);
        return [];
      }

      console.error("Failed to refresh documents:", error);
      return [];
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    void Promise.resolve().then(() => refreshChats());
  }, [refreshChats]);

  useEffect(() => {
    void Promise.resolve().then(() => refreshDocuments(chatId));
  }, [chatId, refreshDocuments]);

  async function createChat() {
    if (!isSignedIn) {
      addToast({
        type: "error",
        title: "Sign in first",
        message: "Create an account or sign in before starting a chat.",
      });
      return;
    }

    try {
      const chat = await createChatRequest();

      await refreshChats(chat.id);
      await refreshDocuments(chat.id);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  }

  async function deleteChat(targetChatId: string) {
    if (!isSignedIn) return;

    const targetChat = chats.find((chat) => chat.id === targetChatId);
    const confirmed = window.confirm(
      `Delete "${targetChat?.title ?? "this chat"}" and all of its PDFs? This cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteChatRequest(targetChatId);

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
    if (!chatId || !isSignedIn) return;

    const document = documents.find((doc) => doc.id === docId);
    const confirmed = window.confirm(
      `Delete "${document?.title ?? "this PDF"}" from this chat?`,
    );

    if (!confirmed) return;

    try {
      await deleteDocumentRequest(chatId, docId);

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

  return {
    activeChat,
    chatId,
    chats,
    createChat,
    deleteChat,
    deleteDocument,
    documents,
    refreshChats,
    refreshDocuments,
    setChatId,
  };
}
