import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { get } from '../api/api';
import getPosterUrl from '../utilities/image-pathing';

const StyledDiscoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 76%;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const StyledTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const StyledTitle = styled.h2`
  margin: 0;
  color: #cec8c8ff;
  font-size: 1.6rem;
  letter-spacing: 0.02em;
`;

const StyledSubtitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
`;

const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const StyledLabel = styled.label`
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
`;

const StyledSelect = styled.select`
  background-color: #ffffff;
  color: #242424;
  border-radius: 8px;
  padding: 0.35rem 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 0.9rem;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1.1rem 0.85rem;
  width: 100%;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const StyledPosterLink = styled(NavLink)`
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

const StyledPosterFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const StyledMovieTitle = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledRatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const StyledStarWrapper = styled.span`
  position: relative;
  width: 0.85rem;
  height: 0.85rem;
  display: inline-block;
`;

const StyledStarBase = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: rgba(255, 255, 255, 0.18);
`;

const StyledStarFill = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: #e9da57;
`;

const StyledRatingText = styled.span`
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.75rem;
  margin-left: 0.2rem;
`;

const StyledStatus = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 2rem 0;
`;

const StyledError = styled.p`
  text-align: center;
  color: #ffb4a2;
  padding: 2rem 0;
`;

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0.5rem 0 1.5rem 0;
  flex-wrap: wrap;
`;

const StyledPageButton = styled.button`
  padding: 0.35rem 0.75rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const StyledPageMeta = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
`;

const starPath = (
  <path d="M12 2l2.4 4.9 5.4 0.8-3.9 3.8 0.9 5.4-4.8-2.5-4.8 2.5 0.9-5.4-3.9-3.8 5.4-0.8z" />
);

function RatingStars({ value }) {
  const safeValue = Math.max(0, Math.min(5, value || 0));
  const stars = [0, 1, 2, 3, 4];

  return (
    <StyledRatingRow>
      {stars.map((index) => {
        const starValue = index + 1;
        const isFilled = safeValue >= starValue;
        const isHalfFilled = safeValue > index && safeValue < starValue;
        const clip = isHalfFilled ? 'inset(0 50% 0 0)' : 'inset(0 0 0 0)';

        return (
          <StyledStarWrapper key={index} aria-hidden="true">
            <StyledStarBase viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
              {starPath}
            </StyledStarBase>
            {(isFilled || isHalfFilled) && (
              <StyledStarFill
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                style={{ clipPath: clip }}
              >
                {starPath}
              </StyledStarFill>
            )}
          </StyledStarWrapper>
        );
      })}
    </StyledRatingRow>
  );
}

function DiscoverPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [sort, setSort] = useState('popularity.desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [columns, setColumns] = useState(6);

  useEffect(() => {
    let isMounted = true;

    const loadDiscover = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await get('/api/movies/advanced', {
          params: {
            page,
          },
        });

        const results = Array.isArray(data) ? data : data?.results || [];
        const total =
          !Array.isArray(data) && (data?.total_pages || data?.totalPages)
            ? Number(data?.total_pages || data?.totalPages)
            : null;

        if (isMounted) {
          setMovies(results);
          setTotalPages(total && Number.isFinite(total) ? total : null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || err?.error || 'Unable to load discover feed.');
          setMovies([]);
          setTotalPages(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasLoaded(true);
        }
      }
    };

    loadDiscover();

    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    const getColumnsForWidth = (width) => {
      if (width < 520) return 2;
      if (width < 720) return 3;
      if (width < 980) return 4;
      if (width < 1200) return 5;
      return 6;
    };

    const updateColumns = () => {
      if (typeof window === 'undefined') return;
      setColumns(getColumnsForWidth(window.innerWidth));
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);

    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const canGoPrev = page > 1 && !loading;
  const canGoNext = useMemo(() => {
    if (loading) return false;
    if (totalPages) return page < totalPages;
    return movies.length > 0;
  }, [loading, movies.length, page, totalPages]);

  const sortedMovies = useMemo(() => {
    if (!movies || movies.length === 0) return [];
    if (sort === 'vote_average.desc') {
      return [...movies].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    }
    if (sort === 'primary_release_date.desc') {
      return [...movies].sort((a, b) => {
        const dateA = new Date(a.release_date || a.releaseDate || 0).getTime();
        const dateB = new Date(b.release_date || b.releaseDate || 0).getTime();
        return dateB - dateA;
      });
    }
    return movies;
  }, [movies, sort]);

  const displayMovies = useMemo(() => {
    if (!sortedMovies.length) return [];
    if (!columns || columns <= 1) return sortedMovies;
    const remainder = sortedMovies.length % columns;
    if (remainder === 0) return sortedMovies;
    const count = sortedMovies.length - remainder;
    return count > 0 ? sortedMovies.slice(0, count) : sortedMovies;
  }, [columns, sortedMovies]);

  return (
    <StyledDiscoverContainer>
      <StyledHeader>
        <StyledTitleGroup>
          <StyledTitle>Discover</StyledTitle>
        </StyledTitleGroup>
        <StyledToolbar>
          <StyledLabel htmlFor="discover-sort">Sort</StyledLabel>
          <StyledSelect
            id="discover-sort"
            value={sort}
            onChange={(event) => {
              setPage(1);
              setSort(event.target.value);
            }}
          >
            <option value="popularity.desc">Popularity</option>
            <option value="vote_average.desc">Top Rated</option>
            <option value="primary_release_date.desc">Newest</option>
          </StyledSelect>
        </StyledToolbar>
      </StyledHeader>

      {loading && <StyledStatus>Loading movies...</StyledStatus>}
      {error && <StyledError>{error}</StyledError>}

      {!loading && !error && hasLoaded && movies.length === 0 && (
        <StyledStatus>No movies found.</StyledStatus>
      )}

      {!loading && !error && displayMovies.length > 0 && (
        <StyledGrid>
          {displayMovies.map((movie) => {
            const movieId = movie.id || movie.tmdbId;
            const posterUrl = getPosterUrl(movie.poster_path || movie.posterUrl, 'w300');
            const title = movie.title || movie.name || 'Untitled';
            const ratingValue = movie.vote_average ? Number(movie.vote_average) / 2 : 0;
            const ratingLabel = movie.vote_average ? Number(movie.vote_average).toFixed(1) : null;

            return (
              <StyledCard key={movieId || title}>
                <StyledPosterLink to={movieId ? `/movies/${movieId}` : '#'}>
                  <StyledPosterFrame>
                    {posterUrl ? (
                      <StyledPoster src={posterUrl} alt={`${title} poster`} />
                    ) : (
                      <StyledPosterFallback>No poster</StyledPosterFallback>
                    )}
                  </StyledPosterFrame>
                </StyledPosterLink>
                <StyledMovieTitle title={title}>{title}</StyledMovieTitle>
                <div>
                  <RatingStars value={ratingValue} />
                  {ratingLabel && <StyledRatingText>{ratingLabel}</StyledRatingText>}
                </div>
              </StyledCard>
            );
          })}
        </StyledGrid>
      )}

      <StyledPagination>
        <StyledPageButton
          type="button"
          disabled={!canGoPrev}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          Previous
        </StyledPageButton>
        <StyledPageMeta>
          Page {page}
          {totalPages ? ` of ${totalPages}` : ''}
        </StyledPageMeta>
        <StyledPageButton
          type="button"
          disabled={!canGoNext}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </StyledPageButton>
      </StyledPagination>
    </StyledDiscoverContainer>
  );
}

export default DiscoverPage;
