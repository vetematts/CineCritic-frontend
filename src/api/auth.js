import { post } from './api';

// Login request helper for the users login endpoint.
export const loginRequest = async ({ email, username, password }) => {
  const response = await post('/api/users/login', {
    email,
    username,
    password,
  });

  return response;
};

// Logout helper for the users logout endpoint.
export const logoutRequest = async () => post('/api/users/logout');

// Signup helper for the users create endpoint.
export const signupRequest = async ({ username, email, password }) =>
  post('/api/users', { username, email, password });
