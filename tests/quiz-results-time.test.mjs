import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const componentPath = path.resolve(process.cwd(), 'components/quiz/quiz-flow.tsx');

describe('quiz results view', () => {
  it('should display the elapsed time spent on the quiz', () => {
    const source = readFileSync(componentPath, 'utf8');
    expect(source).toMatch(/Time spent/i);
  });
});
