// Import packages
import { NavLink } from "react-router";
import styled from "styled-components";

// Import URL pathing utility, this allows us to 
// dynamically add images to the react applcation
import getImageURL from "../utilities/image-pathing";

// Make the card flexible, able to grow and shrink 
// depending on the resolution size. Place the film 
// poster and the description block side-by-side
const StyledFilmCard = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const StyledFilmCardContents = styled.div`
    // Allow the columns to shrink and grow depending 
    // on the screen size
    flex: 1;
`;

// These are div blocks that show the films poster 
// and details when they match a search query
function SearchResultCard({title, releaseYear, description}) {
    const filmPage = `/film/${title}`;

    return (
        // The whole card is clickable
        <NavLink to = {filmPage}>
            <StyledFilmCard id = "flex-card">
                {/* Separate the image and the description 
                    body into two columns */}
                <StyledFilmCardContents id = "mini-movie-poster">
                    <img src = {getImageURL(title)} />
                </StyledFilmCardContents>
                {/* Show maximum 3 lines, gradient into full 
                    transparency */}
                <StyledFilmCardContents id = "film-description">
                    <h2>{title}</h2>
                    <h3>({releaseYear})</h3>
                    <p>{description}</p>
                </StyledFilmCardContents>
            </StyledFilmCard>
        </NavLink>
    );
}

export default SearchResultCard;