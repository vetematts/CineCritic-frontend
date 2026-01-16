import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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

// Give the labels a grayish white colour
const StyledLoginLabels = styled.label`
  color: #cec8c8ff;
`;

// Add space above the login button and the bottom of the login form
const StyledLoginButton = styled.button`
  // Give the button a bit more meat  
  height: 2rem;

  // Space the login button from the password input
  margin: 2rem 0 0 0;
`;

// The login input and submit button component
export default function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Return the user home if logged in
  if (isAuthenticated) return <Navigate to="/" />;

  // Login Attempt
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const data = await loginRequest({ email, username, password });

      if (!data?.token) {
        throw new Error('Invalid login response');
      }

      login({ token: data.token });
      navigate('/');
    } catch (error) {
      setMessage(error?.error || error?.message || 'Login failed');
    }
  };

  return (
    <StyledForm onSubmit={handleLoginSubmit}>
      <StyledLoginLabels htmlFor="enter-login-email">
        Email
      </StyledLoginLabels>
      <StyledInput
          id="enter-login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />
      <StyledLoginLabels htmlFor="enter-login-username">
        Username
      </StyledLoginLabels>
      <StyledInput
          id="enter-login-username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your username"
        />
      <StyledLoginLabels htmlFor="enter-login-password">
        Password
      </StyledLoginLabels>
      <StyledInput
          id="enter-login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
        />
      {message && <StyledError>{message}</StyledError>}
      <StyledLoginButton type="submit">Log in</StyledLoginButton>
    </StyledForm>
  );
}