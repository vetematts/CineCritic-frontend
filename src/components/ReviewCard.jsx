// This is the card with a user's review on it
// Shown in the Movies Page (via MovieReviewPanel) and the User's Profile (via UserReviewPanel)
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { NavLink } from 'react-router';

// Individual review card container
const StyledReviewCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.25rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const StyledTitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline-block;
  margin-bottom: 0.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledTitle = styled.h3`
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.25rem;
  font-weight: 600;
`;

const StyledYear = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  font-weight: 400;
`;

// Author name display
const StyledAuthorLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const StyledAuthorText = styled.span`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  font-weight: 600;
`;

// Author line with rating
const StyledAuthorLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.5rem 0 0.25rem 0;
`;

// Rating container (when no author shown)
const StyledRatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

// Review date
const StyledDate = styled.p`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  margin: 0.25rem 0 0.5rem 0;
`;

// Review text content
const StyledReviewText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.87);
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

// Action buttons container
const StyledActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const StyledActionButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

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
 * ReviewCard - Displays a single review
 *
 * Props:
 * - review: The review object containing id, body/content/text, rating, dates, user info
 * - userId: The reviewer's ID number that will be used to link to their profile page
 * - showAuthor: Whether to display the author name (default: false)
 * - isOwner: Whether the current user owns this review (shows edit/delete buttons)
 * - onEdit: Callback when Edit button is clicked, receives (review)
 * - onDelete: Callback when Delete button is clicked, receives (review)
 * - datePrefix: Text to show before the date (e.g., "Reviewed on " or "Watched on ")
 */
function ReviewCard({
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
  const authorsProfilePage = userId ? (isOwner ? '/user' : `/user/${userId}`) : null;
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
          {authorsProfilePage ? (
            <StyledAuthorLink to={authorsProfilePage}>{authorName}</StyledAuthorLink>
          ) : (
            <StyledAuthorText>{authorName}</StyledAuthorText>
          )}
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

export default ReviewCard;
