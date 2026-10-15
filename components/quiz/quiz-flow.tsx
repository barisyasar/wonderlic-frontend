"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import SiteHeader from "@/components/landing/site-header";
import { MarkdownContent } from "@/components/quiz/markdown-content";

type QuizAnswer = {
  value: string;
  isCorrect: boolean;
};

type QuizQuestion = {
  question: {
    type?: number;
    description: string;
    explanation: string;
  };
  answers: QuizAnswer[];
};

type QuizRecord = {
  id: number;
  title: string;
  duration: number;
  questions: QuizQuestion[];
};

type Step = "ready" | "quiz" | "result";

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function getCorrectAnswers(question: QuizQuestion) {
  return question.answers
    .filter((answer) => answer.isCorrect)
    .map((answer) => answer.value);
}

function QuizIntro({
  quiz,
  onStart,
}: {
  quiz: QuizRecord;
  onStart: () => void;
}) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl items-center justify-center py-12 px-5">
        <div className="w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_60px_-28px_rgba(15,23,42,0.28)]">
          <div className="border-b border-slate-200 bg-gradient-to-r from-[#eff6ff] via-white to-[#f8fbff] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-900">
                  {quiz.title}
                </h1>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm">
                <Clock3 className="size-4 text-blue-600" />
                <span className="font-medium">{formatDuration(quiz.duration)}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-slate-500">Ready to begin?</p>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Work through the seeded questions at your own pace and review the explanation after each round.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Clock3 className="size-4 text-blue-600" />
                <span className="text-sm font-semibold text-slate-800">Quiz summary</span>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between gap-3">
                  <span>Duration</span>
                  <strong className="text-slate-900">{formatDuration(quiz.duration)}</strong>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Questions</span>
                  <strong className="text-slate-900">{quiz.questions.length}</strong>
                </div>
              </div>
            </div>
          </div>


            <Button
              className="h-12 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-500"
              onClick={onStart}
            >
              Begin quiz
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

function QuestionOption({
  answer,
  checked,
  onSelect,
}: {
  answer: string;
  checked: boolean;
  onSelect: () => void;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={checked}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={[
        "flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200",
        checked
          ? "border-blue-500 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-100"
          : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-slate-50",
      ].join(" ")}
    >
      <Checkbox checked={checked} className={checked ? "border-blue-600 bg-blue-600 text-white" : ""} />
      <span className="flex-1 text-sm font-medium sm:text-[15px]">{answer}</span>
    </div>
  );
}

