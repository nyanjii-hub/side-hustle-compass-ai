// components/result/TenMinuteMission.tsx
import type { TenMinuteMission as TenMinuteMissionData } from "@/lib/types";

interface Props {
  mission: TenMinuteMissionData;
}

export function TenMinuteMission({ mission }: Props) {
  return (
    <section id="mission" className="bg-emerald-900 text-white rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold bg-emerald-700 px-2.5 py-1 rounded-full tracking-wide">
          今日の10分ミッション
        </span>
      </div>
      <h2 className="text-sm font-bold text-emerald-50 mb-4 leading-snug">
        {mission.title}
      </h2>
      <div className="space-y-3">
        {mission.steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-5 h-5 bg-emerald-700 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-xs text-emerald-100 leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-emerald-500 mt-4 pt-3 border-t border-emerald-700 leading-relaxed">
        登録・応募・購入は不要です。まず「見るだけ」「メモするだけ」から始めてください。
      </p>
    </section>
  );
}
