import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signupRequest } from '../api/auth';
import { loginRequest } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 24rem;
`;

const StyledInput = styled.input`
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(204, 204, 204, 0.5);
`;

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
        <StyledInput
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your username"
          required
        />
      </label>
      <label>
        Email
        <StyledInput
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
        />
      </label>
      <label>
        Password
        <StyledInput
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
        />
      </label>
      {message && <StyledError>{message}</StyledError>}
      <button type="submit">Create account</button>
    </StyledForm>
  );
}
