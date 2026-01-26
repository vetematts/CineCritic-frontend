// This is all the reviews for this movie, shown on the movie's page
// Similar pattern to MovieCarousel - receives array, maps to ReviewCard
import styled from 'styled-components';
import ReviewCard from './ReviewCard';

// Container for all reviews
const StyledReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledReviewItem = styled.li``;

const StyledEmptyMessage = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 1rem 0;
  font-style: italic;
`;

/**
 * MovieReviewPanel - Displays all reviews for a movie
 *
 * Props:
 * - reviewsArray: Array of review objects
 * - currentUserId: The logged-in user's ID (to determine ownership for edit/delete)
 * - onEdit: Callback when Edit button is clicked on a review
 * - onDelete: Callback when Delete button is clicked on a review
 */
function MovieReviewPanel({ reviewsArray, currentUserId, onEdit, onDelete }) {
  if (!reviewsArray || reviewsArray.length === 0) {
    return <StyledEmptyMessage>No reviews yet. Be the first to review!</StyledEmptyMessage>;
  }

  return (
    <StyledReviewList>
      {reviewsArray.map((review) => {
        // Determine if current user owns this review
        const reviewUserId = review.user_id || review.userId || review.user?.id;
        const isOwner = currentUserId && reviewUserId === currentUserId;

        return (
          <StyledReviewItem key={review.id || review._id}>
            <ReviewCard
              review={review}
              showAuthor={true}
              isOwner={isOwner}
              onEdit={onEdit}
              onDelete={onDelete}
              datePrefix="Watched on "
            />
          </StyledReviewItem>
        );
      })}
    </StyledReviewList>
  );
}

export default MovieReviewPanel;
