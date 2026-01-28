// Import packges
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { get } from '../api/api';
import SearchResultCard from '../components/SearchResultCard';
import StarRating from '../components/StarRating';

// Styled components
// This is the flex container for all the inputs
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  /* Set the form to be 100% of the main's width */
  width: 100%;
`;

const StyledFormCard = styled.section`
  width: 80%;
  padding: 2rem;
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(20, 24, 30, 0.9), rgba(12, 16, 22, 0.95));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 20px 45px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
    border-radius: 12px;
  }
`;

const StyledFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem 2rem;
  width: 100%;
  margin: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    gap: 1rem;
  }
`;

const StyledSearchRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;

  ${(props) =>
    props.$fullWidth &&
    `
    grid-column: 1 / -1;
  `}
`;

// Give all the labels uniform color
const StyledLabels = styled.label`
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;

  /* Response design */
  display: flex;
  align-items: flex-start;

  /* Spacing between itself and its input */
  padding: 0;
`;

// White background input fields with slight rounded corners
// with spacing to break up and declutter the page
const StyledInputs = styled.input`
  /* White background */
  background-color: #ffffffff;
  opacity: 0.9;

  /* Dark text color for visibility on white background */
  color: #242424;

  /* Round the corners */
  border-radius: 10px;
  padding: 0.55rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  /* Set responsive design */
  display: flex;
  flex: 1; /* Shrink and grow in proportion to window size */
  flex-basis: 100%; /* Input will take up an entire row */

  /* Space away from other items */
  margin: 0;

  &::placeholder {
    color: rgba(36, 36, 36, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
  }
`;

// Flexible drop down that fits in next to its input field
const StyledDropDown = styled.select`
  /* Make the drop down responsive */
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;

  /* Dark text color for visibility */
  color: #242424;
  background-color: #ffffffff;
  border-radius: 10px;
  padding: 0.55rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  /* Space away from other items */
  margin: 0;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
  }
`;

// Container for genre buttons/pills
const StyledGenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
  flex-basis: 100%;
  margin: 0;
`;

// Genre button/pill - clickable to toggle selection
const StyledGenreButton = styled.button`
  /* Unselected state */
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Selected state */
  ${(props) =>
    props.$isSelected &&
    `
    background-color: #cec8c8ff;
    color: #242424;
    border-color: #cec8c8ff;
    font-weight: 600;
  `}

  /* Hover state */
  &:hover {
    background-color: ${(props) => (props.$isSelected ? '#d6d0d0' : 'rgba(255, 255, 255, 0.2)')};
    border-color: ${(props) => (props.$isSelected ? '#d6d0d0' : 'rgba(255, 255, 255, 0.5)')};
    transform: translateY(-1px);
  }

  /* Active/pressed state */
  &:active {
    transform: translateY(0);
  }
`;

// Container for rating selection with stars and comparator
const StyledRatingInput = styled.div`
  /* Set responsive design */
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  flex-basis: 100%;
  width: 100%;
`;

const StyledRatingRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 150px) max-content;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }
`;

const StyledStarsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 8%;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

// Comparator dropdown styling
const StyledComparatorSelect = styled.select`
  /* White background matching other inputs */
  background-color: #ffffffff;
  color: #242424;
  opacity: 0.9;
  border-radius: 10px;
  padding: 0.75rem 0.8rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex: 1;
  flex-basis: 100%;
  margin: 0;
  min-height: 42px;
  width: 150px;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
  }
`;

const StyledHelperText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
`;

// Space the submit button further away from the last query input
const StyledSubmitButton = styled.button`
  /* Make the button appear left for left reading */
  align-self: flex-start;

  /* Roughly 50px distance between this and the Genres input field */
  margin: 1rem 0 0 0;

  /* Give the button a bit more meat */
  height: 36px;
  padding: 0 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Container for search results - matches form width and styling
const StyledResultsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
`;

// Results wrapper to match form's width constraint (80%)
const StyledResultsWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 0.5rem;
  }
`;

const StyledLoading = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
  padding: 2rem;
`;

const StyledError = styled.p`
  color: #ffb4a2;
  text-align: center;
  padding: 2rem;
`;

const StyledNoResults = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  padding: 2rem;
`;

// This is the search results list
function AdvancedSearchPage() {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [crew, setCrew] = useState('');
  const [ratingComparator, setRatingComparator] = useState('EQUAL_TO');
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

      if (ratingComparator === 'LESS_THAN' || ratingComparator === 'LESS_OR_EQUAL') {
        ratingMax = ratingValue;
      } else if (ratingComparator === 'GREATER_THAN' || ratingComparator === 'GREATER_OR_EQUAL') {
        ratingMin = ratingValue;
      } else {
        // EQUAL_TO - set both min and max to the same value
        ratingMin = ratingValue;
        ratingMax = ratingValue;
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

      setResults(data || []);
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
                  <option value="LESS_THAN">Less than</option>
                  <option value="LESS_OR_EQUAL">Less or equal to</option>
                  <option value="EQUAL_TO">Equal to</option>
                  <option value="GREATER_THAN">Greater than</option>
                  <option value="GREATER_OR_EQUAL">Greater or equal to</option>
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

export default AdvancedSearchPage;
