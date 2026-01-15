import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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

// Give the labels a grayish white colour
const StyledLoginLabels = styled.label`
  color: #cec8c8ff;
`;

export default function LoginForm() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" />;

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
      <StyledLoginLabels>
        Email
      </StyledLoginLabels>
      <StyledInput
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />
      <StyledLoginLabels>
        Username
      </StyledLoginLabels>
      <StyledInput
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter your username"
        />
      <StyledLoginLabels>
        Password
      </StyledLoginLabels>
      <StyledInput
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
        />
      {message && <StyledError>{message}</StyledError>}
      <button type="submit">Log in</button>
    </StyledForm>
  );
}
