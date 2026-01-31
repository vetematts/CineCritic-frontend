// Import packages that allow for CSS styling to be applied to React elements
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const StyledContainer = styled.section`
  width: 100%;
  max-width: 100rem;
  padding: 1rem 0 2rem 0;
  color: rgba(255, 255, 255, 0.87);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Main flex container: poster column + text column
export const StyledMainContent = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

// Poster column (fixed width on left)
export const StyledPosterColumn = styled.div`
  flex-shrink: 0;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

// Text column (flex: 1, contains all text content)
export const StyledTextColumn = styled.div`
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
  }
`;

// Large poster for movie detail page
export const StyledPoster = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
`;

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

export const StyledSkeletonBlock = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.06) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

export const StyledSkeletonPoster = styled(StyledSkeletonBlock)`
  width: 100%;
  height: 450px;
  border-radius: 10px;
`;

export const StyledSkeletonTitle = styled(StyledSkeletonBlock)`
  height: 2.2rem;
  width: 60%;
  margin: 0 0 0.75rem 0;
  border-radius: 8px;
`;

export const StyledSkeletonLine = styled(StyledSkeletonBlock)`
  height: 0.9rem;
  width: ${({ $width }) => $width || '100%'};
  margin: 0.5rem 0;
  border-radius: 6px;
`;

export const StyledSkeletonPill = styled(StyledSkeletonBlock)`
  height: 2rem;
  width: 10rem;
  margin: 0.75rem 0;
  border-radius: 999px;
`;

export const StyledSkeletonMetaRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 0.75rem 0;
`;

// Placeholder for missing poster
export const StyledPosterPlaceholder = styled.div`
  width: 100%;
  height: 450px;
  background-color: #5a5b5f;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
`;

// Container for movie details (title, meta, overview)
export const StyledMovieDetails = styled.div`
  margin-bottom: 2rem;
  margin-top: 0;
`;

export const StyledTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const StyledHeading = styled.h3`
  color: #cec8c8ff;
`;

export const StyledParagraph = styled.p`
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledMeta = styled.p`
  margin: 0.25rem 0;
  color: #bdbdbd;
`;

export const StyledError = styled.p`
  color: #ffb4a2;
`;

// Prominent average rating display
export const StyledAverageRating = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.4rem 0.85rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const StyledAverageRatingLabel = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const StyledAverageRatingValue = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  font-weight: 600;
`;

export const StyledGenrePills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 1rem 0;
`;

export const StyledGenrePill = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 0.25rem 0.7rem;
  font-size: 0.8rem;
  letter-spacing: 0.02em;
`;

// Sign in prompt for rating
export const StyledSignInPrompt = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

export const StyledSignInText = styled.p`
  margin: 0 0 0.5rem 0;
  color: rgba(255, 255, 255, 0.7);
`;

export const StyledSignInLink = styled(Link)`
  color: #e9da57;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: #f5e866;
  }
`;

// Back to Home button
export const StyledBackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  margin-bottom: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.95);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.35rem 0.7rem;
  }
`;

// Meta info with icons
export const StyledMetaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin: 0.75rem 0;
`;

export const StyledMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

// Watchlist button
export const StyledWatchlistButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledFavouriteButton = styled(StyledWatchlistButton)``;

// Review Modal
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

export const StyledOpenReviewButton = styled.button`
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
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

export const StyledSignInReviewButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

export const StyledActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;
`;
