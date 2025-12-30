// Import packges
import { useState } from "react";
import styled from "styled-components";

// Styled components
// Give all the labels the same gold colouring as headings
const StyledLabels = styled.label`
    /* Same golden font as the headings */
    color: #e9da57;
    
    /* Response design */
    display: flex;
    justify-content: flex-start;

    /* Spacing between itself and its input */
    padding: 2px;
`;

// White background input fields with slight rounded corners
// with spacing to break up and declutter the page
const StyledInputs = styled.input`
    /* White background */
    background-color: #ffffffff;
    opacity: 0.9;

    /* Round the corners */
    border-radius: 10px; /* More pixel value for more roundness */
    padding: 5px; /* Optional: Add padding so text doesn't touch the edges */

    /* Set responsive design */
    display: flex;
    justify-content: flex-start;
    width: 60rem;

    /* Space away from other items */
    margin: 5px 0 20px 0;
`;

function AdvancedSearchPage() {
    const [title, setTitle] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [crew, setCrew] = useState("");
    const [ratingComparator, setRatingComparator] = useState("EQUAL_TO");
    const [rating, setRating] = useState(0);
    const [genres, setGenres] = useState("");

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleReleaseYear = (event) => {
        setReleaseYear(event.target.value);
    };

    const handleFilmCrew = (event) => {
        setCrew(event.target.value);
    };

    // const handleRatingDropDown = (event) => {
    //     setRatingComparator(event.target.value);
    // };

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
            <StyledLabels>
                Movie Title
            </StyledLabels>
            <StyledInputs 
                value = {title} 
                onChange = {handleTitle}
                placeholder = "Any word in the name of the movie"
            />
            <StyledLabels>
                Release Year
            </StyledLabels>
            <StyledInputs 
                value = {releaseYear} 
                onChange = {handleReleaseYear}
                placeholder = "Any number when the movie was released"
            />
            <StyledLabels>
                Film Crew
            </StyledLabels>
            <StyledInputs 
                value = {crew} 
                onChange = {handleFilmCrew}
                placeholder = "Any word in the name of any film crew members"
            />
            <StyledLabels>
                Rating
            </StyledLabels>
            <select 
                defaultValue = {"EQUAL_TO"}
            >
                {/* HTML entity codes: &lt is < and &gt is > */}
                <option value = "LESS_THAN">Less than</option> 
                <option value = "LESS_OR_EQUAL">Less or equal to</option>
                <option value = "EQUAL_TO">Equal to</option>
                <option value = "GREATER_THAN">Greater than</option>
                <option value = "GREATER_OR_EQUAL">Greater or equal to</option>
            </select>
            <StyledInputs 
                value = {rating} 
                onChange = {handleRating}
                placeholder = "Any number between 0 and 5"
            />
            <StyledLabels>
                Genres
            </StyledLabels>
            <StyledInputs 
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