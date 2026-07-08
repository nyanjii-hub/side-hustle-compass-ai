// components/diagnosis/OptionCard.tsx
import type { AnswerOption } from "@/lib/types";

interface Props {
  option: AnswerOption;
  selected: boolean;
  onClick: () => void;
  isMultiSelect?: boolean;
}

export function OptionCard({ option, selected, onClick, isMultiSelect }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm leading-snug transition-all active:scale-[0.98] ${
        selected
          ? "border-emerald-600 bg-emerald-600 text-white"
          : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
      }`}
    >
      <span className="flex items-center gap-2">
        {isMultiSelect && (
          <span
            className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
              selected ? "border-white bg-white" : "border-zinc-300"
            }`}
          >
            {selected && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        )}
        <span>{option.text}</span>
      </span>
    </button>
  );
}
