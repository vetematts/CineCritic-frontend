// Import packages that allow for CSS styling to be applied to React elements
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 76%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

export const StyledHomeRow = styled.div`
  display: flex;
  flex: 1;

  &#home-search-bar {
    align-items: center;
    gap: 0.75rem;
    flex-wrap: nowrap;
    justify-content: center;

    @media (max-width: 768px) {
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }
`;

// Align the home logo container to centre the image
export const StyledFigure = styled.figure`
  // Figure is the flex container for the image
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

// Re-size the logo to be roughly 1/3rd to 1/4th of the screen
export const StyledHomeLogo = styled.img`
  // This takes shape according to the parent, the figure
  // container
  flex: 1;
  width: 100%;
  max-width: min(40vw, 420px);

  // Provide a bit of space between the logo and the search
  // bar
  padding: 0 0 2rem 0;
`;

// Style the advanced search button under the search bar
export const StyledAdvancedSearchButton = styled(NavLink)`
  color: #cec8c8ff;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

export const StyledDiscoverButton = styled(NavLink)`
  color: #cec8c8ff;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

export const StyledError = styled.p`
  color: #ffb4a2;
`;

export const StyledHomeHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 2rem;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 1.5rem;
    gap: 0.5rem;
  }
`;

export const StyledLoginLink = styled(NavLink)`
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
    gap: 0.4rem;
  }
`;

export const StyledAuthButton = styled.button`
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

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.35rem 0.7rem;
  }
`;

export const StyledDashboardLink = styled(NavLink)`
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;
