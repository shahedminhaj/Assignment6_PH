"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg border ${
          type === "success"
            ? "bg-[#1a1a1a] border-accent/50 text-white"
            : "bg-[#1a1a1a] border-red-500/50 text-white"
        }`}
      >
        <span className={type === "success" ? "text-accent" : "text-red-400"}>
          {type === "success" ? "✓" : "✕"}
        </span>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}