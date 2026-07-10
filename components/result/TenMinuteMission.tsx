// components/result/TenMinuteMission.tsx
import type { TenMinuteMission as TenMinuteMissionData } from "@/lib/types";
import { getService, getServiceUrl, isAffiliateLink } from "@/lib/external-services";

interface Props {
  mission: TenMinuteMissionData;
}

export function TenMinuteMission({ mission }: Props) {
  const service = mission.serviceId ? getService(mission.serviceId) : undefined;
  const affiliate = service ? isAffiliateLink(service) : false;

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
      <div className="mt-4 pt-3 border-t border-emerald-700">
        {service ? (
          <>
            <a
              href={getServiceUrl(service)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white text-emerald-900 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition-colors"
            >
              {service.linkLabel}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            {affiliate ? (
              <p className="text-[9px] text-emerald-400 mt-1.5 text-center">
                ※このリンクには広告を含みます。
              </p>
            ) : (
              <p className="text-[10px] text-emerald-500 mt-1.5 text-center">
                登録・応募・購入は不要です。まず「見るだけ」から始めてください。
              </p>
            )}
          </>
        ) : (
          <p className="text-[10px] text-emerald-500 leading-relaxed">
            登録・応募・購入は不要です。まず「見るだけ」「メモするだけ」から始めてください。
          </p>
        )}
      </div>
    </section>
  );
}
