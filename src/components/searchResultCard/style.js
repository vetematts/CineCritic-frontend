// Import packages that allow for CSS styling to be applied to React elements
import { NavLink } from 'react-router';
import styled from 'styled-components';

// Styled NavLink to remove default link styling and ensure proper layout
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  max-width: 100%;
`;

// Card container with proper constraints and responsive layout
export const StyledFilmCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  max-width: 100%;
  overflow: hidden;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  // On smaller screens, stack vertically
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Poster container with fixed dimensions
export const StyledFilmCardContents = styled.div`
  flex-shrink: 0;

  &#mini-movie-poster {
    width: 150px;
    height: 225px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }

    @media (max-width: 768px) {
      width: 120px;
      height: 180px;
    }
  }

  &#film-description {
    flex: 1;
    min-width: 0; // Important for text truncation
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h2 {
      margin: 0;
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.87);
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    h3 {
      margin: 0;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
      font-weight: normal;
    }

    p {
      margin: 0;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.4;
      // Limit description to 3-4 lines with ellipsis
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  }
`;