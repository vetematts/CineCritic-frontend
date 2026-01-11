// Import packages
import { useState } from "react";
import styled from "styled-components";
import { get } from "../api/api";

// Styled components
// Give the search bar a flat transparent rounded look
const StyledSearchBar = styled.input`
    /* Flat colour with transparency */    
    background-color: #5a5b5f;
    opacity: 0.6; 
    
    /* Round the corners */
    border-radius: 10px; /* More pixel value for more roundness */
    border: 1px solid #ccc; /* Optional: Add a border for visibility */
    padding: 5px; /* Optional: Add padding so text doesn't touch the edges */

    width: 80rem;
    color: #ffffff;
`;

// Search bar handles the processing of any queries submitted anywhere the component exists
function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Stop the default reloading page
        
        const trimmed = searchTerm.trim();
        if (!trimmed) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await get("/api/movies/search", {
                params: { q: trimmed },
            });
            setResults(data || []);
        } catch (err) {
            setError(err?.error || "Unable to load search results.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <form onSubmit = {handleSubmit}>
            <label>
                <StyledSearchBar 
                    type = "text"
                    className = "search-bar"
                    value = {searchTerm} 
                    onChange = {handleSearchTerm}
                    placeholder = "Search"
                />
            </label>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {results.length > 0 && (
                <ul>
                    {results.map((movie) => (
                        <li key = {movie.id || movie.tmdbId}>
                            {movie.title || movie.name}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
}

export default SearchBar;
