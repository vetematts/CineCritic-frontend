// Import packages
import { useEffect, useState } from 'react';
import { get } from '../api/api';
import { useSearchParams } from 'react-router';
import styled from 'styled-components';

import { SearchResultCard } from '../components/searchResultCard';

// Container for search results with proper constraints
const StyledSearchResultsContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 1rem;
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

// Takes results as a prop and renders the results
function SearchResults() {
  // Check the URL for the query
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q'); // Checks after "search?q="
  const trimmedSearch = searchTerm?.trim() ?? '';

  // Hooks
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // When this page loads look at the search parameter and check the database
  useEffect(() => {
    const fetchData = async () => {
      if (!trimmedSearch) {
        return;
      }

      // Query the backend search endpoint with the user's term.
      setLoading(true);
      setError(null);

      try {
        const data = await get('/api/movies/search', {
          params: { q: trimmedSearch },
        });
        setResults(data || []);
      } catch (err) {
        setError(err?.error || 'Unable to load search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trimmedSearch]);

  return (
    <StyledSearchResultsContainer>
      {loading && <StyledLoading>Loading...</StyledLoading>}
      {error && <StyledError>{error}</StyledError>}

      {!loading && !error && searchTerm !== null && trimmedSearch === '' && (
        <StyledNoResults>There are no movies that matched your search.</StyledNoResults>
      )}

      {!loading && !error && results.length === 0 && trimmedSearch && (
        <StyledNoResults>No results found for "{searchTerm}".</StyledNoResults>
      )}

      {results.length > 0 &&
        results.map((movie) => (
          <SearchResultCard
            key={movie.id}
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
    </StyledSearchResultsContainer>
  );
}

export default SearchResults;
