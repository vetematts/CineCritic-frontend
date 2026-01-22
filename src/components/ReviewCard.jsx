// This is the card with a user's review on it
// Shown in the Movies Page and the User's Profile
// Skeleton component - commented out for future implementation
/*
import styled from 'styled-components';

const StyledModalLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #cec8c8ff;
  font-size: 1rem;
`;

// Create the text box where the review is written into
const StyledModalTextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.87);
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

// This is the card with a user's review on it
// Shown in the Movies Page and the User's Profile
function ReviewCard(prop) {
  return (
    <>
      <StyledModalLabel>
        Rating
        <div style={{ marginTop: '0.5rem' }}>
          <StarRating
            value={editingReviewId ? editingRating : reviewRating}
            onChange={editingReviewId ? setEditingRating : setReviewRating}
          />
        </div>
      </StyledModalLabel>
      <StyledModalLabel>
        Review
        <StyledModalTextArea
          value={editingReviewId ? editingBody : reviewBody}
          onChange={(event) => {
            if (editingReviewId) {
              setEditingBody(event.target.value);
            } else {
              setReviewBody(event.target.value);
            }
          }}
          placeholder="Add a review..."
        />
      </StyledModalLabel>
    </>
  );
}

export default ReviewCard;
*/

// Placeholder export to prevent import errors
export default function ReviewCard() {
  return null;
}
