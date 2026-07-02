import type { UploadStatus } from "@/types/workspace";

export const uploadSteps: Exclude<UploadStatus, "idle">[] = [
  "Uploading PDF",
  "Extracting text",
  "Chunking",
  "Creating embeddings",
  "Saving vectors",
  "Completed",
];
