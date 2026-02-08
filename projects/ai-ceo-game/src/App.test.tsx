import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders dashboard", () => {
  render(<App />);
  expect(screen.getByText(/OpenAI/)).toBeDefined();
});
