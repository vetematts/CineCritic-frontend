import styled from 'styled-components';

import SignupForm from '../components/SignupForm';

// Import image assets
import banner from '../assets/cine_critic_logo.png';

// Create the flex container for the login page
const StyledFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
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
const StyledSignupLogo = styled.img`
  // This takes shape according to the parent, the figure
  // container
  flex: 1;
  width: 100%;
  max-width: min(40vw, 360px);

  // Provide a bit of space between the logo and the search
  // bar
  padding: 0 0 2rem 0;
`;

export default function SignupPage() {
  return (
    <StyledFlexContainer>
      <StyledFigure id="banner-container">
        <StyledSignupLogo src={banner} className="home_logo" alt="CineCritic Banner" />
      </StyledFigure>
      <SignupForm />
    </StyledFlexContainer>
  );
}
