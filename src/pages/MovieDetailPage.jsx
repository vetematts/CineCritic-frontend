import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { get, post, put, del } from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import getPosterUrl from '../utilities/image-pathing';
import StarRating from '../components/StarRating';
import CalendarIcon from '../assets/CalendarIcon';
import ClockIcon from '../assets/ClockIcon';
import BackArrowIcon from '../assets/BackArrowIcon';

const StyledContainer = styled.section`
  width: 100%;
  max-width: 100rem;
  padding: 1rem 0 2rem 0;
  color: rgba(255, 255, 255, 0.87);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

// Main flex container: poster column + text column
const StyledMainContent = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

// Poster column (fixed width on left)
const StyledPosterColumn = styled.div`
  flex-shrink: 0;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

// Text column (flex: 1, contains all text content)
const StyledTextColumn = styled.div`
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
  }
`;

// Large poster for movie detail page
const StyledPoster = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
`;

// Placeholder for missing poster
const StyledPosterPlaceholder = styled.div`
  width: 100%;
  height: 450px;
  background-color: #5a5b5f;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
`;

// Container for movie details (title, meta, overview)
const StyledMovieDetails = styled.div`
  margin-bottom: 2rem;
  margin-top: 0;
`;

const StyledTitle = styled.h2`
  margin: 0 0 0.5rem 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const StyledHeading = styled.h3`
  color: #cec8c8ff;
`;

const StyledParagraph = styled.p`
  color: rgba(255, 255, 255, 0.87);
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledListItem = styled.li`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.25rem;
  color: rgba(255, 255, 255, 0.87);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const StyledReviewAuthor = styled.p`
  color: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const StyledReviewAuthorLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.5rem 0 0.25rem 0;
`;

const StyledReviewDate = styled.p`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  margin: 0.25rem 0 0.5rem 0;
`;

const StyledMeta = styled.p`
  margin: 0.25rem 0;
  color: #bdbdbd;
`;

const StyledError = styled.p`
  color: #ffb4a2;
`;

// Prominent average rating display
const StyledAverageRating = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.4rem 0.85rem;
  background-color: rgba(233, 218, 87, 0.12);
  border-radius: 999px;
  border: 1px solid rgba(233, 218, 87, 0.35);
`;

const StyledAverageRatingLabel = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const StyledAverageRatingValue = styled.p`
  margin: 0;
  color: #e9da57;
  font-size: 0.95rem;
  font-weight: 600;
`;

// Sign in prompt for rating
const StyledSignInPrompt = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const StyledSignInText = styled.p`
  margin: 0 0 0.5rem 0;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledSignInLink = styled(Link)`
  color: #e9da57;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: #f5e866;
  }
`;

// Back to Home button
const StyledBackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  margin-bottom: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.95);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.35rem 0.7rem;
  }
`;

// Meta info with icons
const StyledMetaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin: 0.75rem 0;
`;

const StyledMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

// Watchlist button
const StyledWatchlistButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Review Modal
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
    border-color: #e9da57;
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

const StyledOpenReviewButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const StyledSignInReviewButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const StyledActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;
`;

const StyledReviewActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const StyledEditButton = styled.button`
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

