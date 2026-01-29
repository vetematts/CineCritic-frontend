// Import the star rating child component so users can 
// give their rating out of 5 stars
import StarRating from '../StarRating';

// Import the review card component element styling
import { 
  StyledActionButton, 
  StyledActions, 
  StyledAuthor, 
  StyledAuthorLine, 
  StyledDate, 
  StyledRatingContainer, 
  StyledReviewCard, 
  StyledReviewText, 
  StyledTitle, 
  StyledTitleLink, 
  StyledYear
} from './style';

// Format date to "15 Jan 2024" format
const formatDate = (dateString, prefix = '') => {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = date.getDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${prefix}${day} ${month} ${year}`;
};

/**
 * ReviewCard - This is the card with a user's review on it. Displays a single review
 *              Shown in the Movies Page (via MovieReviewPanel) and the User's Profile (via UserReviewPanel)
 * Props:
 * - review: The review object containing id, body/content/text, rating, dates, user info
 * - userId: The reviewer's ID number that will be used to link to their profile page
 * - showAuthor: Whether to display the author name (default: false)
 * - isOwner: Whether the current user owns this review (shows edit/delete buttons)
 * - onEdit: Callback when Edit button is clicked, receives (review)
 * - onDelete: Callback when Delete button is clicked, receives (review)
 * - datePrefix: Text to show before the date (e.g., "Reviewed on " or "Watched on ")
 */
export function ReviewCard({
  review,
  userId,
  title = null,
  year = null,
  titleLink = null,
  showAuthor = false,
  isOwner = false,
  onEdit,
  onDelete,
  datePrefix = '',
}) {
  if (!review) return null;

  // Extract data from review object (handle different API response formats)
  const reviewContent = review.body || review.content || review.text || '';
  const reviewRating = review.rating ? String(review.rating) : null;
  const reviewDate = review.published_at || review.created_at || review.date;

  // Extract author info
  const authorsProfilePage = `/user/${userId}`;
  const authorName =
    review.user?.username ||
    review.username ||
    review.user?.name ||
    review.user_name ||
    review.user?.email?.split('@')[0] ||
    'Anonymous';

  return (
    <StyledReviewCard>
      {title && (
        <>
          {titleLink ? (
            <StyledTitleLink to={titleLink}>
              <StyledTitle>
                {title}
                {year && <StyledYear> ({year})</StyledYear>}
              </StyledTitle>
            </StyledTitleLink>
          ) : (
            <StyledTitle>
              {title}
              {year && <StyledYear> ({year})</StyledYear>}
            </StyledTitle>
          )}
        </>
      )}

      {/* Author line with rating (for movie reviews) */}
      {showAuthor && (
        <StyledAuthorLine>
          <StyledAuthor to={authorsProfilePage}>{authorName}</StyledAuthor>
          {reviewRating && <StarRating value={reviewRating} disabled={true} />}
        </StyledAuthorLine>
      )}

      {/* Rating only (for user reviews - no author needed) */}
      {!showAuthor && reviewRating && (
        <StyledRatingContainer>
          <StarRating value={reviewRating} disabled={true} />
        </StyledRatingContainer>
      )}

      {/* Review date */}
      {reviewDate && <StyledDate>{formatDate(reviewDate, datePrefix)}</StyledDate>}

      {/* Review text */}
      {reviewContent && <StyledReviewText>{reviewContent}</StyledReviewText>}

      {/* Edit/Delete actions for owner */}
      {isOwner && (onEdit || onDelete) && (
        <StyledActions>
          {onEdit && (
            <StyledActionButton type="button" onClick={() => onEdit(review)}>
              Edit
            </StyledActionButton>
          )}
          {onDelete && (
            <StyledActionButton type="button" onClick={() => onDelete(review)}>
              Delete
            </StyledActionButton>
          )}
        </StyledActions>
      )}
    </StyledReviewCard>
  );
}