// Import packages that allow for CSS styling to be applied to React elements
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Container for all reviews
export const StyledReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

// Individual review row (poster + review card)
export const StyledReviewRow = styled.div`
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  grid-template-areas: 'poster card';
  column-gap: 1.5rem;
  row-gap: 0.75rem;
  align-items: ${(props) => (props.$alignCenter ? 'center' : 'start')};
  justify-items: start;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 130px minmax(0, 1fr);
    column-gap: 1rem;
    row-gap: 0.6rem;
    max-width: 520px;
    margin: 0 auto;
  }

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'poster'
      'card';
    justify-items: center;
    row-gap: 0.75rem;
  }
`;

// Poster column
export const StyledPosterColumn = styled.div`
  grid-area: poster;
  flex-shrink: 0;
  align-self: ${(props) => (props.$alignCenter ? 'center' : 'start')};
  justify-self: start;

  @media (max-width: 768px) {
    align-self: center;
  }

  @media (max-width: 520px) {
    justify-self: center;
  }
`;

export const StyledPosterLink = styled(Link)`
  display: block;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.45);
  }
`;

export const StyledPosterWrapper = styled.div`
  display: block;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.45);
  }
`;

export const StyledPosterFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.5));
`;

export const StyledPoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const StyledPosterPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

// Review content column
export const StyledReviewColumn = styled.div`
  grid-area: card;
  flex: 1;
  min-width: 0;
  align-self: start;
  justify-self: stretch;
  width: 100%;
`;

export const StyledEmptyMessage = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 1rem 0;
  font-style: italic;
`;

export const StyledError = styled.p`
  color: #ffb4a2;
  margin: 1rem 0;
`;

export const StyledLoadingText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 1rem 0;
`;

export const StyledViewAllRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

export const StyledViewAllLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  padding-bottom: 2px;
  font-size: 0.95rem;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.6);
  }
`;

// Edit Modal Styles
export const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

export const StyledModal = styled.div`
  background-color: #1a1a1a;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const StyledModalTitle = styled.h3`
  margin: 0;
  color: #cec8c8ff;
  font-size: 1.5rem;
`;

export const StyledCloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const StyledModalContent = styled.div`
  padding: 1.5rem;
`;

export const StyledModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledModalLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #cec8c8ff;
  font-size: 1rem;
`;

export const StyledModalTextarea = styled.textarea`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.87);
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const StyledModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const StyledModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledSubmitButton = styled(StyledModalButton)`
  background-color: #cec8c8ff;
  color: #242424;
  border: 1px solid #cec8c8ff;

  &:hover:not(:disabled) {
    background-color: #d6d0d0;
    border-color: #d6d0d0;
  }
`;

export const StyledCancelButton = styled(StyledModalButton)`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

export const StyledEditingMovieInfo = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const StyledEditingMovieTitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.1rem;
  font-weight: 500;
`;
