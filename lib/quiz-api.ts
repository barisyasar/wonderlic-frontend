import quiz0 from "../quizzes/quiz-0.json";
import quiz1 from "../quizzes/quiz-1.json";
import quiz2 from "../quizzes/quiz-2.json";
import quiz3 from "../quizzes/quiz-3.json";
import quiz4 from "../quizzes/quiz-4.json";
import quiz5 from "../quizzes/quiz-5.json";

const localQuizData: unknown[] = [quiz0, quiz1, quiz2, quiz3, quiz4, quiz5];

export type QuizQuestion = {
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

export type QuizRecord = {
  quizId: string;
  title: string;
  duration: number;
  questionLength: number;
  questions: QuizQuestion[];
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function asNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeAnswers(rawAnswers: unknown): QuizQuestion["answers"] {
  if (!Array.isArray(rawAnswers)) return [];

  return rawAnswers
    .map((answer) => {
      if (!answer || typeof answer !== "object") return null;

      const candidate = answer as Record<string, unknown>;
      const value = String(
        candidate.value ??
          candidate.description ??
          candidate.text ??
          candidate.label ??
          candidate.answer ??
          "",
      ).trim();
      const isCorrect = Boolean(
        candidate.isCorrect ??
        candidate.correct ??
        candidate.is_correct ??
        candidate.correctAnswer ??
        candidate.isCorrectAnswer,
      );

      if (!value) return null;

      return { value, isCorrect };
    })
    .filter(Boolean) as QuizQuestion["answers"];
}

function normalizeQuestion(rawQuestion: unknown): QuizQuestion | null {
  if (!rawQuestion || typeof rawQuestion !== "object") return null;

  const entry = rawQuestion as Record<string, unknown>;
  const question =
    entry.question && typeof entry.question === "object"
      ? (entry.question as Record<string, unknown>)
      : entry;
  const description = String(
    question.description ??
      question.text ??
      question.prompt ??
      question.question ??
      "",
  ).trim();

  if (!description) return null;

  const explanation = String(
    question.explanation ??
      question.solution ??
      question.answerExplanation ??
      "",
  ).trim();
  const answers = normalizeAnswers(
    entry.answers ??
      question.answers ??
      question.options ??
      question.choices ??
      [],
  );
  const typeValue = question.questionType ?? question.type;

  return {
    question: {
      type: typeValue !== undefined ? Number(typeValue) : undefined,
      description,
      explanation,
    },
    answers,
  };
}

function normalizeQuiz(rawQuiz: unknown): QuizRecord | null {
  if (!rawQuiz || typeof rawQuiz !== "object") return null;

  const quiz = rawQuiz as Record<string, unknown>;
  const title = String(quiz.title ?? quiz.name ?? "").trim();

  if (!title) return null;

  const rawQuestionCount = Array.isArray(quiz.questions)
    ? quiz.questions.length
    : 0;
  const questions = Array.isArray(quiz.questions)
    ? (quiz.questions.map(normalizeQuestion).filter(Boolean) as QuizQuestion[])
    : [];

  const maybeId = quiz.quizId ?? quiz.id ?? quiz.slug ?? title;
  const questionLength = asNumber(
    quiz.questionLength ?? quiz.question_count ?? rawQuestionCount,
    rawQuestionCount,
  );

  return {
    quizId: String(maybeId),
    title,
    duration:
      quiz.duration !== undefined ||
      quiz.durationSeconds !== undefined ||
      quiz.timeLimit !== undefined
        ? asNumber(
            quiz.duration ?? quiz.durationSeconds ?? quiz.timeLimit,
            0,
          )
        : asNumber(quiz.durationMinutes, 0) * 60,
    questionLength: Number.isFinite(questionLength)
      ? Math.max(0, questionLength)
      : rawQuestionCount,
    questions,
  };
}

export async function fetchQuizList(): Promise<QuizRecord[]> {
  return localQuizData
    .map(normalizeQuiz)
    .filter((quiz): quiz is QuizRecord => quiz !== null)
    .sort((a, b) => a.questionLength - b.questionLength);
}

export async function fetchQuizBySlug(
  slug: string,
): Promise<QuizRecord | null> {
  const cleanSlug = slug.trim();
  const quizzes = await fetchQuizList();
  const target = slugify(cleanSlug);

  return (
    quizzes.find((quiz) => {
      const normalizedId = slugify(String(quiz.quizId));
      const normalizedTitle = slugify(quiz.title);
      return normalizedId === target || normalizedTitle === target;
    }) ?? null
  );
}
