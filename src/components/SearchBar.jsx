// Import packages
import { useState } from "react";
import styled from "styled-components";

// Styled components
const StyledForm = styled.form`
    display: flex;
    flex: 1;
`;

// Give the search bar a flat transparent rounded look
const StyledSearchBar = styled.input`
    // Flat colour with transparency
    background-color: #5a5b5f;
    opacity: 0.6; 
    
    // Round the corners
    border-radius: 10px; /* More pixel value for more roundness */
    border: 1px solid #ccc; /* Optional: Add a border for visibility */
    padding: 5px; /* Optional: Add padding so text doesn't touch the edges */

    min-width: 5rem;
    flex-basis: 80rem;
    color: #ffffff;
`;

// Search bar handles the processing of any queries submitted anywhere the component exists
function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault(); // Stop the default reloading page
        
        // Send a GET request with the search term to /films
        // Once we have the results back 
        // SUCCESS: Navigate to the search results page
        // FAIL: Send error message
    };

    const handleSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <StyledForm onSubmit = {handleSubmit}>
            <StyledSearchBar 
                type = "text"
                className = "search-bar"
                value = {searchTerm} 
                onChange = {handleSearchTerm}
                placeholder = "Search"
            />
        </StyledForm>
    );
}

export default SearchBar;