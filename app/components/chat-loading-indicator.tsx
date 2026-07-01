import { Bot, Loader2 } from "lucide-react";
import { chatLoadingSteps } from "./question-steps";
import type { ChatStatus } from "./question-types";

type ChatLoadingIndicatorProps = {
  chatStatus: ChatStatus;
};

export function ChatLoadingIndicator({
  chatStatus,
}: ChatLoadingIndicatorProps) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-blue-300">
        <Bot size={17} />
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
        <div className="flex items-center gap-3 text-sm text-zinc-300">
          <Loader2 size={17} className="animate-spin text-blue-300" />
          <span>{chatStatus}</span>
        </div>
        <div className="mt-3 flex gap-2">
          {chatLoadingSteps.map((step) => (
            <div
              key={step}
              className={`h-1.5 w-16 rounded-full ${
                chatLoadingSteps.indexOf(step) <=
                chatLoadingSteps.indexOf(
                  chatStatus as Exclude<ChatStatus, "idle">,
                )
                  ? "bg-blue-500"
                  : "bg-zinc-800"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
