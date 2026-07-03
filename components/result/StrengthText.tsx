// components/result/StrengthText.tsx
interface Props {
  text: string;
}

export function StrengthText({ text }: Props) {
  const paragraphs = text.split("\n\n").filter(Boolean);
  return (
    <section className="bg-blue-50 rounded-2xl p-5">
      <h2 className="text-base font-bold text-zinc-800 mb-3">無意識にできていること</h2>
      <div className="space-y-2">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-zinc-700 text-sm leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}
