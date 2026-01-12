// Import packages

// Import other components
import SearchBar from "./SearchBar";
import { useAuth } from "../contexts/AuthContext";
import { logoutRequest } from "../api/auth";

// Import image assets
import logo from "../assets/cine_critic_logo_small.png";
import styled from "styled-components";
import { NavLink } from "react-router";

// Styled parts
// Create a responsive header that doesn't wrap and maintains its shape
const StyledHeader = styled.header`
  display: flex;
  flex: 1;
`;

// Small icon that will grow and shrink with the rest of the header
const StyledLogo = styled.img`
  display: flex;
  flex: 0;
  justify-content: flex-start;
`;

const StyledAuthButton = styled.button`
  margin-left: auto;
  height: 2.4rem;
`;

const StyledAuthLink = styled(NavLink)`
  margin-left: auto;
  height: 2.4rem;
  display: flex;
  align-items: center;
  color: #e9da57;
  text-decoration: none;
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
      <NavLink to="/">
        <StyledLogo src={logo} alt="CineCritic Logo" />
      </NavLink>
      <SearchBar />
      {isAuthenticated ? (
        <StyledAuthButton type="button" onClick={handleLogout}>
          Log out
        </StyledAuthButton>
      ) : (
        <StyledAuthLink to="/login">Log in</StyledAuthLink>
      )}
    </StyledHeader>
  );
}

export default Header;
