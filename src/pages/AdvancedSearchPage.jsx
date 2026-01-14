// Import packges
import { useState } from 'react';
import styled from 'styled-components';
import { get } from '../api/api';

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

const StyledSearchRows = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  /* Allow the columns to shrink and grow depending on the screen size */
  flex: 1;

  /* Space the columns so they are now 1 column per row in mobile resolution */
  width: 80%;
  margin: 1rem;
`;

// Give all the labels the same gold colouring as headings
const StyledLabels = styled.label`
  /* Same golden font as the headings */
  color: #e9da57;

  /* Response design */
  display: flex;
  align-items: flex-start;

  /* Spacing between itself and its input */
  padding: 2px;
`;

// White background input fields with slight rounded corners
// with spacing to break up and declutter the page
const StyledInputs = styled.input`
  /* White background */
  background-color: #ffffffff;
  opacity: 0.9;

  /* Round the corners */
  border-radius: 10px; /* More pixel value for more roundness */
  padding: 5px; /* Optional: Add padding so text doesn't touch the edges */

  /* Set responsive design */
  display: flex;
  flex: 1; /* Shrink and grow in proportion to window size */
  flex-basis: 100%; /* Input will take up an entire row */

  /* Space away from other items */
  margin: 5px 0 20px 0;
`;

// Flexible drop down that fits in next to its input field
const StyledDropDown = styled.select`
  /* Make the drop down responsive */
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;

  /* Space away from other items */
  margin: 5px 5px 20px 0;
`;

// Create a div container for the ratings drop down and input
const StyledRatingInput = styled.div`
  /* Set responsive design */
  display: flex;
  justify-content: flex-start;
  flex: 1;
  flex-basis: 100%;
  flex-wrap: nowrap;

  /* This container is 80% of the main's width */
  width: 80%;
`;

// Space the submit button further away from the last query input
const StyledSubmitButton = styled.button`
  /* Make the button appear left for left reading */
  align-self: flex-start;

  /* Roughly 50px distance between this and the Genres input field */
  margin: 4rem 0 0 0;

  /* Give the button a bit more meat */
  height: 30px;
`;

// This is the search results list
function AdvancedSearchPage() {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [crew, setCrew] = useState('');
  const [ratingComparator, setRatingComparator] = useState('EQUAL_TO');
  const [rating, setRating] = useState('');
  const [genres, setGenres] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleRating = (event) => {
    setRating(event.target.value);
  };

  const handleGenres = (event) => {
    setGenres(event.target.value);
  };

  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Map the rating comparator to ratingMin/ratingMax query params.
    const trimmedRating = rating.trim();
    let ratingMin;
    let ratingMax;

    if (trimmedRating) {
      if (ratingComparator === 'LESS_THAN' || ratingComparator === 'LESS_OR_EQUAL') {
        ratingMax = trimmedRating;
      } else if (ratingComparator === 'GREATER_THAN' || ratingComparator === 'GREATER_OR_EQUAL') {
        ratingMin = trimmedRating;
      } else {
        ratingMin = trimmedRating;
        ratingMax = trimmedRating;
      }
    }

    try {
      const data = await get('/api/movies/advanced', {
        params: {
          query: title,
          year: releaseYear,
          genres,
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
          <StyledDropDown value={ratingComparator} onChange={handleRatingDropDown}>
            {/* HTML entity codes: &lt is < and &gt is > */}
            <option value="LESS_THAN">Less than</option>
            <option value="LESS_OR_EQUAL">Less or equal to</option>
            <option value="EQUAL_TO">Equal to</option>
            <option value="GREATER_THAN">Greater than</option>
            <option value="GREATER_OR_EQUAL">Greater or equal to</option>
          </StyledDropDown>
          <StyledInputs
            value={rating}
            onChange={handleRating}
            placeholder="Any number between 0 and 5"
          />
        </StyledRatingInput>
      </StyledSearchRows>
      <StyledSearchRows>
        <StyledLabels>Genres</StyledLabels>
        <StyledInputs value={genres} onChange={handleGenres} placeholder="Enter any genre" />
      </StyledSearchRows>
      <StyledSearchRows>
        <StyledSubmitButton type="submit">Search with these options</StyledSubmitButton>
      </StyledSearchRows>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {results.length > 0 && (
        <ul>
          {results.map((movie) => (
            <li key={movie.id || movie.tmdbId}>{movie.title || movie.name}</li>
          ))}
        </ul>
      )}
    </StyledForm>
  );
}

export default AdvancedSearchPage;
