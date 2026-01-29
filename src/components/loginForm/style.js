// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

// Make the form a flex-container
export const StyledForm = styled.form`
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
export const StyledInput = styled.input`
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(204, 204, 204, 0.5);
`;

// Give the error message a salmon pink appearance
export const StyledError = styled.p`
  color: #ffb4a2;
`;

// Give the labels a grayish white colour
export const StyledLoginLabels = styled.label`
  color: #cec8c8ff;
`;

// Add space above the login button and the bottom of the login form
export const StyledLoginButton = styled.button`
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

  // Space the login button from the password input
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