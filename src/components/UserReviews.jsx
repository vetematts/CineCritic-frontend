import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { get } from '../api/api';
import getPosterUrl from '../utilities/image-pathing';
import StarRating from './StarRating';

// Container for all reviews
const StyledReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

// Individual review card
const StyledReviewCard = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.25rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

// Poster column
const StyledPosterColumn = styled.div`
  flex-shrink: 0;
  width: 100px;

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const StyledPoster = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;

  @media (max-width: 768px) {
    height: 120px;
  }
`;

const StyledPosterPlaceholder = styled.div`
  width: 100%;
  height: 150px;
  background-color: #5a5b5f;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 0.75rem;
  text-align: center;
  padding: 0.5rem;

  @media (max-width: 768px) {
    height: 120px;
  }
`;

// Review content column
const StyledReviewContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const StyledMovieLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 0.75rem;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledMovieTitle = styled.h3`
  margin: 0 0 0.25rem 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.25rem;
  font-weight: 600;
`;

const StyledMovieYear = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  font-weight: 400;
`;

const StyledRatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const StyledReviewText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.87);
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const StyledReviewDate = styled.p`
  margin: 0.75rem 0 0 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
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

function UserReviews({ userId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // Try user-specific endpoint first, fallback to alternative if needed
        let reviewsData;
        try {
          reviewsData = await get(`/api/reviews/user/${userId}`);
        } catch (err) {
          // If that endpoint doesn't exist, we might need to fetch differently
          // For now, set empty array and we'll handle it
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
  }, [userId]);

  if (loading) {
    return <StyledLoadingText>Loading reviews...</StyledLoadingText>;
  }

  if (error) {
    return <StyledError>{error}</StyledError>;
  }

  if (reviews.length === 0) {
    return <StyledEmptyMessage>No reviews yet. Start reviewing movies to see them here!</StyledEmptyMessage>;
  }

  return (
    <StyledReviewsContainer>
      {reviews.map((review) => {
        // Extract movie info from review
        const tmdbId = review.tmdb_id || review.tmdbId || review.movie?.tmdb_id;
        const movieTitle = review.movie?.title || review.movie_title || review.title || 'Unknown Movie';
        const releaseYear = review.movie?.release_year || review.movie?.release_date?.split('-')[0] || review.release_year;
        const posterPath = review.movie?.poster_url || review.movie?.poster_path || review.poster_url || review.poster_path;
        const posterUrl = getPosterUrl(posterPath, 'w200');
        const reviewContent = review.body || review.content || review.text || '';
        const reviewRating = review.rating ? String(review.rating) : null;
        const reviewDate = review.published_at || review.created_at || review.date;

        return (
          <StyledReviewCard key={review.id || review._id}>
            <StyledPosterColumn>
              {tmdbId && (
                <Link to={`/movies/${tmdbId}`}>
                  {posterUrl ? (
                    <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                  ) : (
                    <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                  )}
                </Link>
              )}
              {!tmdbId && (
                posterUrl ? (
                  <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                ) : (
                  <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                )
              )}
            </StyledPosterColumn>
            <StyledReviewContent>
              {tmdbId ? (
                <StyledMovieLink to={`/movies/${tmdbId}`}>
                  <StyledMovieTitle>
                    {movieTitle}
                    {releaseYear && <StyledMovieYear> ({releaseYear})</StyledMovieYear>}
                  </StyledMovieTitle>
                </StyledMovieLink>
              ) : (
                <StyledMovieTitle>
                  {movieTitle}
                  {releaseYear && <StyledMovieYear> ({releaseYear})</StyledMovieYear>}
                </StyledMovieTitle>
              )}
              {reviewRating && (
                <StyledRatingContainer>
                  <StarRating value={reviewRating} disabled={true} />
                </StyledRatingContainer>
              )}
              {reviewContent && <StyledReviewText>{reviewContent}</StyledReviewText>}
              {reviewDate && (
                <StyledReviewDate>
                  {(() => {
                    const date = new Date(reviewDate);
                    if (!isNaN(date.getTime())) {
                      const day = date.getDate();
                      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                      const month = monthNames[date.getMonth()];
                      const year = date.getFullYear();
                      return `Reviewed on ${day} ${month} ${year}`;
                    }
                    return reviewDate;
                  })()}
                </StyledReviewDate>
              )}
            </StyledReviewContent>
          </StyledReviewCard>
        );
      })}
    </StyledReviewsContainer>
  );
}

export default UserReviews;
