// components/diagnosis/QuestionCard.tsx
"use client";
import { useState } from "react";
import type { Question, UserAnswer } from "@/lib/types";
import { OptionCard } from "./OptionCard";

interface Props {
  question: Question;
  previousAnswer?: UserAnswer;
  onSelect: (optionIds: string[]) => void;
  isLast: boolean;
}

export function QuestionCard({ question, previousAnswer, onSelect, isLast }: Props) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(previousAnswer?.selectedOptionIds ?? [])
  );

  function handleOptionClick(optionId: string) {
    if (!question.multiSelect) {
      onSelect([optionId]);
      return;
    }
    const next = new Set(selected);
    const noneId = question.options[question.options.length - 1].id; // "特になし"
    if (optionId === noneId) {
      next.clear();
      next.add(optionId);
    } else {
      next.delete(noneId);
      if (next.has(optionId)) next.delete(optionId);
      else next.add(optionId);
    }
    setSelected(next);
  }

  return (
    <div className="w-full max-w-lg">
      <p className="text-lg font-semibold text-zinc-800 mb-5 leading-relaxed">
        {question.text}
      </p>
      <div className="space-y-2.5">
        {question.options.map(option => (
          <OptionCard
            key={option.id}
            option={option}
            selected={selected.has(option.id)}
            onClick={() => handleOptionClick(option.id)}
          />
        ))}
      </div>
      {question.multiSelect && selected.size > 0 && (
        <div className="mt-6">
          <button
            onClick={() => onSelect([...selected])}
            className="w-full bg-zinc-900 text-white py-3.5 rounded-full font-semibold text-sm"
          >
            {isLast ? "結果を見る →" : "次へ →"}
          </button>
        </div>
      )}
    </div>
  );
}
