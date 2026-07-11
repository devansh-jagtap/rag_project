"use client";

import { UserButton } from "@clerk/nextjs";
import { Loader2, Plus, Upload } from "lucide-react";
import { UploadProgress } from "./UploadProgress";
import type { UploadStatus } from "@/types/workspace";

type WorkspaceHeaderProps = {
  activeChatTitle?: string;
  file: File | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  uploadStatus: UploadStatus;
};

export function TopBar({
  activeChatTitle,
  file,
  fileInputRef,
  isUploading,
  onFileChange,
  onUpload,
  uploadStatus,
}: WorkspaceHeaderProps) {
  return (
    <header className="border-b border-white/70 bg-white/45 px-8 py-5 backdrop-blur-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">Current chat</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-normal text-slate-950">
            {activeChatTitle ?? "Chat with your PDFs"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex h-12 min-w-0 cursor-pointer items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur-xl transition hover:bg-white hover:text-slate-950">
            <Plus size={17} />
            <span className="max-w-56 truncate">{file?.name ?? "Choose PDF"}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={onFileChange}
              className="sr-only"
            />
          </label>

          <button
            onClick={onUpload}
            disabled={!file || isUploading}
            className="flex h-12 items-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-200/70 transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Upload size={17} />
            )}
            Upload
          </button>

          <div className="flex h-12 items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-2 shadow-sm backdrop-blur-xl">
            <UserButton />
          </div>
        </div>
      </div>

      <UploadProgress uploadStatus={uploadStatus} />
    </header>
  );
}
