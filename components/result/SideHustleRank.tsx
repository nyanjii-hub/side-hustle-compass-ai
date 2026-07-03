// components/result/SideHustleRank.tsx
import type { RankedSideHustle, SideHustle } from "@/lib/types";
import { glossary, SIDE_HUSTLE_TERM_MAP } from "@/data/glossary";
import { GlossaryTip } from "@/components/ui/GlossaryTip";

interface Props {
  ranked: RankedSideHustle[];
  notRecommended: SideHustle[];
  notRecommendedReason: string;
}

const RANK_ICONS = ["🥇", "🥈", "🥉", "4位", "5位"];

const BEGINNER_LABELS: Record<string, string> = {
  easy: "初心者向け ✓",
  medium: "中級者向け",
  hard: "上級者向け",
};

const BEGINNER_COLORS: Record<string, string> = {
  easy: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  hard: "bg-red-50 text-red-600",
};

const BURDEN_LABELS: Record<string, string> = {
  low: "低",
  medium: "中",
  high: "高",
};

const BURDEN_COLORS: Record<string, string> = {
  low: "text-emerald-600",
  medium: "text-amber-600",
  high: "text-red-500",
};

const AI_COMPAT_LABELS: Record<string, string> = {
  low: "△",
  medium: "○",
  high: "◎",
};

const AI_COMPAT_COLORS: Record<string, string> = {
  low: "text-zinc-400",
  medium: "text-indigo-500",
  high: "text-indigo-700",
};

function scoreToStars(score: number): number {
  if (score >= 50) return 5;
  if (score >= 40) return 4;
  if (score >= 30) return 3;
  if (score >= 20) return 2;
  return 1;
}

export function SideHustleRank({ ranked, notRecommended, notRecommendedReason }: Props) {
  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">おすすめ副業ランキング</h2>
      <div className="space-y-3 mb-6">
        {ranked.slice(0, 5).map((sh, i) => {
          const termIds = SIDE_HUSTLE_TERM_MAP[sh.id] ?? [];
          const terms = termIds
            .map(id => glossary.find(t => t.id === id))
            .filter(t => t !== undefined);
          const stars = scoreToStars(sh.score);

          return (
            <div key={sh.id} className="bg-white rounded-xl p-4 border border-zinc-100">
              {/* ヘッダー行 */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">{RANK_ICONS[i]}</span>
                <span className="font-semibold text-zinc-800 text-sm">{sh.name}</span>
                <span
                  className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full ${BEGINNER_COLORS[sh.beginnerFriendly]}`}
                >
                  {BEGINNER_LABELS[sh.beginnerFriendly]}
                </span>
              </div>

              {/* 適性度 */}
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[10px] text-zinc-400 mr-0.5">適性度</span>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`text-sm ${idx < stars ? "text-amber-400" : "text-zinc-200"}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* 向いている理由 */}
              <p className="text-xs text-zinc-600 mb-3 leading-relaxed">{sh.matchReason}</p>

              {/* 詳細スペック */}
              <div className="grid grid-cols-3 gap-2 bg-zinc-50 rounded-xl p-3 mb-2">
                <div className="text-center">
                  <p className="text-[9px] text-zinc-400 mb-0.5">収益化目安</p>
                  <p className="text-[11px] font-semibold text-zinc-700">{sh.timeToRevenue}</p>
                </div>
                <div className="text-center border-x border-zinc-200">
                  <p className="text-[9px] text-zinc-400 mb-0.5">継続負担</p>
                  <p className={`text-sm font-bold ${BURDEN_COLORS[sh.ongoingBurden]}`}>
                    {BURDEN_LABELS[sh.ongoingBurden]}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[9px] text-zinc-400 mb-0.5">AIとの相性</p>
                  <p className={`text-sm font-bold ${AI_COMPAT_COLORS[sh.aiCompatibility]}`}>
                    {AI_COMPAT_LABELS[sh.aiCompatibility]}
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 mb-2">
                月収目安（6ヶ月後）: {sh.income6months}
              </p>

              {/* 関連用語 */}
              {terms.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-50">
                  {terms.map(term => (
                    <GlossaryTip key={term.id} term={term} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* おすすめしない副業 */}
      <h3 className="text-sm font-semibold text-zinc-500 mb-2">おすすめしない副業</h3>
      <div className="bg-zinc-50 rounded-xl p-4 mb-2">
        <p className="text-xs text-zinc-600 leading-relaxed">{notRecommendedReason}</p>
      </div>
      <div className="space-y-2">
        {notRecommended.map(sh => (
          <div key={sh.id} className="bg-zinc-50 rounded-xl p-3">
            <p className="text-xs font-medium text-zinc-500">✗ {sh.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
