import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { get, post, put, del } from '../api/api';
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
                {user?.id &&
                  (review.userId === user.id || review.user?.id === user.id) &&
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
                      <select
                        value={editingRating}
                        onChange={(event) => setEditingRating(event.target.value)}
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
