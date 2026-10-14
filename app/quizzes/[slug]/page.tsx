import { notFound } from "next/navigation";
import QuizFlow from "@/components/quiz/quiz-flow";
import seedData from "@/seed.json";

type SeedQuestion = {
  question: {
    type?: number;
    description: string;
    explanation: string;
  };
  answers: Array<{
    value: string;
    isCorrect: boolean;
  }>;
};

type SeedQuiz = {
  id: number;
  title: string;
  duration: number;
  questions: SeedQuestion[];
};

const quizzes = seedData as SeedQuiz[];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateStaticParams() {
  return quizzes.map((quiz) => ({ slug: slugify(quiz.title) }));
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const normalizedSlug = slug.trim().toLowerCase();
  const quiz = quizzes.find(
    (item) =>
      slugify(item.title) === normalizedSlug || String(item.id) === normalizedSlug,
  );

  if (!quiz) {
    notFound();
  }

  return <QuizFlow quiz={quiz} />;
}
