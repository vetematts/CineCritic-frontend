import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signupRequest } from '../api/auth';
import { loginRequest } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

// Make the form a flex-container
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  // Add spacing between the labels and inputs
  gap: 1.25rem;

  // Make the form 100% the width of the login div container
  // but capped at 24rem
  width: 100%;
  max-width: 24rem;
`;

// Give the labels a grayish white colour
const StyledSignupLabels = styled.label`
  color: #cec8c8ff;
`;

// Add visual interest to the login input fields
const StyledInput = styled.input`
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(204, 204, 204, 0.5);
`;

// Give the error message a salmon pink appearance
const StyledError = styled.p`
  color: #ffb4a2;
`;

// Add space above the signup button and the bottom of the signup form
const StyledSignupButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.1s ease;

  // Space the signup button from the password input
  margin: 2rem 0 0 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function SignupForm() {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" />;

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      await signupRequest({ username, email, password });

      const data = await loginRequest({ email, password });
      if (!data?.token) {
        throw new Error('Invalid login response');
      }

      login({ token: data.token });
      navigate('/');
    } catch (error) {
      setMessage(error?.error || error?.message || 'Signup failed');
    }
  };

  return (
    <StyledForm onSubmit={handleSignupSubmit}>
      <StyledSignupLabels htmlFor="enter-signup-username">Username</StyledSignupLabels>
      <StyledInput
        id="enter-signup-username"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter your username"
        required
      />
      <StyledSignupLabels htmlFor="enter-signup-email">Email</StyledSignupLabels>
      <StyledInput
        id="enter-signup-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        required
      />
      <StyledSignupLabels htmlFor="enter-signup-password">Password</StyledSignupLabels>
      <StyledInput
        id="enter-signup-password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter your password"
        required
      />
      {message && <StyledError>{message}</StyledError>}
      <StyledSignupButton type="submit">Create account</StyledSignupButton>
    </StyledForm>
  );
}
