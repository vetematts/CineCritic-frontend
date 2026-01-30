// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

export const StyledContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.87);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const StyledPageTitle = styled.h1`
  color: rgba(255, 255, 255, 0.95);
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;
