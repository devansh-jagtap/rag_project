import { Bot, Loader2 } from "lucide-react";
import { chatLoadingSteps } from "./chat-steps";
import type { ChatStatus } from "@/types/chat";

type ChatLoadingIndicatorProps = {
  chatStatus: ChatStatus;
};

export function ChatLoadingIndicator({
  chatStatus,
}: ChatLoadingIndicatorProps) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-blue-600 shadow-sm backdrop-blur-xl">
        <Bot size={17} />
      </div>
      <div className="rounded-[1.5rem] border border-white/80 bg-white/75 px-5 py-4 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
          <Loader2 size={17} className="animate-spin text-blue-600" />
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
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
