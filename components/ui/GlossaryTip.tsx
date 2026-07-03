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
        <span className="text-xs leading-none opacity-70">ⓘ</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div className="px-5 pt-5 pb-4 border-b border-zinc-100">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] text-indigo-500 font-semibold mb-0.5 uppercase tracking-wide">
                    専門用語ガイド
                  </p>
                  <h3 className="font-bold text-zinc-900 text-base leading-tight">
                    {term.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-0.5">{term.summary}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-zinc-600 shrink-0 rounded-full hover:bg-zinc-100 transition-colors text-sm mt-0.5"
                  aria-label="閉じる"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* なぜこの用語が表示されたのか */}
              <div className="bg-indigo-50 rounded-xl p-3">
                <p className="text-[10px] font-semibold text-indigo-600 mb-1">
                  なぜこの用語が表示されているのか
                </p>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  {term.usedInContext}
                </p>
              </div>

              {/* 何ができるか（具体例） */}
              <div>
                <p className="text-[10px] font-semibold text-zinc-500 mb-1.5">
                  具体的に何ができるか
                </p>
                <ul className="space-y-1">
                  {term.whatYouCanDo.map((example, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-600">
                      <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 初心者おすすめ度 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold text-zinc-500 mb-1">
                    初心者おすすめ度
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-base ${i < term.beginnerScore ? "text-amber-400" : "text-zinc-200"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 学習時間の目安（3段階） */}
              <div>
                <p className="text-[10px] font-semibold text-zinc-500 mb-2">
                  学習時間の目安
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded shrink-0 mt-px">
                      最初の一歩
                    </span>
                    <p className="text-xs text-zinc-600">{term.learningTime.firstStep}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded shrink-0 mt-px">
                      基本操作
                    </span>
                    <p className="text-xs text-zinc-600">{term.learningTime.basics}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[9px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded shrink-0 mt-px">
                      仕事で使える
                    </span>
                    <p className="text-xs text-zinc-600">{term.learningTime.professional}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
