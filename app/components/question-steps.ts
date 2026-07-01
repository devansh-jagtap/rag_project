import type { ChatStatus } from "./question-types";

export const chatLoadingSteps: Exclude<ChatStatus, "idle">[] = [
  "Searching documents",
  "Retrieving relevant chunks",
  "Generating answer",
];
