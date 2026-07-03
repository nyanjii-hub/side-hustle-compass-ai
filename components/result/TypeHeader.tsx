// components/result/TypeHeader.tsx
import type { WorkStyleType } from "@/lib/types";

interface Props {
  primaryTypeDetail: WorkStyleType;
}

export function TypeHeader({ primaryTypeDetail }: Props) {
  return (
    <section className="text-center py-2">
      <p className="text-xs text-zinc-400 font-medium mb-2 uppercase tracking-widest">
        あなたは
      </p>
      <div className="inline-flex items-center gap-2 bg-white border-2 border-zinc-900 rounded-2xl px-5 py-3 mb-3">
        <span className="text-3xl">{primaryTypeDetail.emoji}</span>
        <span className="text-xl font-bold text-zinc-900">{primaryTypeDetail.name}</span>
      </div>
      <p className="text-sm text-zinc-500 leading-relaxed px-4">
        {primaryTypeDetail.strengthSummary}
      </p>
    </section>
  );
}
