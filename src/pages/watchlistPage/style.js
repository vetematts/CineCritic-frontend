// Import packages that allow for CSS styling to be applied to React elements
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Container for watchlist content
export const StyledWatchlistContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.87);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

// Page title styling
export const StyledPageTitle = styled.h1`
  color: rgba(255, 255, 255, 0.95);
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 2rem 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

// Error message styling
export const StyledError = styled.p`
  color: #ffb4a2;
  margin: 0.5rem 0;
`;

// Empty state message styling
export const StyledEmptyMessage = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 1rem 0;
`;

// Styled link for watchlist items
export const StyledWatchlistLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

// Styled components for watchlist display
export const StyledWatchlistItem = styled.li`
  padding: 1.25rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StyledWatchlistPoster = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 80px;
    height: 120px;
  }
`;

export const StyledWatchlistPosterPlaceholder = styled.div`
  width: 100px;
  height: 150px;
  background-color: #5a5b5f;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 0.8em;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 80px;
    height: 120px;
  }
`;

export const StyledWatchlistList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Movie title styling
export const StyledMovieTitle = styled.div`
  color: rgba(255, 255, 255, 0.87);

  strong {
    color: rgba(255, 255, 255, 0.95);
    font-weight: 600;
    font-size: 1.1rem;
  }

  // Year styling
  color: rgba(255, 255, 255, 0.7);
`;