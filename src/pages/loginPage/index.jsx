// Import Packages
import { NavLink } from 'react-router-dom';

// Import components
import { LoginForm } from '../../components/loginForm';

// Import CSS Styling for the login page
import { StyledFigure, StyledFlexContainer, StyledLoginLogo, StyledMessage } from './style';

// Import image assets
import banner from '../../assets/cine_critic_logo.png';

export function LoginPage() {
  return (
    <StyledFlexContainer className="flex-container">
      <StyledFigure id="banner-container">
        <StyledLoginLogo src={banner} className="home_logo" alt="CineCritic Banner" />
      </StyledFigure>
      <LoginForm />
      <StyledMessage>
        Don&apos;t have an account? <NavLink to="/signup">Create one</NavLink>
      </StyledMessage>
    </StyledFlexContainer>
  );
}
