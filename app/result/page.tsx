// app/result/page.tsx
"use client";
import { useState } from "react";
import type { DiagnosisResult } from "@/lib/types";
import { TodayAction } from "@/components/result/TodayAction";
import { TraitTags } from "@/components/result/TraitTags";
import { StrengthText } from "@/components/result/StrengthText";
import { WorkStyleCard } from "@/components/result/WorkStyleCard";
import { SideHustleRank } from "@/components/result/SideHustleRank";
import { Roadmap } from "@/components/result/Roadmap";

export default function ResultPage() {
  const [result] = useState<DiagnosisResult | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("diagnosis_result");
    return stored ? (JSON.parse(stored) as DiagnosisResult) : null;
  });

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-500 text-sm">診断結果が見つかりません</p>
        <a href="/diagnosis" className="text-zinc-900 underline text-sm">
          診断をはじめる
        </a>
      </div>
    );
  }

  const shareText = encodeURIComponent(
    `副業コンパスAIで診断した結果、私は「${result.primaryTypeDetail.name}」タイプでした！ #副業コンパスAI`
  );

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-xl font-bold text-zinc-800 text-center">
          診断が完了しました
        </h1>

        <TodayAction action={result.todayAction} />
        <TraitTags labels={result.traitLabels} />
        <StrengthText text={result.strengthText} />
        <WorkStyleCard
          primary={result.primaryTypeDetail}
          notSuited={result.notSuitedTypeDetail}
        />
        <SideHustleRank
          ranked={result.rankedSideHustles}
          notRecommended={result.notRecommended}
        />
        <Roadmap days={result.weekRoadmap} />

        <div className="flex flex-col gap-3 pt-4 pb-8">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-zinc-900 text-white rounded-full text-center text-sm font-semibold"
          >
            Xでシェアする
          </a>
          <a
            href="/diagnosis"
            className="w-full py-3.5 border-2 border-zinc-200 text-zinc-600 rounded-full text-center text-sm font-medium"
          >
            もう一度診断する
          </a>
        </div>
      </div>
    </main>
  );
}
