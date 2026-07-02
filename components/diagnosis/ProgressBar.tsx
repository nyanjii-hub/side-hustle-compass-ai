// components/diagnosis/ProgressBar.tsx
interface Props {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full px-4 pt-4 pb-3 bg-white border-b border-zinc-100">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
          <span>{current} / {total}問</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-900 rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
