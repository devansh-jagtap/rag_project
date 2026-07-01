import { Loader2 } from "lucide-react";

export function LoadingWorkspace() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#111111] text-zinc-100">
      <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
        <Loader2 size={18} className="animate-spin text-blue-300" />
        Loading workspace
      </div>
    </div>
  );
}
