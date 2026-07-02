export type Chat = {
  id: string;
  title: string;
};

export type Document = {
  id: string;
  title: string;
};

export type UploadStatus =
  | "idle"
  | "Uploading PDF"
  | "Extracting text"
  | "Chunking"
  | "Creating embeddings"
  | "Saving vectors"
  | "Completed";

export type Toast = {
  id: string;
  type: "success" | "error";
  title: string;
  message?: string;
};
