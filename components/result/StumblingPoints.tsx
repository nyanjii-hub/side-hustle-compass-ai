// components/result/StumblingPoints.tsx
import type { StumblingPoint } from "@/lib/types";

interface Props {
  points: [StumblingPoint, StumblingPoint];
}

export function StumblingPoints({ points }: Props) {
  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">最初に詰まりやすいポイント</h2>
      <div className="space-y-2.5">
        {points.map((point, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-zinc-100">
            <div className="flex items-start gap-2 mb-1.5">
              <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-2 py-0.5 rounded shrink-0 mt-px">
                不安
              </span>
              <p className="text-xs font-semibold text-zinc-700 leading-snug">{point.worry}</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded shrink-0 mt-px">
                対処
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed">{point.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
