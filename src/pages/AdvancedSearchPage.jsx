import { useState } from "react";

function AdvancedSearchPage() {
    const [title, setTitle] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [crew, setCrew] = useState("");
    const [ratingComparator, setRatingComparator] = useState("EQUAL_TO");
    const [rating, setRating] = useState(0);
    const [genres, setGenres] = useState("");

    const handleTitle = (event) => {
        setTitle(event.title.value);
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

    const handleSubmitSearch = () => {
        // Take all the states and apply them to 
        // the GET query with multiple terms
    };

    return (
        <form>
            <label>
                Movie Title
            </label>
            <input 
                value = {title} 
                onChange = {handleTitle}
                placeholder = "Any word in the name of the movie"
            />
            <label>
                Release Year
            </label>
            <input 
                value = {releaseYear} 
                onChange = {handleReleaseYear}
                placeholder = "Any number when the movie was released"
            />
            <label>
                Film Crew
            </label>
            <input 
                value = {crew} 
                onChange = {handleFilmCrew}
                placeholder = "Any word in the name of any film crew members"
            />
            <label>
                Rating
            </label>
            <select 
                value = {ratingComparator} 
                onChange = {handleRatingDropDown}
            >
                {/* HTML entity codes: &lt is < and &gt is > */}
                <option value = "LESS_THAN">Less than</option> 
                <option value = "LESS_OR_EQUAL">Less or equal to</option>
                <option value = "EQUAL_TO" selected>Equal to</option>
                <option value = "GREATER_THAN">Greater than</option>
                <option value = "GREATER_OR_EQUAL">Greater or equal to</option>
            </select>
            <input 
                value = {rating} 
                onChange = {handleRating}
                placeholder = "Any number between 0 and 5"
            />
            <label>
                Genres
            </label>
            <input 
                value = {genres} 
                onChange ={handleGenres}
                placeholder = "Enter any genre"
            />
            <button 
                type = "submit"
                onSubmit = {handleSubmitSearch}
            >
                    Search with these options
            </button>
        </form>
    );
}

export default AdvancedSearchPage;