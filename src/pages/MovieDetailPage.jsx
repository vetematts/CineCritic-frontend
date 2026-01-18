import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { get, post, put, del } from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import getPosterUrl from '../utilities/image-pathing';
import StarRating from '../components/StarRating';

const StyledContainer = styled.section`
  width: 100rem;
  padding: 1rem 0 2rem 0;
`;

// Main flex container: poster column + text column
const StyledMainContent = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

// Poster column (fixed width on left)
const StyledPosterColumn = styled.div`
  flex-shrink: 0;
  width: 300px;
`;

// Text column (flex: 1, contains all text content)
const StyledTextColumn = styled.div`
  flex: 1;
  min-width: 300px;
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
`;

const StyledTitle = styled.h2`
  margin-bottom: 0.5rem;
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
  margin: 1rem 0;
  padding: 1rem;
  background-color: rgba(233, 218, 87, 0.1);
  border-radius: 8px;
  border-left: 4px solid #e9da57;
`;

const StyledAverageRatingLabel = styled.p`
  margin: 0 0 0.25rem 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StyledAverageRatingValue = styled.p`
  margin: 0;
  color: #e9da57;
  font-size: 1.5rem;
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

function MovieDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id ?? user?.sub ?? null;
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewBody, setReviewBody] = useState('');
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewError, setReviewError] = useState(null);
  const [watchlistStatus, setWatchlistStatus] = useState('planned');
  const [watchlistEntry, setWatchlistEntry] = useState(null);
  const [watchlistError, setWatchlistError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingBody, setEditingBody] = useState('');
  const [editingRating, setEditingRating] = useState('5');

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
          setWatchlistStatus(entry?.status || 'planned');
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
          </StyledPosterColumn>
          <StyledTextColumn>
            <StyledMovieDetails>
              <StyledTitle>{movie.title || movie.name}</StyledTitle>
              {movie.release_date && <StyledMeta>Released {movie.release_date}</StyledMeta>}
              {movie.runtime && <StyledMeta>Runtime {movie.runtime} minutes</StyledMeta>}
              {movie.vote_average && (
                <StyledAverageRating>
                  <StyledAverageRatingLabel>Average Rating</StyledAverageRatingLabel>
                  <StyledAverageRatingValue>
                    {movie.vote_average.toFixed(1)} / 10
                  </StyledAverageRatingValue>
                </StyledAverageRating>
              )}
              {movie.overview && <p>{movie.overview}</p>}
            </StyledMovieDetails>
            {reviews.length > 0 && (
              <>
                <h3>Reviews</h3>
                <ul>
                  {reviews.map((review) => (
                    <li key={review.id || review._id}>
                      <p>{review.body || review.content || review.text}</p>
                      {review.rating && <StyledMeta>Rating {review.rating}</StyledMeta>}
                      {user?.id &&
                        (review.user_id === user.id ||
                          review.userId === user.id ||
                          review.user?.id === user.id) &&
                        editingReviewId !== (review.id || review._id) && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingReviewId(review.id || review._id);
                                setEditingBody(review.content || review.text || '');
                                setEditingRating(String(review.rating || '5'));
                              }}
                            >
                              Edit
                            </button>
                            <button
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
                            </button>
                          </>
                        )}
                      {editingReviewId === (review.id || review._id) && (
                        <form
                          onSubmit={async (event) => {
                            event.preventDefault();
                            setReviewError(null);
                            try {
                              await put(`/api/reviews/${editingReviewId}`, {
                                rating: Number(editingRating),
                                body: editingBody,
                              });

                              const updated = await get(`/api/reviews/${id}`);
                              setReviews(updated || []);
                              setEditingReviewId(null);
                            } catch (err) {
                              setReviewError(err?.message || 'Unable to update review.');
                            }
                          }}
                        >
                          <label>
                            Rating
                            <div style={{ marginTop: '0.5rem' }}>
                              <StarRating value={editingRating} onChange={setEditingRating} />
                            </div>
                          </label>
                          <label>
                            Review
                            <textarea
                              value={editingBody}
                              onChange={(event) => setEditingBody(event.target.value)}
                            />
                          </label>
                          <button type="submit">Save</button>
                          <button type="button" onClick={() => setEditingReviewId(null)}>
                            Cancel
                          </button>
                        </form>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div>
              <h3>Rate & Review</h3>
              {reviewError && <StyledError>{reviewError}</StyledError>}
              {isAuthenticated ? (
                <form
                  onSubmit={async (event) => {
                    event.preventDefault();
                    setReviewError(null);
                    try {
                      await post('/api/reviews', {
                        tmdbId: Number(id),
                        userId,
                        rating: Number(reviewRating),
                        body: reviewBody,
                        status: 'published',
                      });

                      const updated = await get(`/api/reviews/${id}`);
                      setReviews(updated || []);
                      setReviewBody('');
                      setReviewRating('5');
                    } catch (err) {
                      setReviewError(err?.message || 'Unable to submit review.');
                    }
                  }}
                >
                  <label>
                    Rating
                    <div style={{ marginTop: '0.5rem' }}>
                      <StarRating value={reviewRating} onChange={setReviewRating} />
                    </div>
                  </label>
                  <label>
                    Review
                    <textarea
                      value={reviewBody}
                      onChange={(event) => setReviewBody(event.target.value)}
                    />
                  </label>
                  <button type="submit">Submit review</button>
                </form>
              ) : (
                <StyledSignInPrompt>
                  <StyledSignInText>
                    <StyledSignInLink to="/login">Sign in</StyledSignInLink> to write a review
                  </StyledSignInText>
                </StyledSignInPrompt>
              )}
            </div>
            <div>
              <h3>Watchlist</h3>
              {!userId && <p>Please log in to manage your watchlist.</p>}
              {watchlistError && <StyledError>{watchlistError}</StyledError>}
              <div>
                <label>
                  Status
                  <select
                    value={watchlistStatus}
                    onChange={(event) => setWatchlistStatus(event.target.value)}
                    disabled={!userId}
                  >
                    <option value="planned">Planned</option>
                    <option value="watching">Watching</option>
                    <option value="completed">Completed</option>
                  </select>
                </label>
                {watchlistEntry?.id && <p>Current status: {watchlistEntry.status}</p>}
                <button
                  type="button"
                  disabled={!userId}
                  onClick={async () => {
                    setWatchlistError(null);
                    if (!userId) {
                      setWatchlistError('You must be logged in.');
                      return;
                    }

                    try {
                      const entry = watchlistEntry?.id
                        ? await put(`/api/watchlist/${watchlistEntry.id}`, {
                            status: watchlistStatus,
                          })
                        : await post('/api/watchlist', {
                            tmdbId: Number(id),
                            userId,
                            status: watchlistStatus,
                          });
                      setWatchlistEntry(entry);
                    } catch (err) {
                      setWatchlistError(err?.message || 'Unable to update watchlist.');
                    }
                  }}
                >
                  {watchlistEntry?.id ? 'Update watchlist' : 'Add to watchlist'}
                </button>
                {watchlistEntry?.id && (
                  <button
                    type="button"
                    onClick={async () => {
                      setWatchlistError(null);
                      try {
                        await del(`/api/watchlist/${watchlistEntry.id}`);
                        setWatchlistEntry(null);
                      } catch (err) {
                        setWatchlistError(err?.message || 'Unable to remove from watchlist.');
                      }
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </StyledTextColumn>
        </StyledMainContent>
      )}
    </StyledContainer>
  );
}

export default MovieDetailPage;
