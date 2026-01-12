import { beforeEach, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../src/components/LoginForm";
import { AuthProvider } from "../src/contexts/AuthContext";
import { loginRequest } from "../src/api/auth";
import { get } from "../src/api/api";

vi.mock("../src/api/auth", () => ({
  loginRequest: vi.fn(),
}));

vi.mock("../src/api/api", () => ({
  get: vi.fn(),
}));

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </MemoryRouter>,
  );

beforeEach(() => {
  localStorage.clear();
  loginRequest.mockReset();
  get.mockReset();
});

test("renders login inputs and submit button", () => {
  renderLogin();

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
});

test("submits login credentials and stores token", async () => {
  loginRequest.mockResolvedValue({ token: "test-token" });
  get.mockResolvedValue({ id: 1, username: "testuser" });

  renderLogin();

  await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
  await userEvent.type(screen.getByLabelText(/username/i), "testuser");
  await userEvent.type(screen.getByLabelText(/password/i), "secret123");
  await userEvent.click(screen.getByRole("button", { name: /log in/i }));

  await waitFor(() => {
    expect(loginRequest).toHaveBeenCalledWith({
      email: "test@example.com",
      username: "testuser",
      password: "secret123",
    });
  });
});
