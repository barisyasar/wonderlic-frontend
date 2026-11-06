import Link from "next/link";
import { ArrowUpRight, ClipboardList, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchQuizList, slugify, type QuizRecord } from "@/lib/quiz-api";

function formatDuration(seconds: number) {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.max(1, Math.ceil(safeSeconds / 60));
  return `${minutes} min`;
}

function QuizCard({ quiz }: { quiz: QuizRecord }) {
  return (
    <Card className="quiz-card group rounded-[9px] border-[#e2e9f2] bg-white py-0 shadow-[0_3px_10px_-8px_#0b1f4470] transition duration-200 hover:-translate-y-0.5 hover:border-[#c7d7f2] hover:shadow-[0_12px_30px_-18px_#0b1f4460]">
      <div className="relative h-[136px] overflow-hidden border-b border-[#edf1f6] bg-[#f8faff]">
        <div
          aria-hidden="true"
          className="flex h-full items-center justify-center text-3xl font-black tracking-[0.3em] text-[#cbd5e1]"
        >
          {quiz.title.slice(0, 2).toUpperCase()}
        </div>
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
            <Timer aria-hidden="true" className="size-3.5" />{" "}
            {formatDuration(quiz.duration)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClipboardList aria-hidden="true" className="size-3.5" />{" "}
            {quiz.questionLength} questions
          </span>
        </div>
        <Link
          href={`/quizzes/${slugify(String(quiz.quizId))}`}
          className="inline-flex h-10 w-full items-center justify-between rounded-lg border border-[#dce5f1] bg-white px-3.5 text-[13px] font-semibold text-[#155EEF] transition-colors group-hover:border-[#155EEF] group-hover:bg-[#f6f9ff]"
        >
          Start Quiz <ArrowUpRight aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}

export default async function QuizGrid() {
  const quizzes = await fetchQuizList();

  return (
    <section className="bg-[#f7f9fc] py-20 sm:py-24" id="quizzes">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#0B1F44] sm:text-[38px]">
              Free Quizzes
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#65758c]">
              Pick a quiz from the catalog and start practicing right away.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 pb-1 text-xs font-medium text-[#76849a]">
            <span className="size-2 rounded-full bg-[#2da56d]" /> No account
            needed to browse
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quizzes.length > 0 ? (
            quizzes
              .slice(1)
              .map((quiz) => <QuizCard key={String(quiz.quizId)} quiz={quiz} />)
          ) : (
            <div className="col-span-full rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              No quizzes are available right now.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
