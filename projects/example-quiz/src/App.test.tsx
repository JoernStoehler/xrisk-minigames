import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders first question", () => {
  render(<App />);
  expect(screen.getByText("Question 1 of 5")).toBeDefined();
  expect(screen.getByText(/orthogonality thesis/i)).toBeDefined();
});

test("shows explanation after answering", () => {
  render(<App />);
  const buttons = screen.getAllByRole("button");
  fireEvent.click(buttons[1]); // correct answer
  expect(screen.getByText("Correct!")).toBeDefined();
  expect(screen.getByText("Next Question")).toBeDefined();
});

test("shows results after all questions", () => {
  render(<App />);
  for (let i = 0; i < 5; i++) {
    const choices = screen.getAllByRole("button");
    fireEvent.click(choices[0]); // answer (may or may not be correct)
    const next = screen.getByRole("button", {
      name: i < 4 ? "Next Question" : "See Results",
    });
    fireEvent.click(next);
  }
  expect(screen.getByText("Results")).toBeDefined();
  expect(screen.getByText("Try Again")).toBeDefined();
});
