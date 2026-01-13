import SearchResultCard from "../components/SearchResultCard";

function SearchResults() {
    return (
        // Show the query
        // Show the number of results matching
        // if there was nothing
            // Show an error image 
        // else
            // Show the film cards a maximum of 25 per page
            <SearchResultCard
                title = {title}
                releaseYear = {releaseYear}
                description = {description}
            />
    );
}

export default SearchResults;