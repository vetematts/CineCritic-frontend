// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

// Styled heading for movie sections
export const StyledSectionHeading = styled.h3`
  align-items: flex-start;
  max-width: 100%;
  color: #cec8c8ff;
  margin: 0 0 0.5rem 0;
`;

// Container for section row (heading)
export const StyledSectionRow = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

// Wrapper for entire section (heading + carousel)
export const StyledSectionWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;

  &:first-of-type {
    margin-top: 3rem; // Extra spacing for first section after search bar
  }
`;