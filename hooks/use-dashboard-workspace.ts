"use client";

import { useUser } from "@clerk/nextjs";
import { useChatDocuments } from "./use-chats";
import { useToasts } from "./use-toasts";
import { useUploadDocument } from "./use-upload";

export function useDashboardWorkspace() {
  const { isLoaded, isSignedIn } = useUser();
  const toastState = useToasts();
  const chatState = useChatDocuments({
    addToast: toastState.addToast,
    isLoaded,
    isSignedIn,
  });
  const uploadState = useUploadDocument({
    addToast: toastState.addToast,
    chatId: chatState.chatId,
    isSignedIn,
    refreshChats: chatState.refreshChats,
    refreshDocuments: chatState.refreshDocuments,
  });

  return {
    activeChat: chatState.activeChat,
    chatId: chatState.chatId,
    chats: chatState.chats,
    createChat: chatState.createChat,
    deleteChat: chatState.deleteChat,
    deleteDocument: chatState.deleteDocument,
    dismissToast: toastState.dismissToast,
    documents: chatState.documents,
    file: uploadState.file,
    fileInputRef: uploadState.fileInputRef,
    handleFileChange: uploadState.handleFileChange,
    isLoaded,
    isSignedIn,
    isUploading: uploadState.isUploading,
    refreshChats: chatState.refreshChats,
    setChatId: chatState.setChatId,
    toasts: toastState.toasts,
    uploadDocument: uploadState.uploadDocument,
    uploadStatus: uploadState.uploadStatus,
  };
}
