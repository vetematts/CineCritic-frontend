// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

// Container for search results with proper constraints
export const StyledSearchResultsContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 1rem;
  }
`;

export const StyledLoading = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  padding: 2rem;
`;

export const StyledError = styled.p`
  color: #ffb4a2;
  text-align: center;
  padding: 2rem;
`;

export const StyledNoResults = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  padding: 2rem;
`;