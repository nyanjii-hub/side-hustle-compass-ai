// app/result/page.tsx
"use client";
import { useState } from "react";
import type { DiagnosisResult } from "@/lib/types";
import { getService, getServiceUrl, hasAnyAffiliateLink } from "@/lib/external-services";
import { TypeHeader } from "@/components/result/TypeHeader";
import { TraitTags } from "@/components/result/TraitTags";
import { StrengthText } from "@/components/result/StrengthText";
import { WorkStyleCard } from "@/components/result/WorkStyleCard";
import { SideHustleRank } from "@/components/result/SideHustleRank";
import { Roadmap } from "@/components/result/Roadmap";
import { ClosingMessage } from "@/components/result/ClosingMessage";
import { TenMinuteMission } from "@/components/result/TenMinuteMission";
import { StumblingPoints } from "@/components/result/StumblingPoints";
import { AiPromptCard } from "@/components/result/AiPromptCard";

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

  const topSideHustle = result.rankedSideHustles[0];
  const topService = topSideHustle?.tenMinuteMission.serviceId
    ? getService(topSideHustle.tenMinuteMission.serviceId)
    : undefined;

  const shareText = encodeURIComponent(
    `副業コンパスAIで診断した結果、私は「${result.primaryTypeDetail.name}」タイプでした！ #副業コンパスAI`
  );

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* ① タイプ表示（最初に見せる） */}
        <TypeHeader primaryTypeDetail={result.primaryTypeDetail} />

        {/* ② 今日の10分ミッション（最優先） */}
        {topSideHustle && (
          <TenMinuteMission mission={topSideHustle.tenMinuteMission} />
        )}

        {/* ④ 行動特性 */}
        <TraitTags labels={result.traitLabels} />

        {/* ⑤ 無意識にできていること */}
        <StrengthText text={result.strengthText} />

        {/* ⑥ 働き方タイプ詳細 */}
        <WorkStyleCard
          primary={result.primaryTypeDetail}
          notSuited={result.notSuitedTypeDetail}
        />

        {/* ⑦ 副業ランキング */}
        <SideHustleRank
          ranked={result.rankedSideHustles}
          notRecommended={result.notRecommended}
          notRecommendedReason={result.notRecommendedReason}
        />

        {/* ⑧ 詰まりやすいポイント */}
        {topSideHustle && (
          <StumblingPoints points={topSideHustle.stumblingPoints} />
        )}

        {/* ⑨ AIプロンプト */}
        {topSideHustle && (
          <AiPromptCard prompt={topSideHustle.aiPrompt} />
        )}

        {/* ⑩ ロードマップ */}
        <Roadmap days={result.weekRoadmap} />

        {/* ⑪ クロージングメッセージ */}
        <ClosingMessage />

        {/* アクションボタン */}
        <div className="flex flex-col gap-3 pt-4 pb-4">
          {topService ? (
            <a
              href={getServiceUrl(topService)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-emerald-700 text-white rounded-full text-center text-sm font-semibold block"
            >
              {topService.ctaLabel} →
            </a>
          ) : (
            <a
              href="#mission"
              className="w-full py-3.5 bg-emerald-700 text-white rounded-full text-center text-sm font-semibold block"
            >
              今日の10分ミッションをもう一度見る ↑
            </a>
          )}
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

        {hasAnyAffiliateLink() && (
          <div className="text-[10px] text-zinc-400 text-center px-2 pb-8 leading-relaxed space-y-1">
            <p>※一部リンクには広告（アフィリエイト）を含みます。</p>
            <p>当サイトでは一部の外部リンクにアフィリエイト広告を利用する場合があります。広告の有無によって診断結果やおすすめ順位が変わることはありません。</p>
          </div>
        )}
      </div>
    </main>
  );
}