export default function QuizFlow({ quiz }: { quiz: QuizRecord }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("ready");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({});
  const [timerLeft, setTimerLeft] = useState(quiz.duration);

  const currentEntry = quiz.questions[currentIndex] ?? quiz.questions[0];
  const currentQuestion = currentEntry;
  const currentOriginalIndex = currentIndex;
  const questionType = currentQuestion?.question.type ?? 0;
  const currentSelection = selectedAnswers[currentOriginalIndex] ?? [];
  const isCurrentQuestionAnswered =
    questionType === 1 ? currentSelection.length > 0 : currentSelection.length === 1;

  const score = useMemo(() => {
    return quiz.questions.reduce((total, questionItem, index) => {
      const selected = selectedAnswers[index] ?? [];
      const correct = getCorrectAnswers(questionItem).slice().sort();
      const submitted = [...selected].sort();
      return total + Number(JSON.stringify(submitted) === JSON.stringify(correct));
    }, 0);
  }, [quiz.questions, selectedAnswers]);

  const totalQuestions = quiz.questions.length;
  const accuracy = totalQuestions === 0 ? 0 : Math.round((score / totalQuestions) * 100);
  const timeSpent = useMemo(() => Math.max(0, quiz.duration - timerLeft), [quiz.duration, timerLeft]);

  useEffect(() => {
    if (step !== "quiz") return;

    const interval = setInterval(() => {
      setTimerLeft((previous) => {
        if (previous <= 1) {
          clearInterval(interval);
          setStep("result");
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  const handleOptionToggle = (value: string) => {
    if (questionType === 0) {
      setSelectedAnswers((previous) => ({
        ...previous,
        [currentOriginalIndex]: [value],
      }));
      return;
    }

    setSelectedAnswers((previous) => {
      const existing = previous[currentOriginalIndex] ?? [];
      const next = existing.includes(value)
        ? existing.filter((item) => item !== value)
        : [...existing, value];

      return {
        ...previous,
        [currentOriginalIndex]: next,
      };
    });
  };

  const handleNext = () => {
    if (!isCurrentQuestionAnswered) return;

    if (currentIndex >= totalQuestions - 1) {
      setStep("result");
      return;
    }

    setCurrentIndex((index) => index + 1);
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      setStep("ready");
      return;
    }

    setCurrentIndex((index) => Math.max(index - 1, 0));
  };

  const resetQuiz = () => {
    setStep("ready");
    setCurrentIndex(0);
    setSelectedAnswers({});
    setTimerLeft(quiz.duration);
  };

  const handleQuitQuiz = () => {
    router.push("/");
  };

  if (step === "ready") {
    return (
      <QuizIntro
        quiz={quiz}
        onStart={() => setStep("quiz")}
      />
    );
  }

  if (step === "quiz") {
    if (!currentQuestion) {
      return null;
    }

    return (
      <>
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-5xl justify-center px-5 py-12">
          <Card className="w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_60px_-28px_rgba(15,23,42,0.28)] pt-0">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-900">{quiz.title}</span>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-700">
                    {currentIndex + 1} / {totalQuestions}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 rounded-xl border-slate-200 bg-white px-3 text-xs font-medium text-slate-700"
                    onClick={handleQuitQuiz}
                  >
                    <XCircle className="mr-1.5 size-3.5" />
                    Quit quiz
                  </Button>
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                    <Clock3 className="size-4 text-blue-600" />
                    <span className="font-medium text-slate-700">{formatDuration(timerLeft)}</span>
                  </div>
                </div>
              </div>
            </div>

            <CardHeader className="border-b border-slate-200 bg-slate-50 px-6 pb-5 sm:px-8">
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / Math.max(totalQuestions, 1)) * 100}%` }}
              />
            </div>
            </CardHeader>

            <CardContent className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="mb-5 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-700">
              Question {currentIndex + 1}
            </div>

            <div className="space-y-4 text-[15px] leading-8 text-slate-700">
              <MarkdownContent>{currentQuestion.question.description}</MarkdownContent>
            </div>

            <div className="mt-6 space-y-3">
              {currentQuestion.answers.map((answer, answerIndex) => (
                <QuestionOption
                  key={`${answer.value}-${answerIndex}`}
                  answer={answer.value}
                  checked={currentSelection.includes(answer.value)}
                  onSelect={() => handleOptionToggle(answer.value)}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-5 flex-wrap">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-slate-200 bg-white px-4 text-sm font-medium text-slate-700"
                onClick={handleBack}
              >
                <ArrowLeft className="mr-2 size-4" />
                Back
              </Button>

              <Button
                type="button"
                className="h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-500"
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered}
              >
                {currentIndex === totalQuestions - 1 ? "See result" : "Next question"}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl justify-center px-5 py-12">
        <div className="w-full space-y-6">
          <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_60px_-28px_rgba(15,23,42,0.28)] pt-0">
            <CardHeader className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">Results</p>
                <CardTitle className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-900">
                  Quiz complete
                </CardTitle>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-right shadow-sm">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Score</p>
                <p className="text-2xl font-bold text-slate-900">
                  {score}/{totalQuestions}
                </p>
              </div>
            </div>
            </CardHeader>

            <CardContent className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
            <div className="grid gap-5 md:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Accuracy</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{accuracy}%</p>
              </div>
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-green-700">Correct</p>
                <p className="mt-2 text-2xl font-bold text-green-900">{score}</p>
              </div>
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-red-700">Incorrect</p>
                <p className="mt-2 text-2xl font-bold text-red-900">{totalQuestions - score}</p>
              </div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-violet-700">Time spent</p>
                <p className="mt-2 text-2xl font-bold text-violet-900">{formatDuration(timeSpent)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-slate-200 bg-white px-5 text-sm font-medium text-slate-700"
                onClick={resetQuiz}
              >
                <RotateCcw className="mr-2 size-4" />
                Restart
              </Button>
            </div>
          </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_60px_-28px_rgba(15,23,42,0.28)] pt-0">
          <CardHeader className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
            <CardTitle className="text-xl font-bold text-slate-900">Answer review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 px-6 py-6 sm:px-8">
            {quiz.questions.map((questionItem, index) => {
              const selected = selectedAnswers[index] ?? [];
              const correct = getCorrectAnswers(questionItem);
              const isCorrect = JSON.stringify([...selected].sort()) === JSON.stringify([...correct].sort());

              return (
                <div
                  key={`${quiz.id}-review-${index}`}
                  className={[
                    "rounded-2xl border p-4",
                    isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50",
                  ].join(" ")}
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-900">Question {index + 1}</p>
                    <div className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-semibold">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="size-3.5 text-green-600" />
                          <span className="text-green-700">Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="size-3.5 text-red-600" />
                          <span className="text-red-700">Incorrect</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4 text-sm leading-7 text-slate-700">
                    <MarkdownContent>{questionItem.question.description}</MarkdownContent>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/70 bg-white/70 p-3">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Your answer
                      </p>
                      <p className="text-sm font-medium text-slate-800">
                        {selected.length > 0 ? selected.join(", ") : "No answer selected"}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/70 bg-white/70 p-3">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        Correct answer
                      </p>
                      <p className="text-sm font-medium text-slate-800">{correct.join(", ")}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-white/60 bg-white/80 p-3">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Explanation
                    </p>
                    <div className="space-y-4 text-sm leading-7 text-slate-700">
                      <MarkdownContent>{questionItem.question.explanation}</MarkdownContent>
                    </div>
                  </div>
                </div>
              );
            })}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
