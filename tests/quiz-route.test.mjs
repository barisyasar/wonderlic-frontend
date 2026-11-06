import { accessSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const routePath = path.join(rootDir, 'app', 'quizzes', '[slug]', 'page.tsx');
const quizDataPath = path.join(rootDir, 'quizzes', 'quiz-0.json');

describe('quiz route and local quiz data', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should exist for slug-based demo flow', () => {
    expect(() => accessSync(routePath)).not.toThrow();
  });

  it('should include a local demo quiz with single and multi-select questions', () => {
    const quiz = JSON.parse(readFileSync(quizDataPath, 'utf8'));

    expect(quiz.title).toBe('Demo Quiz (5 mins - 12 Questions)');

    const questionTypes = quiz.questions?.map((item) => item.question?.type ?? 0);
    expect(questionTypes).toContain(0);
    expect(questionTypes).toContain(1);
  });

  it('should read quiz lists and details from local files without calling the backend', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const { fetchQuizList, fetchQuizBySlug } = await import('../lib/quiz-api.ts');

    const quizzes = await fetchQuizList();
    const demoQuiz = await fetchQuizBySlug('f4362406-7cc1-4da5-b16c-68bacfc8d45f');

    expect(quizzes).toHaveLength(6);
    expect(quizzes[0]?.title).toBe('Demo Quiz (5 mins - 12 Questions)');
    expect(quizzes[0]?.duration).toBe(300);
    expect(quizzes[0]?.questionLength).toBe(12);
    expect(quizzes[0]?.questions[0]?.question.description).toContain('96 hours');
    expect(demoQuiz?.quizId).toBe('f4362406-7cc1-4da5-b16c-68bacfc8d45f');
    expect(fetchSpy).not.toHaveBeenCalled();
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
