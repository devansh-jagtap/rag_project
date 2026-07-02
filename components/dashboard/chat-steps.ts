import type { ChatStatus } from "@/types/chat";

export const chatLoadingSteps: Exclude<ChatStatus, "idle">[] = [
  "Searching documents",
  "Retrieving relevant chunks",
  "Generating answer",
];
