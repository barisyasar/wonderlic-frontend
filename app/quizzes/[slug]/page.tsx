import { notFound } from "next/navigation";
import QuizFlow from "@/components/quiz/quiz-flow";
import { fetchQuizBySlug, fetchQuizList, slugify } from "@/lib/quiz-api";

export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  const quizzes = await fetchQuizList();

  return quizzes.map((quiz) => ({ slug: slugify(String(quiz.quizId)) }));
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = await fetchQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  return <QuizFlow quiz={quiz} />;
}
