// Import packages
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import authorisation and security methods
import { useAuth } from '../../contexts/AuthContext';

// Import utilies
import { get, post, put, del } from '../../api/api';
import getPosterUrl from '../../utils/image-pathing';

// Import child components
import { StarRating } from '../../components/starRating';
import { MovieReviewPanel } from '../../components/movieReviewPanel';

// Import image assets
import CalendarIcon from '../../assets/CalendarIcon';
import ClockIcon from '../../assets/ClockIcon';
import BackArrowIcon from '../../assets/BackArrowIcon';

// Import the CSS styling of the movie details page elements
import {
  StyledActionButtons,
  StyledAverageRating,
  StyledAverageRatingLabel,
  StyledAverageRatingValue,
  StyledBackButton,
  StyledCancelButton,
  StyledCloseButton,
  StyledContainer,
  StyledError,
  StyledFavouriteButton,
  StyledGenrePill,
  StyledGenrePills,
  StyledHeading,
  StyledMainContent,
  StyledMeta,
  StyledMetaContainer,
  StyledMetaItem,
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
  StyledMovieDetails,
  StyledOpenReviewButton,
  StyledParagraph,
  StyledPoster,
  StyledPosterColumn,
  StyledPosterPlaceholder,
  StyledSignInLink,
  StyledSignInPrompt,
  StyledSignInReviewButton,
  StyledSignInText,
  StyledSubmitButton,
  StyledTextColumn,
  StyledTitle,
  StyledWatchlistButton,
} from './style';

export function MovieDetailPage() {
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
  const [favouritesEntry, setFavouritesEntry] = useState(null);
  const [favouritesError, setFavouritesError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingBody, setEditingBody] = useState('');
  const [editingRating, setEditingRating] = useState('5');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [genreMap, setGenreMap] = useState(null);

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
    if (!isReviewModalOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsReviewModalOpen(false);
        setEditingReviewId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReviewModalOpen]);

  useEffect(() => {
    if (!movie?.genre_ids?.length) {
      return;
    }

    let isMounted = true;

    const loadGenres = async () => {
      try {
        const data = await get('/api/movies/genres');
        if (isMounted && Array.isArray(data)) {
          const map = data.reduce((acc, genre) => {
            if (genre?.id && genre?.name) {
              acc[genre.id] = genre.name;
            }
            return acc;
          }, {});
          setGenreMap(map);
        }
      } catch {
        if (isMounted) {
          setGenreMap(null);
        }
      }
    };

    loadGenres();

    return () => {
      isMounted = false;
    };
  }, [movie?.genre_ids]);

  const topGenres = useMemo(() => {
    if (!movie) return [];
    if (Array.isArray(movie.genres) && movie.genres.length > 0) {
      return movie.genres
        .map((genre) => genre?.name)
        .filter(Boolean)
        .slice(0, 3);
    }
    if (Array.isArray(movie.genre_ids) && genreMap) {
      return movie.genre_ids
        .map((idValue) => genreMap[idValue])
        .filter(Boolean)
        .slice(0, 3);
    }
    return [];
  }, [genreMap, movie]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    let isMounted = true;

    const loadWatchlistEntry = async () => {
      try {
        const data = await get(`/api/watchlist/${userId}`);
        if (isMounted) {
          const entry = (data || []).find((item) => item.tmdb_id === Number(id));
          setWatchlistEntry(entry || null);
        }
      } catch (err) {
        if (isMounted) {
          setWatchlistError(err?.message || 'Unable to load watchlist.');
        }
      }
    };

    const loadFavouritesEntry = async () => {
      try {
        const data = await get(`/api/favourites/${userId}`);
        if (isMounted) {
          const entry = (data || []).find((item) => item.tmdb_id === Number(id));
          setFavouritesEntry(entry || null);
        }
      } catch (err) {
        if (isMounted) {
          setFavouritesError(err?.message || 'Unable to load favourites.');
        }
      }
    };

    loadWatchlistEntry();
    loadFavouritesEntry();

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
                  <StyledFavouriteButton
                    type="button"
                    onClick={async () => {
                      setFavouritesError(null);
                      try {
                        if (favouritesEntry) {
                          // Remove from favourites
                          await del(`/api/favourites/${userId}/${id}`);
                          setFavouritesEntry(null);
                        } else {
                          // Add to favourites
                          await post('/api/favourites', {
                            userId,
                            tmdbId: Number(id),
                          });
                          // Reload favourites to get updated state
                          const data = await get(`/api/favourites/${userId}`);
                          const entry = (data || []).find((item) => item.tmdb_id === Number(id));
                          setFavouritesEntry(entry || { tmdb_id: Number(id) });
                        }
                      } catch (err) {
                        setFavouritesError(err?.message || 'Unable to update favourites.');
                      }
                    }}
                  >
                    {favouritesEntry ? 'Remove from Favourites' : 'Add to Favourites'}
                  </StyledFavouriteButton>
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
            {favouritesError && <StyledError>{favouritesError}</StyledError>}
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
              {topGenres.length > 0 && (
                <StyledGenrePills>
                  {topGenres.map((genre) => (
                    <StyledGenrePill key={genre}>{genre}</StyledGenrePill>
                  ))}
                </StyledGenrePills>
              )}
              {movie.overview && (
                <>
                  <StyledHeading>Overview</StyledHeading>
                  <StyledParagraph>{movie.overview}</StyledParagraph>
                </>
              )}
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
                <MovieReviewPanel
                  reviewsArray={reviews}
                  currentUserId={user?.id}
                  onEdit={(review) => {
                    const reviewId = review.id || review._id;
                    setEditingReviewId(reviewId);
                    setEditingBody(review.body || review.content || review.text || '');
                    setEditingRating(String(review.rating || '5'));
                    setIsReviewModalOpen(true);
                  }}
                  onDelete={async (review) => {
                    setReviewError(null);
                    try {
                      await del(`/api/reviews/${review.id || review._id}`);
                      const updated = await get(`/api/reviews/${id}`);
                      setReviews(updated || []);
                    } catch (err) {
                      setReviewError(err?.message || 'Unable to delete review.');
                    }
                  }}
                />
              </>
            )}
          </StyledTextColumn>
        </StyledMainContent>
      )}
    </StyledContainer>
  );
}
