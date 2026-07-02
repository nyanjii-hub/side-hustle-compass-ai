// components/result/TraitTags.tsx
interface Props {
  labels: string[];
}

export function TraitTags({ labels }: Props) {
  return (
    <section>
      <h2 className="text-base font-bold text-zinc-800 mb-3">あなたの行動特性</h2>
      <div className="flex flex-wrap gap-2">
        {labels.map(label => (
          <span
            key={label}
            className="px-3 py-1.5 bg-white border border-zinc-200 rounded-full text-xs font-medium text-zinc-700"
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
