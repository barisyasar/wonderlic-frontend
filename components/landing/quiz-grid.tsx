"use client";

import { ArrowUpRight, ClipboardList, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quizzes, type Quiz } from "./data";

function QuizIllustration({ kind }: { kind: Quiz["illustration"] }) {
  if (kind === "numbers")
    return (
      <div aria-hidden="true" className="quiz-art quiz-art-numbers">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  if (kind === "verbal")
    return (
      <div aria-hidden="true" className="quiz-art quiz-art-verbal">
        <span>Aa</span>
        <i />
        <i />
        <i />
      </div>
    );
  if (kind === "logical")
    return (
      <div aria-hidden="true" className="quiz-art quiz-art-logical">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  return (
    <div aria-hidden="true" className="quiz-art quiz-art-abstract">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Card className="quiz-card group rounded-[9px] border-[#e2e9f2] bg-white py-0 shadow-[0_3px_10px_-8px_#0b1f4470] transition duration-200 hover:-translate-y-0.5 hover:border-[#c7d7f2] hover:shadow-[0_12px_30px_-18px_#0b1f4460]">
      <div className="relative h-[136px] overflow-hidden border-b border-[#edf1f6] bg-[#f8faff]">
        <QuizIllustration kind={quiz.illustration} />
      </div>
      <CardHeader className="gap-2 px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-[16px] font-semibold text-[#0B1F44]">
            {quiz.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="flex items-center gap-4 border-t border-[#edf1f6] py-3 text-xs font-medium text-[#77859a]">
          <span className="inline-flex items-center gap-1.5">
            <Timer aria-hidden="true" className="size-3.5" /> {quiz.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClipboardList aria-hidden="true" className="size-3.5" />{" "}
            {quiz.questions}
          </span>
        </div>
        <Button
          className="h-10 w-full justify-between rounded-lg border-[#dce5f1] bg-white px-3.5 text-[13px] font-semibold text-[#155EEF] group-hover:border-[#155EEF] group-hover:bg-[#f6f9ff]"
          variant="outline"
          onClick={() => {
            window.location.href = "/quizzes/demo";
          }}
        >
          Start Quiz <ArrowUpRight aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function QuizGrid() {
  return (
    <section className="bg-[#f7f9fc] py-20 sm:py-24" id="quizzes">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#0B1F44] sm:text-[38px]">
              Free Quizzes
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#65758c]">
              Four ways to give your reasoning skills a workout. Details below
              are illustrative.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 pb-1 text-xs font-medium text-[#76849a]">
            <span className="size-2 rounded-full bg-[#2da56d]" /> No account
            needed to browse
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.title} quiz={quiz} />
          ))}
        </div>
      </div>
    </section>
  );
}
