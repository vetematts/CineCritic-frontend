// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

// Set the width of the main to match the root div container.
// This is used for the flex container and its children to reference
// when flexing.
export const StyledMain = styled.main`
  // Set this to be a container and use 100% of the root's width
  width: 100%;
  display: flex;
  justify-content: center; // All items justified center
`;
