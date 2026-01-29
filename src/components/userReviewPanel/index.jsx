// This is all the user's reviews shown on their profile page
// Similar pattern to MovieCarousel - receives array, maps to ReviewCard with poster
import { useEffect, useState } from 'react';

// Import children components that make up the review panel
import { ReviewCard } from '../reviewCard'; // Shows all the user's reviews
import { StarRating } from '../starRating'; // Shows the rating the user gave

// Import utilities
import { get, put, del } from '../../api/api';        // Communicates with the back-end server
import getPosterUrl from '../../utils/image-pathing'; // Grabs the URL path to the poster

// Import the user review panel css styling
import { 
  StyledCancelButton, 
  StyledCloseButton, 
  StyledEditingMovieInfo, 
  StyledEditingMovieTitle, 
  StyledEmptyMessage, 
  StyledError, 
  StyledLoadingText, 
  StyledModal, 
  StyledModalButton, 
  StyledModalButtons, 
  StyledModalContent, 
  StyledModalForm, 
  StyledModalHeader, 
  StyledModalLabel, 
  StyledModalOverlay, 
  StyledModalTextarea, 
  StyledModalTitle, 
  StyledPoster, 
  StyledPosterColumn, 
  StyledPosterFrame, 
  StyledPosterLink, 
  StyledPosterPlaceholder, 
  StyledPosterWrapper, 
  StyledReviewColumn, 
  StyledReviewRow, 
  StyledReviewsContainer, 
  StyledSubmitButton, 
  StyledViewAllLink, 
  StyledViewAllRow
} from './style';

/**
 * UserReviewPanel - Displays all reviews by a user with movie posters
 *
 * Props:
 * - userId: The user's ID (required for fetching and updating reviews)
 * - limit: Optional limit on number of reviews to show
 * - showViewAll: Whether to show "View all reviews" link
 */
