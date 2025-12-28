import { useState } from "react";

import "./SearchBar.css";

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
        <form onSubmit = {handleSubmit}>
            <label>
                <input 
                    type = "text"
                    className = "search-bar"
                    value = {searchTerm} 
                    onChange = {handleSearchTerm}
                    default = "search"
                />
            </label>
        </form>
    );
}

export default SearchBar;