// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

// Styled components
export const StyledForm = styled.form`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  min-width: 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.5rem;
  }
`;

// Give the search bar a flat transparent rounded look
export const StyledSearchBar = styled.input`
  /* Flat colour with transparency */
  background-color: #5a5b5f;
  opacity: 0.6;

  /* Round the corners */
  border-radius: 10px; /* More pixel value for more roundness */
  border: 1px solid #ccc; /* Optional: Add a border for visibility */
  padding: 5px; /* Optional: Add padding so text doesn't touch the edges */

  min-width: 5rem;
  width: 30rem;
  max-width: 100%;
  flex: 1;
  color: #ffffff;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 0;
  }
`;

export const StyledSearchButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: #cec8c8ff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.35rem 0.7rem;
    width: 100%;
  }
`;