"use client";
import { useState } from "react";
import type { GlossaryTerm } from "@/data/glossary";

interface Props {
  term: GlossaryTerm;
}

export function GlossaryTip({ term }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-[11px] font-medium hover:bg-indigo-100 transition-colors"
        aria-label={`${term.name}の説明を見る`}
      >
        <span>{term.label}</span>
        <span className="w-3.5 h-3.5 rounded-full border border-indigo-400 flex items-center justify-center text-[8px] font-bold leading-none">
          ?
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] text-zinc-400 mb-0.5">専門用語</p>
                  <h3 className="font-bold text-zinc-900 text-base leading-tight">
                    {term.name}
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-zinc-600 shrink-0 rounded-full hover:bg-zinc-100 transition-colors text-sm"
                  aria-label="閉じる"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-zinc-700 font-medium">{term.summary}</p>

              <div className="bg-zinc-50 rounded-xl p-3">
                <p className="text-[10px] font-semibold text-zinc-500 mb-1.5">何ができるか</p>
                <p className="text-xs text-zinc-600 leading-relaxed">{term.whatYouCanDo}</p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-zinc-500 mb-1.5">
                    初心者おすすめ度
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < term.beginnerScore ? "text-amber-400" : "text-zinc-200"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-zinc-500 mb-1.5">
                    学習時間の目安
                  </p>
                  <p className="text-xs text-zinc-600">{term.learningTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
