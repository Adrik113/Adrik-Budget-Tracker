import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders budget tracker dashboard correctly", () => {
  render(<App />);

  // Target specific UI sections (not partial matches like /Income/i)
  expect(screen.getByRole("heading", { name: /income/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /expenses/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /remaining budget/i })).toBeInTheDocument();

  // Buttons (these are unique so safe)
  expect(screen.getByRole("button", { name: /add expense/i })).toBeInTheDocument();
});