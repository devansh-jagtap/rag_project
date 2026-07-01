"use client";

import { AlertCircle, CheckCircle2, X } from "lucide-react";
import type { Toast } from "../_lib/workspace-types";

type ToastListProps = {
  toasts: Toast[];
  onDismiss: (toastId: string) => void;
};

export function ToastList({ toasts, onDismiss }: ToastListProps) {
  return (
    <div className="fixed right-5 top-5 z-50 flex w-96 max-w-[calc(100vw-2.5rem)] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 shadow-2xl shadow-black/30"
        >
          <div className="flex gap-3">
            <div
              className={
                toast.type === "success" ? "text-emerald-400" : "text-red-400"
              }
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-zinc-100">
                {toast.title}
              </p>
              {toast.message && (
                <p className="mt-1 text-sm text-zinc-400">{toast.message}</p>
              )}
            </div>
            <button
              type="button"
              title="Dismiss notification"
              onClick={() => onDismiss(toast.id)}
              className="rounded-md p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
