// Import packages to handle different states
import { useEffect, useMemo, useState } from 'react';

// Import utilities - For handling API methods and 
// finding the url path to poster images
import { get } from '../../api/api';
import getPosterUrl from '../../utils/image-pathing';

// Import the CSS styling for the discover page elements
import { 
  StyledCard, 
  StyledDiscoverContainer, 
  StyledError, 
  StyledGrid, 
  StyledHeader, 
  StyledLabel, 
  StyledMovieTitle, 
  StyledPageButton, 
  StyledPageMeta, 
  StyledPagination, 
  StyledPoster, 
  StyledPosterFallback, 
  StyledPosterFrame, 
  StyledPosterLink, 
  StyledRatingRow, 
  StyledRatingText, 
  StyledSelect, 
  StyledStarBase, 
  StyledStarFill, 
  StyledStarWrapper, 
  StyledStatus, 
  StyledSubtitle, 
  StyledTitle, 
  StyledTitleGroup, 
  StyledToolbar
} from './style';

const starPath = (
  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.89a1 1 0 00-1.176 0l-3.976 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.518-4.674z" />
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

export function DiscoverPage() {
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