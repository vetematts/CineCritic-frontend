import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { get, post } from '../api/api';
import { useAuth } from '../contexts/AuthContext';

const StyledContainer = styled.section`
  width: 100rem;
  padding: 1rem 0 2rem 0;
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

function MovieDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewBody, setReviewBody] = useState('');
  const [reviewRating, setReviewRating] = useState('5');
  const [reviewError, setReviewError] = useState(null);

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
          setError(err?.error || 'Unable to load movie details.');
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

  return (
    <StyledContainer>
      {loading && <p>Loading...</p>}
      {error && <StyledError>{error}</StyledError>}
      {!loading && movie && (
        <>
          <StyledTitle>{movie.title || movie.name}</StyledTitle>
          {movie.release_date && <StyledMeta>Released {movie.release_date}</StyledMeta>}
          {movie.runtime && <StyledMeta>Runtime {movie.runtime} minutes</StyledMeta>}
          {movie.vote_average && <StyledMeta>Rating {movie.vote_average}</StyledMeta>}
          {movie.overview && <p>{movie.overview}</p>}
        </>
      )}
      {!loading && reviews.length > 0 && (
        <>
          <h3>Reviews</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review.id || review._id}>
                <p>{review.content || review.text}</p>
                {review.rating && <StyledMeta>Rating {review.rating}</StyledMeta>}
                {review.author && <StyledMeta>By {review.author}</StyledMeta>}
              </li>
            ))}
          </ul>
        </>
      )}
      {!loading && (
        <>
          <h3>Write a review</h3>
          {!user && <p>Please log in to submit a review.</p>}
          {reviewError && <StyledError>{reviewError}</StyledError>}
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (!user?.id) {
                setReviewError('You must be logged in.');
                return;
              }

              setReviewError(null);
              try {
                await post('/api/reviews', {
                  tmdbId: Number(id),
                  userId: user.id,
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
              <select
                value={reviewRating}
                onChange={(event) => setReviewRating(event.target.value)}
                disabled={!user}
              >
                <option value="0.5">0.5</option>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                <option value="3.5">3.5</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
              </select>
            </label>
            <label>
              Review
              <textarea
                value={reviewBody}
                onChange={(event) => setReviewBody(event.target.value)}
                disabled={!user}
              />
            </label>
            <button type="submit" disabled={!user}>
              Submit review
            </button>
          </form>
        </>
      )}
    </StyledContainer>
  );
}

export default MovieDetailPage;
