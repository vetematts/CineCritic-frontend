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
      <label>
        Username
      </label>
      <StyledInput
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter your username"
        required
      />
      <label>
        Email
      </label>
      <StyledInput
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        required
      />
      <label>
        Password
      </label>
      <StyledInput
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter your password"
        required
      />
      {message && <StyledError>{message}</StyledError>}
      <button type="submit">Create account</button>
    </StyledForm>
  );
}
