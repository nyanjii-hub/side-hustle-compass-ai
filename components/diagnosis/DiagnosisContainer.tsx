// components/diagnosis/DiagnosisContainer.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { generateResult } from "@/lib/result-generator";
import type { UserAnswer } from "@/lib/types";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";

export function DiagnosisContainer() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleSelect(selectedOptionIds: string[]) {
    const newAnswers: UserAnswer[] = [
      ...answers.filter(a => a.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, selectedOptionIds },
    ];
    setAnswers(newAnswers);

    if (isLast) {
      const result = generateResult(newAnswers);
      localStorage.setItem("diagnosis_result", JSON.stringify(result));
      router.push("/result");
    } else {
      setCurrentIndex(i => i + 1);
    }
  }

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <ProgressBar current={currentIndex + 1} total={questions.length} />
      <div className="flex-1 flex items-start justify-center p-6 pt-10">
        <QuestionCard
          question={currentQuestion}
          previousAnswer={answers.find(a => a.questionId === currentQuestion.id)}
          onSelect={handleSelect}
          isLast={isLast}
        />
      </div>
      {currentIndex > 0 && (
        <div className="p-4 text-center">
          <button
            onClick={handleBack}
            className="text-xs text-zinc-400 underline underline-offset-2"
          >
            ← 前の質問に戻る
          </button>
        </div>
      )}
    </div>
  );
}
