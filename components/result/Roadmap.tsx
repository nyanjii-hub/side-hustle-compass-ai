// components/result/Roadmap.tsx
interface Props {
  days: string[];
}

export function Roadmap({ days }: Props) {
  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">7日間ロードマップ</h2>
      <div className="space-y-3">
        {days.map((action, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="text-xs font-bold text-zinc-400 pt-0.5 w-10 shrink-0">
              Day {i + 1}
            </span>
            <p className="text-sm text-zinc-700 leading-relaxed">{action}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
