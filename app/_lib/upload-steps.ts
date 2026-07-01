import type { UploadStatus } from "./workspace-types";

export const uploadSteps: Exclude<UploadStatus, "idle">[] = [
  "Uploading PDF",
  "Extracting text",
  "Creating embeddings",
  "Saving vectors",
  "Completed",
];
