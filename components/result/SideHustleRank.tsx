// components/result/SideHustleRank.tsx
import type { RankedSideHustle, SideHustle } from "@/lib/types";

interface Props {
  ranked: RankedSideHustle[];
  notRecommended: SideHustle[];
}

const RANK_ICONS = ["🥇", "🥈", "🥉", "4位", "5位"];

export function SideHustleRank({ ranked, notRecommended }: Props) {
  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">おすすめ副業ランキング</h2>
      <div className="space-y-3 mb-6">
        {ranked.slice(0, 5).map((sh, i) => (
          <div key={sh.id} className="bg-white rounded-xl p-4 border border-zinc-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">{RANK_ICONS[i]}</span>
              <span className="font-semibold text-zinc-800 text-sm">{sh.name}</span>
            </div>
            <p className="text-xs text-zinc-500 mb-1">{sh.matchReason}</p>
            <p className="text-xs text-zinc-400">月収目安（6ヶ月後）: {sh.income6months}</p>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-semibold text-zinc-500 mb-2">おすすめしない副業</h3>
      <div className="space-y-2">
        {notRecommended.map(sh => (
          <div key={sh.id} className="bg-zinc-50 rounded-xl p-3">
            <p className="text-xs font-medium text-zinc-500">✗ {sh.name}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{sh.whyGood}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
