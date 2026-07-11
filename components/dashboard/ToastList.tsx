"use client";

import { AlertCircle, CheckCircle2, X } from "lucide-react";
import type { Toast } from "@/types/workspace";

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
          className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-2xl shadow-slate-300/70 backdrop-blur-2xl"
        >
          <div className="flex gap-3">
            <div
              className={
                toast.type === "success" ? "text-emerald-600" : "text-red-500"
              }
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-slate-950">
                {toast.title}
              </p>
              {toast.message && (
                <p className="mt-1 text-sm text-slate-600">{toast.message}</p>
              )}
            </div>
            <button
              type="button"
              title="Dismiss notification"
              onClick={() => onDismiss(toast.id)}
              className="rounded-xl p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
