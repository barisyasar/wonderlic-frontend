import { accessSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const routePath = path.join(rootDir, 'app', 'quizzes', '[slug]', 'page.tsx');
const seedPath = path.join(rootDir, 'seed.json');

describe('quiz route and seed data', () => {
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
