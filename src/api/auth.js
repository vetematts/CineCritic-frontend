import { post } from "./api";

// Login request helper for the users login endpoint.
export const loginRequest = async ({ email, username, password }) => {
  const response = await post("/api/users/login", {
    email,
    username,
    password,
  });

  return response;
};
