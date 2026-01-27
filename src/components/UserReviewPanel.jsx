// This is all the user's reviews shown on their profile page
// Similar pattern to MovieCarousel - receives array, maps to ReviewCard with poster
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { get, put, del } from '../api/api';
import getPosterUrl from '../utils/image-pathing';
import ReviewCard from './ReviewCard';
import StarRating from './StarRating';

// Container for all reviews
const StyledReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

// Individual review row (poster + review card)
const StyledReviewRow = styled.div`
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  grid-template-areas: 'poster card';
  column-gap: 1.5rem;
  row-gap: 0.75rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 110px minmax(0, 1fr);
    column-gap: 1rem;
    row-gap: 0.6rem;
    max-width: 520px;
    margin: 0 auto;
  }
`;

// Poster column
const StyledPosterColumn = styled.div`
  grid-area: poster;
  flex-shrink: 0;
  align-self: start;

  @media (max-width: 768px) {
    align-self: center;
  }
`;

const StyledPosterLink = styled(Link)`
  display: block;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.45);
  }
`;

const StyledPosterWrapper = styled.div`
  display: block;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.35);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.45);
  }
`;

const StyledPosterFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.06), rgba(0, 0, 0, 0.5));
`;

const StyledPoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const StyledPosterPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

// Review content column
const StyledReviewColumn = styled.div`
  grid-area: card;
  flex: 1;
  min-width: 0;
`;

const StyledEmptyMessage = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 1rem 0;
  font-style: italic;
`;

const StyledError = styled.p`
  color: #ffb4a2;
  margin: 1rem 0;
`;

const StyledLoadingText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 1rem 0;
`;

const StyledViewAllRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const StyledViewAllLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  padding-bottom: 2px;
  font-size: 0.95rem;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.6);
  }
`;

// Edit Modal Styles
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const StyledModal = styled.div`
  background-color: #1a1a1a;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const StyledModalTitle = styled.h3`
  margin: 0;
  color: #cec8c8ff;
  font-size: 1.5rem;
`;

const StyledCloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }
`;

const StyledModalContent = styled.div`
  padding: 1.5rem;
`;

const StyledModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledModalLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #cec8c8ff;
  font-size: 1rem;
`;

const StyledModalTextarea = styled.textarea`
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

const StyledModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const StyledModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledSubmitButton = styled(StyledModalButton)`
  background-color: #cec8c8ff;
  color: #242424;
  border: 1px solid #cec8c8ff;

  &:hover:not(:disabled) {
    background-color: #d6d0d0;
    border-color: #d6d0d0;
  }
`;

const StyledCancelButton = styled(StyledModalButton)`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const StyledEditingMovieInfo = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const StyledEditingMovieTitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.1rem;
  font-weight: 500;
`;

/**
 * UserReviewPanel - Displays all reviews by a user with movie posters
 *
 * Props:
 * - userId: The user's ID (required for fetching and updating reviews)
 * - limit: Optional limit on number of reviews to show
 * - showViewAll: Whether to show "View all reviews" link
 */
function UserReviewPanel({
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
            <StyledReviewRow key={review.id || review._id}>
              {/* Movie Poster */}
              <StyledPosterColumn>
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

export default UserReviewPanel;
