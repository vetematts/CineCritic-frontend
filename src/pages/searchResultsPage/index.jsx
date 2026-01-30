// Import packages
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

// Import the utilities
import { get } from '../../api/api';

// Import the result card child components to fill up the search results
import { SearchResultCard } from '../../components/searchResultCard';

// Import the CSS styling for the search results page elements
import { 
  StyledError, 
  StyledLoading, 
  StyledNoResults, 
  StyledSearchResultsContainer 
} from './style';

// Takes results as a prop and renders the results
export function SearchResultsPage() {
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