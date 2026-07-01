"use client";

import { useCallback, useState } from "react";
import type { Toast } from "../_lib/workspace-types";

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((toastId: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((currentToast) => currentToast.id !== toastId),
    );
  }, []);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();

    setToasts((currentToasts) => [...currentToasts, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((currentToast) => currentToast.id !== id),
      );
    }, 4200);
  }, []);

  return {
    addToast,
    dismissToast,
    toasts,
  };
}
