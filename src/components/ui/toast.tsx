"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export function Toast({ open, onClose, message }: ToastProps) {
  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-between",
        "w-[364px] min-h-[84px] p-6 bg-white rounded-lg shadow-md border border-gray-100",
        "transition-all duration-300 ease-in-out",
        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
    >
      <div className="flex-1">
        <p className="text-gray-700 text-sm">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 px-5 py-2 text-gray-700 text-sm font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none rounded-full transition-colors"
      >
        Fechar
      </button>
    </div>
  );
}
