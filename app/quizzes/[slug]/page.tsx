import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuizFlow from "@/components/quiz/quiz-flow";
import { fetchQuizBySlug, fetchQuizList, slugify } from "@/lib/quiz-api";
import { siteUrl } from "@/lib/seo";

export const revalidate = false;

export async function generateStaticParams() {
  const quizzes = await fetchQuizList();

  return quizzes.map((quiz) => ({ slug: slugify(String(quiz.quizId)) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = await fetchQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  const durationMinutes = Math.max(1, Math.ceil(quiz.duration / 60));
  const title = `${quiz.title} Practice Quiz | Wonderlic`;
  const description = `Practice with the ${quiz.title} quiz: ${quiz.questionLength} questions and a ${durationMinutes}-minute time limit. Start your free Wonderlic practice now.`;

  return {
    title,
    description,
    alternates: {
      canonical: new URL(`/quizzes/${slug}`, siteUrl).toString(),
    },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: "Wonderlic",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
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
