// Import packages that enable state tracking and
// redirecting users to pages
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Import authorisation security functions
import { signupRequest } from '../../api/auth';
import { loginRequest } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext';

// Import the signup form css styling
import {
  StyledError,
  StyledForm,
  StyledInput,
  StyledSignupButton,
  StyledSignupLabels,
} from './style';

export function SignupForm() {
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