const StyledDeleteButton = styled.button`
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

function MovieDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const userId = user?.id ?? user?.sub ?? null;
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewBody, setReviewBody] = useState('');
  const [reviewRating, setReviewRating] = useState('');
  const [reviewError, setReviewError] = useState(null);
  const [watchlistEntry, setWatchlistEntry] = useState(null);
  const [watchlistError, setWatchlistError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingBody, setEditingBody] = useState('');
  const [editingRating, setEditingRating] = useState('5');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isMounted = true;

    // Load movie detail plus reviews for this TMDB id.
    const loadMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const [movieData, reviewsData] = await Promise.all([
          get(`/api/movies/${id}`),
          get(`/api/reviews/${id}`),
        ]);

        if (isMounted) {
          setMovie(movieData);
          setReviews(reviewsData || []);
        }
      } catch (err) {
        if (isMounted) {
          // err.message contains the error message from the API
          setError(err?.message || 'Unable to load movie details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMovie();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    let isMounted = true;

    const loadWatchlistEntry = async () => {
      try {
        const data = await get(`/api/watchlist/${userId}`);
        if (isMounted) {
          const entry = (data || []).find((item) => item.movie_id === Number(id));
          setWatchlistEntry(entry || null);
        }
      } catch (err) {
        if (isMounted) {
          setWatchlistError(err?.message || 'Unable to load watchlist.');
        }
      }
    };

    loadWatchlistEntry();

    return () => {
      isMounted = false;
    };
  }, [id, userId]);

  return (
    <StyledContainer>
      <StyledBackButton to="/">
        <BackArrowIcon />
        Back to Home
      </StyledBackButton>
      {loading && <p>Loading...</p>}
      {error && <StyledError>{error}</StyledError>}
      {!loading && movie && (
        <StyledMainContent>
          <StyledPosterColumn>
            {(() => {
              const posterUrl = getPosterUrl(movie.poster_path || movie.posterUrl, 'w500');
              return posterUrl ? (
                <StyledPoster src={posterUrl} alt={`${movie.title || movie.name} poster`} />
              ) : (
                <StyledPosterPlaceholder>No poster available</StyledPosterPlaceholder>
              );
            })()}
            <StyledActionButtons>
              {userId ? (
                <>
                  <StyledWatchlistButton
                    type="button"
                    onClick={async () => {
                      setWatchlistError(null);
                      try {
                        if (watchlistEntry?.id) {
                          // Remove from watchlist
                          await del(`/api/watchlist/${watchlistEntry.id}`);
                          setWatchlistEntry(null);
                        } else {
                          // Add to watchlist
                          const entry = await post('/api/watchlist', {
                            tmdbId: Number(id),
                            userId,
                            status: 'planned',
                          });
                          setWatchlistEntry(entry);
                        }
                      } catch (err) {
                        setWatchlistError(err?.message || 'Unable to update watchlist.');
                      }
                    }}
                  >
                    {watchlistEntry?.id ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  </StyledWatchlistButton>
                  <StyledOpenReviewButton
                    type="button"
                    onClick={() => {
                      // Always start fresh for new review
                      setEditingReviewId(null);
                      setReviewRating('');
                      setReviewBody('');
                      setIsReviewModalOpen(true);
                    }}
                  >
                    Rate & Review
                  </StyledOpenReviewButton>
                </>
              ) : (
                <StyledSignInReviewButton to="/login">
                  Sign in to Rate & Review
                </StyledSignInReviewButton>
              )}
            </StyledActionButtons>
            {watchlistError && <StyledError>{watchlistError}</StyledError>}
          </StyledPosterColumn>
          <StyledTextColumn>
            <StyledMovieDetails>
              <StyledTitle>{movie.title || movie.name}</StyledTitle>
              <StyledMetaContainer>
                {movie.release_date && (
                  <StyledMetaItem>
                    <CalendarIcon />
                    <span>
                      {(() => {
                        // Format date to "February 28, 2025" format
                        const date = new Date(movie.release_date);
                        if (!isNaN(date.getTime())) {
                          return date.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          });
                        }
                        return movie.release_date;
                      })()}
                    </span>
                  </StyledMetaItem>
                )}
                {movie.runtime && (
                  <StyledMetaItem>
                    <ClockIcon />
                    <span>{movie.runtime} min</span>
                  </StyledMetaItem>
                )}
              </StyledMetaContainer>
              {movie.vote_average && (
                <StyledAverageRating>
                  <StyledAverageRatingLabel>Average Rating</StyledAverageRatingLabel>
                  <StyledAverageRatingValue>
                    {movie.vote_average.toFixed(1)} / 10
                  </StyledAverageRatingValue>
                </StyledAverageRating>
              )}
              {movie.overview && <StyledParagraph>{movie.overview}</StyledParagraph>}
            </StyledMovieDetails>
            {isReviewModalOpen && (
              <StyledModalOverlay
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setIsReviewModalOpen(false);
                    setEditingReviewId(null);
                  }
                }}
              >
                <StyledModal onClick={(e) => e.stopPropagation()}>
                  <StyledModalHeader>
                    <StyledModalTitle>
                      {editingReviewId ? 'Edit Review' : 'Rate & Review'}
                    </StyledModalTitle>
                    <StyledCloseButton
                      type="button"
                      onClick={() => {
                        setIsReviewModalOpen(false);
                        setEditingReviewId(null);
                        setReviewError(null);
                      }}
                    >
                      ×
                    </StyledCloseButton>
                  </StyledModalHeader>
                  <StyledModalContent>
                    {reviewError && <StyledError>{reviewError}</StyledError>}
                    <StyledModalForm
                      onSubmit={async (event) => {
                        event.preventDefault();
                        setReviewError(null);
                        try {
                          if (editingReviewId) {
                            // Update existing review
                            await put(`/api/reviews/${editingReviewId}`, {
                              rating: Number(editingRating),
                              body: editingBody,
                            });
                          } else {
                            // Create new review
                            await post('/api/reviews', {
                              tmdbId: Number(id),
                              userId,
                              rating: Number(reviewRating),
                              body: reviewBody,
                              status: 'published',
                            });
                          }

                          const updated = await get(`/api/reviews/${id}`);
                          setReviews(updated || []);
                          setReviewBody('');
                          setReviewRating('');
                          setEditingBody('');
                          setEditingRating('');
                          setEditingReviewId(null);
                          setIsReviewModalOpen(false);
                        } catch (err) {
                          setReviewError(err?.message || 'Unable to submit review.');
                        }
                      }}
                    >
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
                        <StyledModalTextarea
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
                      <StyledModalButtons>
                        <StyledCancelButton
                          type="button"
                          onClick={() => {
                            setIsReviewModalOpen(false);
                            setEditingReviewId(null);
                            setReviewError(null);
                          }}
                        >
                          Cancel
                        </StyledCancelButton>
                        <StyledSubmitButton type="submit">Save</StyledSubmitButton>
                      </StyledModalButtons>
                    </StyledModalForm>
                  </StyledModalContent>
                </StyledModal>
              </StyledModalOverlay>
            )}
            {reviews.length > 0 && (
              <>
                <StyledHeading>Reviews</StyledHeading>
                <StyledList>
                  {reviews.map((review) => (
                    <StyledListItem key={review.id || review._id}>
                      <StyledReviewAuthorLine>
                        <StyledReviewAuthor>
                          {review.user?.username ||
                            review.username ||
                            review.user?.name ||
                            review.user_name ||
                            review.user?.email?.split('@')[0] ||
                            'Anonymous'}
                        </StyledReviewAuthor>
                        {review.rating && (
                          <StarRating value={String(review.rating)} disabled={true} />
                        )}
                      </StyledReviewAuthorLine>
                      {(review.published_at || review.created_at) && (
                        <StyledReviewDate>
                          {(() => {
                            // Format date to "Watched on 14 Jan 2026" format
                            const dateStr = review.published_at || review.created_at;
                            const date = new Date(dateStr);
                            if (!isNaN(date.getTime())) {
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
                              return `Watched on ${day} ${month} ${year}`;
                            }
                            return dateStr;
                          })()}
                        </StyledReviewDate>
                      )}
                      <StyledParagraph>
                        {review.body || review.content || review.text}
                      </StyledParagraph>
                      {user?.id &&
                        (review.user_id === user.id ||
                          review.userId === user.id ||
                          review.user?.id === user.id) && (
                          <StyledReviewActions>
                            <StyledEditButton
                              type="button"
                              onClick={() => {
                                const reviewId = review.id || review._id;
                                setEditingReviewId(reviewId);
                                setEditingBody(review.body || review.content || review.text || '');
                                setEditingRating(String(review.rating || '5'));
                                setIsReviewModalOpen(true);
                              }}
                            >
                              Edit
                            </StyledEditButton>
                            <StyledDeleteButton
                              type="button"
                              onClick={async () => {
                                setReviewError(null);
                                try {
                                  await del(`/api/reviews/${review.id || review._id}`);
                                  const updated = await get(`/api/reviews/${id}`);
                                  setReviews(updated || []);
                                } catch (err) {
                                  setReviewError(err?.message || 'Unable to delete review.');
                                }
                              }}
                            >
                              Delete
                            </StyledDeleteButton>
                          </StyledReviewActions>
                        )}
                    </StyledListItem>
                  ))}
                </StyledList>
              </>
            )}
          </StyledTextColumn>
        </StyledMainContent>
      )}
    </StyledContainer>
  );
}

export default MovieDetailPage;
