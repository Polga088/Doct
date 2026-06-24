"use client";

import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText("");
    }
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
      <form
        onSubmit={handleSubmit}
        className={`
          relative flex items-center gap-3 w-full
          bg-white/80 glass-panel rounded-full
          px-4 py-3 border-0 transition-all duration-300
          ${isFocused ? "neural-glow-cyan bg-white shadow-lg" : "shadow-sm"}
        `}
      >
        <button
          type="button"
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
        </button>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type a message or use / command..."
          className="flex-1 bg-transparent border-none outline-none font-body text-sm text-on-surface placeholder:text-on-surface-variant/50"
        />

        <button
          type="button"
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">mic</span>
        </button>

        <button
          type="submit"
          disabled={!text.trim()}
          className={`
            w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
            ${text.trim() ? "bg-primary text-white hover:scale-105 neural-glow-cyan" : "bg-surface-container text-on-surface-variant/50 cursor-not-allowed"}
          `}
        >
          <span className="material-symbols-outlined text-[16px] ml-0.5">send</span>
        </button>
      </form>
    </div>
  );
}
