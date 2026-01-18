// Import packages

// Import other components
import SearchBar from './SearchBar';
import { useAuth } from '../contexts/AuthContext';
import { logoutRequest } from '../api/auth';

// Import image assets
import logo from '../assets/cine_critic_logo_small.png';
import styled from 'styled-components';
import { NavLink } from 'react-router';

// Styled parts
// Create a responsive header that doesn't wrap and maintains its shape
// This is the flex container parent
const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-evenly;

  // Give the header an actual width so the flex children
  // have something to reference to
  width: 76%; // This is taking 76% of the root containers width

  // Place a small gap between each item in the navbar
  gap: 2rem;

  // Add space between the header and the main body
  margin: 0 0 3rem 0;
`;

// These are the flex items within the flex container "Header"
const StyledHeaderColumns = styled.div`
  flex: 1;

  &#header-search-bar {
    // Make this item fill up the rest of the container
    flex-basis: 100%;
  }
`;

// Small icon that will grow and shrink with the rest of the header
const StyledLogo = styled.img``;

const StyledAuthButton = styled.button`
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

const StyledAuthLink = styled(NavLink)`
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
`;

function Header() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Ignore network failures; local logout still proceeds.
    }
    logout();
  };

  return (
    <StyledHeader>
      <StyledHeaderColumns id="site-logo">
        <NavLink to="/">
          <StyledLogo src={logo} alt="CineCritic Logo" />
        </NavLink>
      </StyledHeaderColumns>
      <StyledHeaderColumns id="header-search-bar">
        <SearchBar />
      </StyledHeaderColumns>
      <StyledHeaderColumns id="user-menu">
        {isAuthenticated ? (
          <StyledAuthButton type="button" onClick={handleLogout}>
            Log out
          </StyledAuthButton>
        ) : (
          <StyledAuthLink to="/login">Log in</StyledAuthLink>
        )}
      </StyledHeaderColumns>
    </StyledHeader>
  );
}

export default Header;
