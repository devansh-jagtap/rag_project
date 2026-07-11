import { Loader2 } from "lucide-react";

export function LoadingWorkspace() {
  return (
    <div className="flex h-screen items-center justify-center text-slate-950">
      <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-700 shadow-xl shadow-slate-200/70 backdrop-blur-xl">
        <Loader2 size={18} className="animate-spin text-blue-600" />
        Loading workspace
      </div>
    </div>
  );
}
