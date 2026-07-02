// components/result/StrengthText.tsx
interface Props {
  text: string;
}

export function StrengthText({ text }: Props) {
  return (
    <section className="bg-blue-50 rounded-2xl p-5">
      <h2 className="text-base font-bold text-zinc-800 mb-2">無意識にできていること</h2>
      <p className="text-zinc-700 text-sm leading-relaxed">{text}</p>
    </section>
  );
}
