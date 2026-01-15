import { NavLink } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';

// Import image assets
import banner from '../assets/cine_critic_logo.png';

// Create the flex container for the login page
const StyledFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

// Align the home logo container to centre the image
const StyledFigure = styled.figure`
  // Figure is the flex container for the image
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

// Re-size the logo to be roughly 1/3rd to 1/4th of the screen
const StyledLoginLogo = styled.img`
  // This takes shape according to the parent, the figure
  // container
  flex: 1;
  width: 60%;
  max-width: min(40vw, 420px);

  // Provide a bit of space between the logo and the search
  // bar
  padding: 0 0 2rem 0;
`;

// Give the message a grayish colour similar to the footer
const StyledMessage = styled.p`
  color: #9b9393ff;
  font-size: 0.8rem;

  // Provide some space between this text and the login button
  margin: 1.5rem 0 0 0;
`;

export default function LoginPage() {
  return (
    <StyledFlexContainer className = "flex-container">
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
