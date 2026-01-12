import { beforeEach, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SignupForm from "../src/components/SignupForm";
import { AuthProvider } from "../src/contexts/AuthContext";
import { loginRequest, signupRequest } from "../src/api/auth";
import { get } from "../src/api/api";

vi.mock("../src/api/auth", () => ({
  loginRequest: vi.fn(),
  signupRequest: vi.fn(),
}));

vi.mock("../src/api/api", () => ({
  get: vi.fn(),
}));

const renderSignup = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <SignupForm />
      </AuthProvider>
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
  loginRequest.mockReset();
  signupRequest.mockReset();
  get.mockReset();
});

test("renders signup inputs and submit button", () => {
  renderSignup();

  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /create account/i })
  ).toBeInTheDocument();
});

test("submits signup details and logs in", async () => {
  signupRequest.mockResolvedValue({ id: 1 });
  loginRequest.mockResolvedValue({ token: "test-token" });
  get.mockResolvedValue({ id: 1, username: "newuser" });

  renderSignup();

  await userEvent.type(screen.getByLabelText(/username/i), "newuser");
  await userEvent.type(screen.getByLabelText(/email/i), "new@example.com");
  await userEvent.type(screen.getByLabelText(/password/i), "secret123");
  await userEvent.click(screen.getByRole("button", { name: /create account/i }));

  await waitFor(() => {
    expect(signupRequest).toHaveBeenCalledWith({
      username: "newuser",
      email: "new@example.com",
      password: "secret123",
    });
  });

  await waitFor(() => {
    expect(loginRequest).toHaveBeenCalledWith({
      email: "new@example.com",
      password: "secret123",
    });
  });
});
