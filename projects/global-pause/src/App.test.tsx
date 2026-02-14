import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders main menu with title", () => {
  render(<App />);
  expect(screen.getByText("THE PAUSE")).toBeDefined();
});

test("renders difficulty options", () => {
  render(<App />);
  expect(screen.getAllByText("Tutorial").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Normal").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Realistic").length).toBeGreaterThan(0);
});
