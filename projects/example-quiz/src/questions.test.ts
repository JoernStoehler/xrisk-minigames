import { expect, test } from "vitest";
import { questions } from "./questions";

test("has 5 questions", () => {
  expect(questions).toHaveLength(5);
});

test("each question has 4 choices and a valid correctIndex", () => {
  for (const q of questions) {
    expect(q.choices).toHaveLength(4);
    expect(q.correctIndex).toBeGreaterThanOrEqual(0);
    expect(q.correctIndex).toBeLessThan(4);
    expect(q.explanation.length).toBeGreaterThan(0);
  }
});
