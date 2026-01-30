// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

// This is the flex container for all the inputs
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  /* Set the form to be 100% of the main's width */
  width: 100%;
`;

export const StyledFormCard = styled.section`
  width: 80%;
  padding: 2rem;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(20, 24, 30, 0.9), rgba(12, 16, 22, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 20px 45px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

export const StyledFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem 2rem;
  width: 100%;
  margin: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    gap: 1rem;
  }
`;

export const StyledSearchRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  ${(props) =>
    props.$fullWidth &&
    `
    grid-column: 1 / -1;
  `}
`;

// Give all the labels uniform color
export const StyledLabels = styled.label`
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;

  /* Response design */
  display: flex;
  align-items: flex-start;

  /* Spacing between itself and its input */
  padding: 0;
`;

// White background input fields with slight rounded corners
// with spacing to break up and declutter the page
export const StyledInputs = styled.input`
  /* White background */
  background-color: #ffffffff;
  opacity: 0.9;

  /* Dark text color for visibility on white background */
  color: #242424;

  /* Round the corners */
  border-radius: 10px;
  padding: 0.55rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  /* Set responsive design */
  display: flex;
  flex: 1; /* Shrink and grow in proportion to window size */
  flex-basis: 100%; /* Input will take up an entire row */

  /* Space away from other items */
  margin: 0;

  &::placeholder {
    color: rgba(36, 36, 36, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
  }
`;

// Flexible drop down that fits in next to its input field
export const StyledDropDown = styled.select`
  /* Make the drop down responsive */
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;

  /* Dark text color for visibility */
  color: #242424;
  background-color: #ffffffff;
  border-radius: 10px;
  padding: 0.55rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  /* Space away from other items */
  margin: 0;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
  }
`;

// Container for genre buttons/pills
export const StyledGenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  flex: 1;
  flex-basis: 100%;
  margin: 0;
`;

// Genre button/pill - clickable to toggle selection
export const StyledGenreButton = styled.button`
  /* Unselected state */
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 0.35rem 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Selected state */
  ${(props) =>
    props.$isSelected &&
    `
    background-color: #cec8c8ff;
    color: #242424;
    border-color: #cec8c8ff;
    font-weight: 600;
  `}

  /* Hover state */
  &:hover {
    background-color: ${(props) => (props.$isSelected ? '#d6d0d0' : 'rgba(255, 255, 255, 0.2)')};
    border-color: ${(props) => (props.$isSelected ? '#d6d0d0' : 'rgba(255, 255, 255, 0.5)')};
    transform: translateY(-1px);
  }

  /* Active/pressed state */
  &:active {
    transform: translateY(0);
  }
`;

// Container for rating selection with stars and comparator
export const StyledRatingInput = styled.div`
  /* Set responsive design */
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  flex-basis: 100%;
  width: 100%;
`;

export const StyledRatingRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 150px) max-content;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }
`;

export const StyledStarsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 8%;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

// Comparator dropdown styling
export const StyledComparatorSelect = styled.select`
  /* White background matching other inputs */
  background-color: #ffffffff;
  color: #242424;
  opacity: 0.9;
  border-radius: 10px;
  padding: 0.75rem 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex: 1;
  flex-basis: 100%;
  margin: 0;
  min-height: 42px;
  width: 150px;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
  }
`;

export const StyledHelperText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
`;

// Space the submit button further away from the last query input
export const StyledSubmitButton = styled.button`
  /* Make the button appear left for left reading */
  align-self: flex-start;

  /* Roughly 50px distance between this and the Genres input field */
  margin: 1rem 0 0 0;

  /* Give the button a bit more meat */
  height: 36px;
  padding: 0 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Container for search results - matches form width and styling
export const StyledResultsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
`;

// Results wrapper to match form's width constraint (80%)
export const StyledResultsWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 0.5rem;
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
