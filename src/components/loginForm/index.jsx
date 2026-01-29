// Import packages that enable state tracking and
// redirecting users to pages
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Import the authorisation security features
import { loginRequest } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext';

// Import the login form css styling
import {
  StyledError,
  StyledForm,
  StyledInput,
  StyledLoginButton,
  StyledLoginLabels,
} from './style';

// The login input and submit button component
export function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
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
      const data = await loginRequest({ email, password });

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
      <StyledLoginLabels htmlFor="enter-login-email">Email</StyledLoginLabels>
      <StyledInput
        id="enter-login-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        required
      />
      <StyledLoginLabels htmlFor="enter-login-password">Password</StyledLoginLabels>
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
