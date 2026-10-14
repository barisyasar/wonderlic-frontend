import assert from 'node:assert/strict';
import { accessSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const routePath = path.join(rootDir, 'app', 'quizzes', '[slug]', 'page.tsx');
const seedPath = path.join(rootDir, 'seed.json');

test('quiz route should exist for slug-based demo flow', () => {
  assert.doesNotThrow(() => accessSync(routePath), 'Expected app/quizzes/[slug]/page.tsx to exist');
});

test('seed data should include a demo quiz with single and multi-select questions', () => {
  const seed = JSON.parse(readFileSync(seedPath, 'utf8'));
  assert.ok(Array.isArray(seed), 'seed data should be an array');
  assert.equal(seed[0]?.title, 'Demo');
  const questionTypes = seed[0]?.questions?.map((item) => item.question?.type ?? 0);
  assert.ok(questionTypes.includes(0), 'seed data should include single-select question type');
  assert.ok(questionTypes.includes(1), 'seed data should include multi-select question type');
});
