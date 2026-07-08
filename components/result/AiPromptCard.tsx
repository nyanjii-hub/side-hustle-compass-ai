// components/result/AiPromptCard.tsx
"use client";
import { useState } from "react";

interface Props {
  prompt: string;
}

export function AiPromptCard({ prompt }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available
    }
  }

  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">ChatGPTに相談してみる</h2>
      <div className="bg-white rounded-xl p-4 border border-zinc-100">
        <p className="text-[10px] text-zinc-400 mb-2">
          このプロンプトをコピーしてChatGPTに貼り付けてください
        </p>
        <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 rounded-lg p-3 mb-3">
          {prompt}
        </p>
        <button
          onClick={handleCopy}
          className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-colors ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-zinc-900 text-white hover:bg-zinc-700"
          }`}
        >
          {copied ? "コピーしました ✓" : "プロンプトをコピーする"}
        </button>
      </div>
    </section>
  );
}
