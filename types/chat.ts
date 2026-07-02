export type QuestionsProps = {
  chatId: string;
  documentsCount: number;
  onChatsRefresh?: (preferredChatId?: string) => Promise<unknown>;
};

export type Source = {
  title: string;
  chunkIndex: number | null;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

export type ChatResponse = {
  success: boolean;
  answer: string;
  sources?: Source[];
};

export type ChatStatus =
  | "idle"
  | "Searching documents"
  | "Retrieving relevant chunks"
  | "Generating answer";
