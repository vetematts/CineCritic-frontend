// Import search bar child component
import { SearchBar } from '../searchBar';

// Import authorization functions and states
import { useAuth } from '../../contexts/AuthContext';
import { logoutRequest } from '../../api/auth';

// Import image assets
import logo from '../../assets/cine_critic_logo.png';
import ProfileIcon from '../../assets/ProfileIcon';

// Import the styling for the Header component elements
import { 
  StyledAuthButton, 
  StyledAuthLink,
  StyledHeader, 
  StyledHeaderColumns, 
  StyledLogo, 
  StyledLogoLink, 
  StyledProfileLink, 
  StyledUserMenuContainer
} from './style';

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      // Ignore network failures; local logout still proceeds.
      console.log(error);
    }
    logout();
  };

  return (
    <StyledHeader>
      <StyledHeaderColumns id="site-logo">
        <StyledLogoLink to="/">
          <StyledLogo src={logo} alt="CineCritic Logo" />
        </StyledLogoLink>
      </StyledHeaderColumns>
      <StyledHeaderColumns id="header-search-bar">
        <SearchBar />
      </StyledHeaderColumns>
      <StyledHeaderColumns id="user-menu">
        {isAuthenticated ? (
          <StyledUserMenuContainer>
            <StyledProfileLink to="/user">
              <ProfileIcon />
              <span>Profile</span>
            </StyledProfileLink>
            <StyledAuthButton type="button" onClick={handleLogout}>
              Log out
            </StyledAuthButton>
          </StyledUserMenuContainer>
        ) : (
          <StyledAuthLink to="/login">Log in</StyledAuthLink>
        )}
      </StyledHeaderColumns>
    </StyledHeader>
  );
}