// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

// Container for all reviews
export const StyledReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StyledReviewItem = styled.li``;

export const StyledEmptyMessage = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 1rem 0;
  font-style: italic;
`;
