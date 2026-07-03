"use client";
import { useState } from "react";
import type { GlossaryCategory, GlossaryTerm } from "@/data/glossary";

interface Props {
  term: GlossaryTerm;
}

const CATEGORY_CONFIG: Record<
  GlossaryCategory,
  { badge: string; label: string; headerColor: string }
> = {
  tech: {
    badge: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
    label: "専門用語ガイド",
    headerColor: "text-indigo-500",
  },
  service: {
    badge: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    label: "サービスガイド",
    headerColor: "text-emerald-600",
  },
  "ai-tool": {
    badge: "bg-violet-50 text-violet-700 hover:bg-violet-100",
    label: "AIツールガイド",
    headerColor: "text-violet-500",
  },
  marketplace: {
    badge: "bg-orange-50 text-orange-700 hover:bg-orange-100",
    label: "販売サービスガイド",
    headerColor: "text-orange-500",
  },
};

const REGION_LABELS: Record<string, string> = {
  japan: "日本向け",
  global: "海外向け",
  both: "日本・海外対応",
};

const REGION_COLORS: Record<string, string> = {
  japan: "bg-rose-50 text-rose-600",
  global: "bg-sky-50 text-sky-600",
  both: "bg-teal-50 text-teal-600",
};

export function GlossaryTip({ term }: Props) {
  const [open, setOpen] = useState(false);
  const config = CATEGORY_CONFIG[term.category];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${config.badge}`}
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
            className="bg-white rounded-2xl w-full max-w-sm shadow-xl flex flex-col max-h-[85vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* ヘッダー（固定） */}
            <div className="px-5 pt-5 pb-4 border-b border-zinc-100 shrink-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-[10px] font-semibold mb-0.5 uppercase tracking-wide ${config.headerColor}`}>
                    {config.label}
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

              {/* 地域・料金バッジ */}
              {(term.region || term.pricing) && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {term.region && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${REGION_COLORS[term.region]}`}>
                      {REGION_LABELS[term.region]}
                    </span>
                  )}
                  {term.pricing && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                      {term.pricing}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* スクロール可能なコンテンツ */}
            <div className="px-5 py-4 space-y-4 overflow-y-auto">
              {/* なぜこの用語が表示されたのか（技術用語のみ） */}
              {term.usedInContext && (
                <div className="bg-indigo-50 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-indigo-600 mb-1">
                    なぜこの用語が表示されているのか
                  </p>
                  <p className="text-xs text-indigo-900 leading-relaxed">
                    {term.usedInContext}
                  </p>
                </div>
              )}

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

              {/* どんな人に向いているか（サービス・ツール系） */}
              {term.targetAudience && (
                <div>
                  <p className="text-[10px] font-semibold text-zinc-500 mb-1">
                    どんな人に向いているか
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {term.targetAudience}
                  </p>
                </div>
              )}

              {/* 初心者おすすめ度 */}
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

              {/* 学習時間の目安（技術用語のみ） */}
              {term.learningTime && (
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
              )}
            </div>

            {/* 公式サイトボタン（固定フッター） */}
            {term.officialUrl && (
              <div className="px-5 pb-5 pt-2 shrink-0 border-t border-zinc-100">
                <a
                  href={term.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 text-white rounded-xl text-sm font-semibold hover:bg-zinc-700 transition-colors"
                >
                  公式サイトを見る
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
