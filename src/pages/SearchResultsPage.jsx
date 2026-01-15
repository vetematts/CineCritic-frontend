// Import packages
import { useEffect, useState } from 'react';
import { get } from '../api/api';
import { useSearchParams } from 'react-router';

import SearchResultCard from '../components/SearchResultCard';

// Takes results as a prop and renders the results
function SearchResults() {
  // Check the URL for the query
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q'); // Checks after "search?q="
  console.log(searchTerm);

  // Hooks
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // When this page loads look at the search parameter and check the database
  useEffect(() => {
    const fetchData = async () => {
      const trimmed = searchTerm?.trim();
      if (!trimmed) {
        return;
      }

      // Query the backend search endpoint with the user's term.
      setLoading(true);
      setError(null);

      try {
        const data = await get('/api/movies/search', {
          params: { q: trimmed },
        });
        setResults(data || []);
      } catch (err) {
        setError(err?.error || 'Unable to load search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && results.length === 0 && searchTerm?.trim() && <p>No results found.</p>}

      {results.length > 0 &&
        results.map((movie) => (
          <SearchResultCard
            key={movie.id}
            title={movie.title || movie.name}
            releaseYear={movie.release_year || movie.releaseYear}
            description={movie.overview || movie.description}
            poster_path={movie.poster_path}
            posterUrl={movie.posterUrl}
          />
        ))}
    </>
  );
}

export default SearchResults;
