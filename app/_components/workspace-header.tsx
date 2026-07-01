"use client";

import { UserButton } from "@clerk/nextjs";
import { Loader2, Plus, Upload } from "lucide-react";
import { UploadProgress } from "./upload-progress";
import type { UploadStatus } from "../_lib/workspace-types";

type WorkspaceHeaderProps = {
  activeChatTitle?: string;
  file: File | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  uploadStatus: UploadStatus;
};

export function WorkspaceHeader({
  activeChatTitle,
  file,
  fileInputRef,
  isUploading,
  onFileChange,
  onUpload,
  uploadStatus,
}: WorkspaceHeaderProps) {
  return (
    <header className="border-b border-zinc-800 bg-[#111111]/95 px-8 py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-zinc-500">Current chat</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
            {activeChatTitle ?? "Chat with your PDFs"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex h-11 min-w-0 cursor-pointer items-center gap-3 rounded-md border border-zinc-700 bg-zinc-900 px-4 text-sm text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800">
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
            className="flex h-11 items-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Upload size={17} />
            )}
            Upload
          </button>

          <div className="flex h-11 items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-2">
            <UserButton />
          </div>
        </div>
      </div>

      <UploadProgress uploadStatus={uploadStatus} />
    </header>
  );
}
