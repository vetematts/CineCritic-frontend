// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Handles the redirection to other pages
import { NavLink } from 'react-router'; // Handles the redirection to other pages

// Individual review card container
export const StyledReviewCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.25rem;
`;

export const StyledTitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline-block;
  margin-bottom: 0.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledTitle = styled.h3`
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.25rem;
  font-weight: 600;
`;

export const StyledYear = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  font-weight: 400;
`;

// Author name display
export const StyledAuthorLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  margin: 0;
  transition: color 0.2s ease, font-weight 0.2s ease;

  &:hover {
    color: #ffffff;
    font-weight: 600;
  }
`;

export const StyledAuthorText = styled.span`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1;
`;

// Author line with rating
export const StyledAuthorLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.5rem 0 0.25rem 0;
`;

// Rating container (when no author shown)
export const StyledRatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

// Review date
export const StyledDate = styled.p`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  margin: 0.25rem 0 0.5rem 0;
`;

// Review text content
export const StyledReviewText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.87);
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

// Action buttons container
export const StyledActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const StyledActionButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  height: auto;
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
`;
