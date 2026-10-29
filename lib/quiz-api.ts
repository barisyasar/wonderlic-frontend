import seedData from "../seed.json";

const DEFAULT_API_BASE_URL = "http://localhost:5104";

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

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL ??
    DEFAULT_API_BASE_URL
  ).replace(/\/$/, "");
}

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

  const question = rawQuestion as Record<string, unknown>;
  const description = String(
    question.description ?? question.text ?? question.prompt ?? question.question ?? "",
  ).trim();

  if (!description) return null;

  const explanation = String(question.explanation ?? question.solution ?? question.answerExplanation ?? "").trim();
  const answers = normalizeAnswers(question.answers ?? question.options ?? question.choices ?? []);
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

  const rawQuestionCount = Array.isArray(quiz.questions) ? quiz.questions.length : 0;
  const questions = Array.isArray(quiz.questions)
    ? quiz.questions.map(normalizeQuestion).filter(Boolean) as QuizQuestion[]
    : [];

  const maybeId = quiz.quizId ?? quiz.id ?? quiz.slug ?? title;
  const questionLength = asNumber(
    quiz.questionLength ?? quiz.question_count ?? rawQuestionCount,
    rawQuestionCount,
  );

  return {
    quizId: String(maybeId),
    title,
    duration: asNumber(quiz.duration ?? quiz.durationSeconds ?? quiz.timeLimit ?? 0, 0),
    questionLength: Number.isFinite(questionLength) ? Math.max(0, questionLength) : rawQuestionCount,
    questions,
  };
}

function normalizeQuizList(payload: unknown): QuizRecord[] {
  if (Array.isArray(payload)) {
    return payload.map(normalizeQuiz).filter(Boolean) as QuizRecord[];
  }

  if (payload && typeof payload === "object") {
    const normalized = payload as Record<string, unknown>;
    for (const key of ["items", "quizzes", "data", "results", "value"]) {
      const value = normalized[key];
      if (Array.isArray(value)) {
        return value.map(normalizeQuiz).filter(Boolean) as QuizRecord[];
      }
    }
  }

  return [];
}

async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: false },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchQuizList(): Promise<QuizRecord[]> {
  const apiBaseUrl = getApiBaseUrl();

  try {
    const payload = await fetchJson(`${apiBaseUrl}/api/quizzes`);
    const quizzes = normalizeQuizList(payload).sort((a, b) => a.questionLength - b.questionLength);

    if (quizzes.length > 0) {
      return quizzes;
    }
  } catch {
    // Fall back to the local seed data if the backend is unavailable.
  }

  return normalizeQuizList(seedData as unknown[]).sort((a, b) => a.questionLength - b.questionLength);
}

export async function fetchQuizBySlug(slug: string): Promise<QuizRecord | null> {
  const cleanSlug = slug.trim();
  const apiBaseUrl = getApiBaseUrl();

  if (cleanSlug) {
    try {
      const payload = await fetchJson(`${apiBaseUrl}/api/quizzes/${encodeURIComponent(cleanSlug)}`);
      const quiz = normalizeQuiz(payload);
      if (quiz) {
        return quiz;
      }
    } catch {
      // If the ID lookup fails, fall back to the list endpoint and match by slug/title.
    }
  }

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
