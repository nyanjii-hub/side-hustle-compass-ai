// components/diagnosis/OptionCard.tsx
import type { AnswerOption } from "@/lib/types";

interface Props {
  option: AnswerOption;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ option, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm leading-snug transition-all active:scale-[0.98] ${
        selected
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
      }`}
    >
      {option.text}
    </button>
  );
}
