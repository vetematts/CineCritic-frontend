import { useState } from "react";

import "./SearchBar.css";

// Search bar handles the processing of any queries submitted anywhere the component exists
function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event) => {
        setSearchTerm(event.target.value)
    };

    return (
        <form>
            <label>
                <input 
                    type = "text"
                    className = "search-bar"
                    value = {searchTerm} 
                    onChange ={handleSubmit}
                    default = "search"
                />
            </label>
        </form>
    );
}

export default SearchBar;