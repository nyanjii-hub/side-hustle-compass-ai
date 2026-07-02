// components/result/TodayAction.tsx
interface Props {
  action: string;
}

export function TodayAction({ action }: Props) {
  return (
    <section className="bg-zinc-900 text-white rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🎯</span>
        <h2 className="text-base font-bold">今日やること</h2>
      </div>
      <p className="text-zinc-100 text-sm leading-relaxed">{action}</p>
    </section>
  );
}
