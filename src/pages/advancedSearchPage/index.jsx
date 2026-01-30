// Import packges to handle states
import { useState, useEffect } from 'react';

// Import the child components
import { SearchResultCard } from '../../components/searchResultCard';
import { StarRating } from '../../components/starRating';

// Import the API methods
import { get } from '../../api/api';

// Import the CSS Styling for the advanced search page elements
import { 
  StyledComparatorSelect, 
  StyledDropDown, 
  StyledError, 
  StyledFieldsGrid, 
  StyledForm, 
  StyledFormCard, 
  StyledGenreButton, 
  StyledGenreContainer, 
  StyledHelperText, 
  StyledInputs, 
  StyledLabels, 
  StyledLoading, 
  StyledNoResults, 
  StyledRatingInput, 
  StyledRatingRow, 
  StyledResultsContainer, 
  StyledResultsWrapper, 
  StyledSearchRows, 
  StyledStarsRow, 
  StyledSubmitButton
} from './style';

// This is the search results list
export function AdvancedSearchPage() {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [crew, setCrew] = useState('');
  const [ratingComparator, setRatingComparator] = useState('AVERAGE');
  const [rating, setRating] = useState('');
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [genresError, setGenresError] = useState(null);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleReleaseYear = (event) => {
    setReleaseYear(event.target.value);
  };

  const handleFilmCrew = (event) => {
    setCrew(event.target.value);
  };

  const handleRatingDropDown = (event) => {
    setRatingComparator(event.target.value);
  };

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  // Handle genre toggle - click to select/deselect
  const handleGenreToggle = (genreId) => {
    setSelectedGenreIds((prev) => {
      if (prev.includes(genreId)) {
        // Remove genre if already selected
        return prev.filter((id) => id !== genreId);
      } else {
        // Add genre if not selected
        return [...prev, genreId];
      }
    });
  };

  // Fetch available genres from the API on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchGenres = async () => {
      setGenresError(null);
      try {
        const data = await get('/api/movies/genres');
        if (isMounted) {
          setAvailableGenres(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setGenresError(err?.error || 'Unable to load genres.');
        }
      }
    };

    fetchGenres();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setHasSearched(true);

    const filterResults = (items, filters) => {
      const { genreIds, year, minRating, maxRating } = filters;
      return (items || []).filter((movie) => {
        const movieGenres = movie.genre_ids || movie.genres || [];
        const movieYear = movie.release_date?.slice(0, 4) || movie.releaseYear || movie.release_year;
        const movieRating =
          movie.vote_average ?? movie.rating ?? movie.average_rating ?? movie.avg_rating;

        if (genreIds.length > 0) {
          const hasAnyGenre = genreIds.some((id) => movieGenres.includes(id));
          if (!hasAnyGenre) return false;
        }

        if (year && String(movieYear) !== String(year)) {
          return false;
        }

        if (minRating !== undefined && movieRating !== undefined) {
          if (Number(movieRating) < Number(minRating)) return false;
        }

        if (maxRating !== undefined && movieRating !== undefined) {
          if (Number(movieRating) > Number(maxRating)) return false;
        }

        return true;
      });
    };

    // Map the rating comparator to ratingMin/ratingMax query params.
    // Rating comes from StarRating as a string like "2.5" or "0" when not set
    // Convert from our 5-star scale (0-5) to TMDB's 10-point scale (0-10)
    const ratingNum = rating ? Number(rating) : 0;
    let ratingMin;
    let ratingMax;

    // Only process rating if it's a valid number > 0
    if (ratingNum > 0) {
      // Convert 5-star scale to TMDB 10-point scale (multiply by 2)
      // 1 star = 2.0, 2 stars = 4.0, 2.5 stars = 5.0, 4 stars = 8.0, 5 stars = 10.0
      const tmdbRating = (ratingNum * 2).toFixed(1); // Keep 1 decimal for half-stars
      const ratingValue = String(tmdbRating);

      if (ratingComparator === 'AT_MOST') {
        ratingMax = ratingValue;
      } else if (ratingComparator === 'AT_LEAST') {
        ratingMin = ratingValue;
      } else {
        // AVERAGE - use +/- 0.5 stars (1.0 on TMDB's 10-point scale)
        const aroundDelta = 1.0;
        const minValue = Math.max(0, Number(tmdbRating) - aroundDelta).toFixed(1);
        const maxValue = Math.min(10, Number(tmdbRating) + aroundDelta).toFixed(1);
        ratingMin = String(minValue);
        ratingMax = String(maxValue);
      }
    }

    // Convert selected genre IDs array to comma-separated string for API
    const genresParam = selectedGenreIds.length > 0 ? selectedGenreIds.join(',') : undefined;

    try {
      const data = await get('/api/movies/advanced', {
        params: {
          query: title,
          year: releaseYear,
          genres: genresParam,
          crew,
          ratingMin,
          ratingMax,
          page: 1,
        },
      });

      const filtered = filterResults(data, {
        genreIds: selectedGenreIds,
        year: releaseYear,
        minRating: ratingMin,
        maxRating: ratingMax,
      });

      setResults(filtered);
    } catch (err) {
      setError(err?.error || 'Unable to load results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmitSearch}>
      <StyledFormCard>
        <StyledFieldsGrid>
          <StyledSearchRows>
            <StyledLabels>Movie Title</StyledLabels>
            <StyledInputs
              value={title}
              onChange={handleTitle}
              placeholder="Any word in the name of the movie"
            />
          </StyledSearchRows>
          <StyledSearchRows>
            <StyledLabels>Release Year</StyledLabels>
            <StyledInputs
              value={releaseYear}
              onChange={handleReleaseYear}
              placeholder="Any number when the movie was released"
            />
          </StyledSearchRows>
          <StyledSearchRows>
            <StyledLabels>Film Crew</StyledLabels>
            <StyledInputs
              value={crew}
              onChange={handleFilmCrew}
              placeholder="Any word in the name of any film crew members"
            />
          </StyledSearchRows>
          <StyledSearchRows>
            <StyledLabels>Rating</StyledLabels>
            <StyledRatingInput>
              <StyledRatingRow>
                <StyledComparatorSelect value={ratingComparator} onChange={handleRatingDropDown}>
                  <option value="AT_LEAST">At least</option>
                  <option value="AT_MOST">At most</option>
                  <option value="AVERAGE">Average</option>
                </StyledComparatorSelect>
                <StyledStarsRow>
                  <StarRating value={rating || '0'} onChange={handleRating} />
                </StyledStarsRow>
              </StyledRatingRow>
            </StyledRatingInput>
          </StyledSearchRows>
          <StyledSearchRows $fullWidth>
            <StyledLabels>Genres</StyledLabels>
            {genresError ? (
              <StyledHelperText style={{ color: '#ffb4a2' }}>{genresError}</StyledHelperText>
            ) : availableGenres.length > 0 ? (
              <>
                <StyledGenreContainer>
                  {availableGenres.map((genre) => {
                    const isSelected = selectedGenreIds.includes(genre.id);
                    return (
                      <StyledGenreButton
                        key={genre.id}
                        type="button"
                        $isSelected={isSelected}
                        onClick={() => handleGenreToggle(genre.id)}
                        aria-pressed={isSelected}
                      >
                        {genre.name}
                      </StyledGenreButton>
                    );
                  })}
                </StyledGenreContainer>
                {selectedGenreIds.length > 0 && (
                  <StyledHelperText style={{ marginTop: '-6px' }}>
                    {selectedGenreIds.length} genre{selectedGenreIds.length !== 1 ? 's' : ''}{' '}
                    selected
                  </StyledHelperText>
                )}
              </>
            ) : (
              <StyledHelperText>Loading genres...</StyledHelperText>
            )}
          </StyledSearchRows>
          <StyledSearchRows $fullWidth>
            <StyledSubmitButton type="submit">Search with these options</StyledSubmitButton>
          </StyledSearchRows>
        </StyledFieldsGrid>
      </StyledFormCard>

      {/* Results Section */}
      {(loading || error || hasSearched) && (
        <StyledResultsContainer>
          <StyledResultsWrapper>
            {loading && <StyledLoading>Loading...</StyledLoading>}
            {error && <StyledError>{error}</StyledError>}

            {!loading && !error && results.length === 0 && (
              <StyledNoResults>
                No results found. Try adjusting your search criteria.
              </StyledNoResults>
            )}

            {!loading &&
              !error &&
              results.length > 0 &&
              results.map((movie) => (
                <SearchResultCard
                  key={movie.id || movie.tmdbId}
                  id={movie.id || movie.tmdbId}
                  movieId={movie.id || movie.tmdbId}
                  tmdbId={movie.tmdbId}
                  title={movie.title || movie.name}
                  releaseYear={movie.release_year || movie.releaseYear}
                  release_date={movie.release_date}
                  releaseDate={movie.releaseDate}
                  description={movie.overview || movie.description}
                  poster_path={movie.poster_path}
                  posterUrl={movie.posterUrl}
                />
              ))}
          </StyledResultsWrapper>
        </StyledResultsContainer>
      )}
    </StyledForm>
  );
}