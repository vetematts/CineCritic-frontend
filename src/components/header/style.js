// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';
import { NavLink } from 'react-router';

// Create a responsive header that doesn't wrap and maintains its shape
// This is the flex container parent
export const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  // Give the header an actual width so the flex children
  // have something to reference to
  width: 76%; // This is taking 76% of the root containers width
  max-width: 100%;
  box-sizing: border-box;

  // Place a small gap between each item in the navbar
  gap: 2rem;

  // Add space between the header and the main body
  margin: 0 auto 3rem auto;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0 1rem;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
    padding: 0 1rem;
    gap: 1rem;
    margin: 0 0 2rem 0;
  }
`;

// These are the flex items within the flex container "Header"
export const StyledHeaderColumns = styled.div`
  flex: 0 1 auto;
  min-width: 0;

  &#site-logo {
    flex: 0 0 auto;
  }

  &#header-search-bar {
    // Make this item fill up the rest of the container
    flex: 1 1 auto;
    min-width: 200px;
    max-width: 100%;
  }

  &#user-menu {
    flex: 0 0 auto;
    margin-left: auto;
  }

  @media (max-width: 1024px) {
    &#site-logo {
      flex: 0 0 auto;
    }

    &#header-search-bar {
      flex: 1 1 100%;
      min-width: 0;
      order: 3;
      width: 100%;
      margin-top: 1rem;
    }

    &#user-menu {
      flex: 0 0 auto;
      margin-left: 0;
    }
  }

  @media (max-width: 768px) {
    &#site-logo {
      flex: 0 0 auto;
    }

    &#header-search-bar {
      flex-basis: 100%;
      order: 3;
      width: 100%;
      margin-top: 1rem;
    }

    &#user-menu {
      flex: 0 0 auto;
      margin-left: auto;
    }
  }
`;

// Small icon that will grow and shrink with the rest of the header
export const StyledLogo = styled.img`
  height: 48px;
  width: auto;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

export const StyledLogoLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;

  &:hover ${StyledLogo} {
    transform: translateY(-1px);
    filter: brightness(1.05);
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

export const StyledAuthLink = styled(NavLink)`
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

export const StyledProfileLink = styled(NavLink)`
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
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
    // Hide "Profile" text on very small screens, show only icon
    span {
      display: none;
    }
  }
`;

export const StyledUserMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;