// components/result/WorkStyleCard.tsx
import type { WorkStyleType } from "@/lib/types";

interface Props {
  primary: WorkStyleType;
  notSuited: WorkStyleType;
}

export function WorkStyleCard({ primary, notSuited }: Props) {
  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">向いている働き方タイプ</h2>
      <div className="bg-white border-2 border-zinc-900 rounded-2xl p-5 mb-3">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{primary.emoji}</span>
          <h3 className="text-lg font-bold text-zinc-900">{primary.name}</h3>
        </div>
        <p className="text-zinc-600 text-sm leading-relaxed">{primary.description}</p>
      </div>
      <div className="bg-zinc-50 rounded-xl p-4">
        <p className="text-xs text-zinc-500 leading-relaxed">
          <span className="font-semibold text-zinc-600">向いていない働き方：</span>
          {notSuited.name} — {notSuited.notSuited}
        </p>
      </div>
    </section>
  );
}
