// Import packages
import { NavLink } from 'react-router';
import styled from 'styled-components';

// Import poster URL utility for TMDB images
import getPosterUrl from '../utilities/image-pathing';

// Make the card flexible, able to grow and shrink
// depending on the resolution size. Place the film
// poster and the description block side-by-side
const StyledFilmCard = styled.div`
  display: flex;
  flex-direction: row; // On smaller narrower screens flip to column
  flex-wrap: wrap;
`;

const StyledFilmCardContents = styled.div`
  // Allow the columns to shrink and grow depending
  // on the screen size
  flex: 1;
`;

// These are div blocks that show the films poster
// and details when they match a search query
function SearchResultCard(prop) {
  // ---PROP NAME--- //                   // ---DESCRPTION--- //
  const title = prop.title; // Used for the title of the film
  // in the card, to create the URL
  // to the film page
  const releaseYear = prop.releaseYear; // Used to display year film is
  // released in the card
  const description = prop.description; // Fills the rest of the card with
  // the film's description
  const posterPath = prop.poster_path || prop.posterUrl; // TMDB poster path or full URL

  // Create the link to the film
  const filmPage = `/film/${title}`;

  // Get poster URL from TMDB, or use placeholder if missing
  const posterUrl = getPosterUrl(posterPath, 'w300');

  return (
    // The whole card is clickable
    <NavLink to={filmPage}>
      <StyledFilmCard id="flex-card">
        {/* Separate the image and the description 
                    body into two columns */}
        <StyledFilmCardContents id="mini-movie-poster">
          {posterUrl ? (
            <img src={posterUrl} alt={`${title} poster`} />
          ) : (
            <div
              style={{
                width: '200px',
                height: '300px',
                backgroundColor: '#5a5b5f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#bdbdbd',
              }}
            >
              No poster
            </div>
          )}
        </StyledFilmCardContents>
        {/* Show maximum 3 lines, gradient into full 
                    transparency */}
        <StyledFilmCardContents id="film-description">
          <h2>{title}</h2>
          <h3>({releaseYear})</h3>
          <p>{description}</p>
        </StyledFilmCardContents>
      </StyledFilmCard>
    </NavLink>
  );
}

export default SearchResultCard;