export function UserReviewPanel({
  userId,
  limit = null,
  showViewAll = false,
  isOwner = true,
  usePublicEndpoints = false,
}) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [editingBody, setEditingBody] = useState('');
  const [editingRating, setEditingRating] = useState('5');
  const [editError, setEditError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load reviews
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const loadReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        let reviewsData;
        try {
          const endpoint = usePublicEndpoints
            ? `/api/public/users/${userId}/reviews`
            : `/api/reviews/user/${userId}`;
          reviewsData = await get(endpoint);
        } catch {
          console.warn('User reviews endpoint not found, using empty array');
          reviewsData = [];
        }

        if (isMounted) {
          setReviews(reviewsData || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || 'Unable to load reviews.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, [userId, usePublicEndpoints]);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isEditModalOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsEditModalOpen(false);
        setEditingReview(null);
        setEditError(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditModalOpen]);

  // Handle opening edit modal
  const handleEdit = (review) => {
    const reviewId = review.id || review._id;
    setEditingReview({ ...review, id: reviewId });
    setEditingBody(review.body || review.content || review.text || '');
    setEditingRating(String(review.rating || '5'));
    setEditError(null);
    setIsEditModalOpen(true);
  };

  // Handle edit form submission
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!editingReview) return;

    setEditError(null);
    setIsSubmitting(true);

    try {
      await put(`/api/reviews/${editingReview.id}`, {
        rating: Number(editingRating),
        body: editingBody,
      });

      // Reload reviews
      const updatedEndpoint = usePublicEndpoints
        ? `/api/public/users/${userId}/reviews`
        : `/api/reviews/user/${userId}`;
      const updatedReviews = await get(updatedEndpoint);
      setReviews(updatedReviews || []);

      // Close modal
      setIsEditModalOpen(false);
      setEditingReview(null);
      setEditingBody('');
      setEditingRating('5');
    } catch (err) {
      setEditError(err?.message || 'Unable to update review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (review) => {
    const reviewId = review.id || review._id;
    const movieTitle = review.movie?.title || review.movie_title || review.title || 'this movie';

    const confirmed = window.confirm(
      `Are you sure you want to delete your review for "${movieTitle}"?`
    );
    if (!confirmed) return;

    try {
      await del(`/api/reviews/${reviewId}`);

      // Reload reviews
      const updatedEndpoint = usePublicEndpoints
        ? `/api/public/users/${userId}/reviews`
        : `/api/reviews/user/${userId}`;
      const updatedReviews = await get(updatedEndpoint);
      setReviews(updatedReviews || []);
    } catch (err) {
      alert(err?.message || 'Unable to delete review.');
    }
  };

  // Calculate visible reviews
  const visibleReviews = limit && typeof limit === 'number' ? reviews.slice(0, limit) : reviews;

  if (loading) {
    return <StyledLoadingText>Loading reviews...</StyledLoadingText>;
  }

  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  if (reviews.length === 0) {
    return (
      <StyledEmptyMessage>
        No reviews yet. Start reviewing movies to see them here!
      </StyledEmptyMessage>
    );
  }

  return (
    <>
      <StyledReviewsContainer>
        {visibleReviews.map((review) => {
          // Extract movie info from review
          const tmdbId = review.tmdb_id || review.tmdbId || review.movie?.tmdb_id;
          const movieTitle =
            review.movie?.title || review.movie_title || review.title || 'Unknown Movie';
          const releaseYear =
            review.movie?.release_year ||
            review.movie?.release_date?.split('-')[0] ||
            review.release_year;
          const posterPath =
            review.movie?.poster_url ||
            review.movie?.poster_path ||
            review.poster_url ||
            review.poster_path;
          const posterUrl = getPosterUrl(posterPath, 'w200');

          return (
            <StyledReviewRow key={review.id || review._id} $alignCenter={isOwner}>
              {/* Movie Poster */}
              <StyledPosterColumn $alignCenter={isOwner}>
                {tmdbId ? (
                  <StyledPosterLink to={`/movies/${tmdbId}`}>
                    <StyledPosterFrame>
                      {posterUrl ? (
                        <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                      ) : (
                        <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                      )}
                    </StyledPosterFrame>
                  </StyledPosterLink>
                ) : posterUrl ? (
                  <StyledPosterWrapper>
                    <StyledPosterFrame>
                      <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                    </StyledPosterFrame>
                  </StyledPosterWrapper>
                ) : (
                  <StyledPosterWrapper>
                    <StyledPosterFrame>
                      <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                    </StyledPosterFrame>
                  </StyledPosterWrapper>
                )}
              </StyledPosterColumn>

              {/* Review Card */}
              <StyledReviewColumn>
                <ReviewCard
                  review={review}
                  title={movieTitle}
                  year={releaseYear}
                  titleLink={tmdbId ? `/movies/${tmdbId}` : null}
                  showAuthor={false}
                  isOwner={isOwner}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  datePrefix="Reviewed on "
                />
              </StyledReviewColumn>
            </StyledReviewRow>
          );
        })}
      </StyledReviewsContainer>

      {showViewAll && reviews.length > 0 && (
        <StyledViewAllRow>
          <StyledViewAllLink to="/reviews">View all reviews</StyledViewAllLink>
        </StyledViewAllRow>
      )}

      {/* Edit Review Modal */}
      {isEditModalOpen && editingReview && (
        <StyledModalOverlay
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsEditModalOpen(false);
              setEditingReview(null);
              setEditError(null);
            }
          }}
        >
          <StyledModal onClick={(e) => e.stopPropagation()}>
            <StyledModalHeader>
              <StyledModalTitle>Edit Review</StyledModalTitle>
              <StyledCloseButton
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingReview(null);
                  setEditError(null);
                }}
              >
                ×
              </StyledCloseButton>
            </StyledModalHeader>
            <StyledModalContent>
              <StyledEditingMovieInfo>
                <StyledEditingMovieTitle>
                  {editingReview.movie?.title ||
                    editingReview.movie_title ||
                    editingReview.title ||
                    'Unknown Movie'}
                </StyledEditingMovieTitle>
              </StyledEditingMovieInfo>
              {editError && <StyledError>{editError}</StyledError>}
              <StyledModalForm onSubmit={handleEditSubmit}>
                <StyledModalLabel>
                  Rating
                  <div style={{ marginTop: '0.5rem' }}>
                    <StarRating value={editingRating} onChange={setEditingRating} />
                  </div>
                </StyledModalLabel>
                <StyledModalLabel>
                  Review
                  <StyledModalTextarea
                    value={editingBody}
                    onChange={(event) => setEditingBody(event.target.value)}
                    placeholder="Add a review..."
                  />
                </StyledModalLabel>
                <StyledModalButtons>
                  <StyledCancelButton
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingReview(null);
                      setEditError(null);
                    }}
                  >
                    Cancel
                  </StyledCancelButton>
                  <StyledSubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </StyledSubmitButton>
                </StyledModalButtons>
              </StyledModalForm>
            </StyledModalContent>
          </StyledModal>
        </StyledModalOverlay>
      )}
    </>
  );
}