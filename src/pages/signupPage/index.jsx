// Import form component
import { SignupForm } from '../../components/signupForm';

// Import image assets
import banner from '../../assets/cine_critic_logo.png';

// Import CSS styling for the sign up page
import { StyledFlexContainer, StyledFigure, StyledSignupLogo } from './style';

export function SignupPage() {
  return (
    <StyledFlexContainer>
      <StyledFigure id="banner-container">
        <StyledSignupLogo src={banner} className="home_logo" alt="CineCritic Banner" />
      </StyledFigure>
      <SignupForm />
    </StyledFlexContainer>
  );
}
