import { accessSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const routePath = path.join(rootDir, 'app', 'quizzes', '[slug]', 'page.tsx');
const seedPath = path.join(rootDir, 'seed.json');

describe('quiz route and seed data', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should exist for slug-based demo flow', () => {
    expect(() => accessSync(routePath)).not.toThrow();
  });

  it('should include a demo quiz with single and multi-select questions', () => {
    const seed = JSON.parse(readFileSync(seedPath, 'utf8'));

    expect(Array.isArray(seed)).toBe(true);
    expect(seed[0]?.title).toBe('Demo');

    const questionTypes = seed[0]?.questions?.map((item) => item.question?.type ?? 0);
    expect(questionTypes).toContain(0);
    expect(questionTypes).toContain(1);
  });

  it('should fetch quizzes from the configured backend API', async () => {
    const fetchMock = vi.fn(async (input) => {
      const url = String(input);

      if (url.endsWith('/api/quizzes')) {
        return {
          ok: true,
          json: async () => [
            {
              quizId: 'quiz-123',
              title: 'Backend Quiz',
              duration: 180,
              questions: [
                {
                  question: { description: 'What is 2 + 2?', explanation: 'It is 4.' },
                  answers: [
                    { value: '3', isCorrect: false },
                    { value: '4', isCorrect: true },
                  ],
                },
              ],
            },
          ],
        };
      }

      return { ok: true, json: async () => ({ quizId: 'quiz-123', title: 'Backend Quiz', duration: 180, questions: [] }) };
    });

    vi.stubGlobal('fetch', fetchMock);

    const { fetchQuizList, fetchQuizBySlug } = await import('../lib/quiz-api.ts');

    const quizzes = await fetchQuizList();
    const singleQuiz = await fetchQuizBySlug('backend-quiz');

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5104/api/quizzes', expect.objectContaining({ next: { revalidate: 60 } }));
    expect(quizzes[0]?.title).toBe('Backend Quiz');
    expect(singleQuiz?.quizId).toBe('quiz-123');
  });

  it('should normalize the real backend payload shape with questionId and answerId fields', async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      json: async () => ({
        quizId: '4187f8eb-1085-4032-9a45-1e238c62de9e',
        title: 'Quiz 1',
        duration: 720,
        questions: [
          {
            questionId: '5192053d-a28b-4b20-aee3-683b831f4109',
            description: 'A total of **96 hours** was spent training **8 new employees**.',
            explanation: '96 ÷ 8 = 12 hours per employee.',
            questionType: 0,
            answers: [
              { answerId: '1', description: '108', isCorrect: false },
              { answerId: '2', description: '72', isCorrect: true },
            ],
          },
        ],
      }),
    }));

    vi.stubGlobal('fetch', fetchMock);

    const { fetchQuizBySlug } = await import('../lib/quiz-api.ts');
    const quiz = await fetchQuizBySlug('4187f8eb-1085-4032-9a45-1e238c62de9e');

    expect(quiz?.quizId).toBe('4187f8eb-1085-4032-9a45-1e238c62de9e');
    expect(quiz?.questions[0]?.question.description).toContain('96 hours');
    expect(quiz?.questions[0]?.answers[1]?.value).toBe('72');
    expect(quiz?.questions[0]?.answers[1]?.isCorrect).toBe(true);
  });

  it('should expose a quit action while the quiz is in progress', () => {
    const source = readFileSync(path.join(rootDir, 'components', 'quiz', 'quiz-flow.tsx'), 'utf8');
    expect(source).toMatch(/Quit quiz|Quit/i);
  });

  it('should not nest a button inside another button', () => {
    const source = readFileSync(path.join(rootDir, 'components', 'quiz', 'quiz-flow.tsx'), 'utf8');

    expect(source).toMatch(/role="button"/i);
    expect(source).not.toMatch(/<button\s+type="button"\s+onClick=\{onSelect\}/i);
  });
});
