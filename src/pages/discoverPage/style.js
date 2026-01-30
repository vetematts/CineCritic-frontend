// Import packages that allow for CSS styling to be applied to React elements
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledDiscoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 76%;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const StyledTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const StyledTitle = styled.h2`
  margin: 0;
  color: #cec8c8ff;
  font-size: 1.6rem;
  letter-spacing: 0.02em;
`;

export const StyledSubtitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
`;

export const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const StyledLabel = styled.label`
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
`;

export const StyledSelect = styled.select`
  background-color: #ffffff;
  color: #242424;
  border-radius: 8px;
  padding: 0.35rem 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 0.9rem;
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1.1rem 0.85rem;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

export const StyledPosterLink = styled(NavLink)`
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

export const StyledPosterFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const StyledMovieTitle = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledRatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

export const StyledStarWrapper = styled.span`
  position: relative;
  width: 0.85rem;
  height: 0.85rem;
  display: inline-block;
`;

export const StyledStarBase = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: rgba(255, 255, 255, 0.18);
`;

export const StyledStarFill = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: #e9da57;
`;

export const StyledRatingText = styled.span`
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.75rem;
  margin-left: 0.2rem;
`;

export const StyledStatus = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 2rem 0;
`;

export const StyledError = styled.p`
  text-align: center;
  color: #ffb4a2;
  padding: 2rem 0;
`;

export const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0.5rem 0 1.5rem 0;
  flex-wrap: wrap;
`;

export const StyledPageButton = styled.button`
  padding: 0.35rem 0.75rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const StyledPageMeta = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
`;
