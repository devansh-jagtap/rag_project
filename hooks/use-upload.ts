"use client";

import { useRef, useState } from "react";
import { uploadSteps } from "@/lib/upload-steps";
import { uploadPdf } from "@/lib/workspace-api";
import type { Chat, Document, Toast, UploadStatus } from "@/types/workspace";

type UseUploadDocumentOptions = {
  addToast: (toast: Omit<Toast, "id">) => void;
  chatId: string;
  isSignedIn: boolean | undefined;
  refreshChats: (preferredChatId?: string) => Promise<Chat[]>;
  refreshDocuments: (targetChatId: string) => Promise<Document[]>;
};

export function useUploadDocument({
  addToast,
  chatId,
  isSignedIn,
  refreshChats,
  refreshDocuments,
}: UseUploadDocumentOptions) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isUploading = uploadStatus !== "idle";

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function uploadDocument() {
    if (!isSignedIn) {
      addToast({
        type: "error",
        title: "Sign in first",
        message: "Sign in before uploading PDFs.",
      });
      return;
    }

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
      await uploadPdf(formData);

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
  }

  return {
    file,
    fileInputRef,
    handleFileChange,
    isUploading,
    uploadDocument,
    uploadStatus,
  };
}
