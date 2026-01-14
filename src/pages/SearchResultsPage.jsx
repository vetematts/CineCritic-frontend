// Import packages
import { useEffect, useState } from 'react';
import { get } from '../api/api';
import { useSearchParams } from 'react-router';

import SearchResultCard from '../components/SearchResultCard';

// Takes results as a prop and renders the results
function SearchResults() {
    // Check the URL for the query
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q');   // Checks after "search?q="
    console.log(searchTerm);
    
    // Hooks
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // When this page loads look at the search parameter and check the database
    useEffect(async () => {
        const trimmed = searchTerm.trim();
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
    });

    // if empty return a GET to all movies
    // send a GET to /api/movies/search?q={searchTerm}

    return (
        <>
        <p>{results}</p>
        {/* // Show the query
        // Show the number of results matching
        // if there was nothing
            // Show an error image 
        // else
        
        // {loading && <p>Loading...</p>}
        // {error && <p>{error}</p>}
        // {results.length > 0 && (
        //     // Map the results and generate multiple cards
        //     {results.map((movie) => (
        //         // Show the film cards (OPTIONAL: a maximum of 25 per page)
        //         <SearchResultCard
        //             key = {movie.id}    
        //             title = {movie.title}
        //             releaseYear = {movie.releaseYear}
        //             description = {movie.description}
        //         />
        //     ))}
        // )} */}
        </>
    );
}

export default SearchResults;
