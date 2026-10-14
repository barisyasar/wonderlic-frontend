import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const componentPath = path.resolve(process.cwd(), 'components/quiz/quiz-flow.tsx');

test('results screen should display the elapsed time spent on the quiz', () => {
  const source = readFileSync(componentPath, 'utf8');
  assert.match(source, /Time spent/i, 'Expected the results screen to include a time spent label');
});
