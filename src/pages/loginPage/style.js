// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

// Create the flex container for the login page
export const StyledFlexContainer = styled.div`
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
export const StyledFigure = styled.figure`
  // Figure is the flex container for the image
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

// Re-size the logo to be roughly 1/3rd to 1/4th of the screen
export const StyledLoginLogo = styled.img`
  // This takes shape according to the parent, the figure
  // container
  flex: 1;
  width: 100%;
  max-width: min(40vw, 360px);

  // Provide a bit of space between the logo and the search
  // bar
  padding: 0 0 2rem 0;
`;

// Give the message a grayish colour similar to the footer
export const StyledMessage = styled.p`
  color: #9b9393ff;
  font-size: 0.8rem;

  // Provide some space between this text and the login button
  margin: 1.5rem 0 0 0;
`;
