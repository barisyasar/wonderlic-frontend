import type { MetadataRoute } from "next";
import { fetchQuizList, slugify } from "@/lib/quiz-api";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const quizzes = await fetchQuizList();

  return [
    {
      url: siteUrl.toString(),
    },
    ...quizzes.map((quiz) => ({
      url: new URL(`/quizzes/${slugify(String(quiz.quizId))}`, siteUrl).toString(),
    })),
  ];
}
