// Write your tests here
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AppFunctional from "../components/AppFunctional";

test("renders the correct coordinate text", () => {
  render(<AppFunctional />);
  const coordinateText = screen.getByText(/coordinates/i);
  expect(coordinateText).toBeInTheDocument();
});

test("renders the correct steps text", () => {
  render(<AppFunctional />);
  const stepsText = screen.getByText(/you moved/i);
  expect(stepsText).toBeInTheDocument();
});

test("typing on the input results in its value changing to the entered text", () => {
  render(<AppFunctional />);
  const input = screen.getByPlaceholderText("type email");
  fireEvent.change(input, { target: { value: "test@test.com" } });
  expect(input.value).toBe("test@test.com");
});

test("renders the correct message text", () => {
  render(<AppFunctional />);
  const messageText = screen.getByText(/message/i);
  expect(messageText).toBeInTheDocument();
});

test("renders the correct button texts", () => {
  render(<AppFunctional />);
  const leftButton = screen.getByText(/left/i);
  const upButton = screen.getByText(/up/i);
  const rightButton = screen.getByText(/right/i);
  const downButton = screen.getByText(/down/i);
  const resetButton = screen.getByText(/reset/i);

  expect(leftButton).toBeInTheDocument();
  expect(upButton).toBeInTheDocument();
  expect(rightButton).toBeInTheDocument();
  expect(downButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});
