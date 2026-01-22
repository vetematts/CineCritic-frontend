// Import packages
import { NavLink } from 'react-router';
import styled from 'styled-components';

// Import poster URL utility for TMDB images
import getPosterUrl from '../utilities/image-pathing';

// Styled NavLink to remove default link styling and ensure proper layout
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  max-width: 100%;
`;

// Card container with proper constraints and responsive layout
const StyledFilmCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  max-width: 100%;
  overflow: hidden;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  // On smaller screens, stack vertically
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Poster container with fixed dimensions
const StyledFilmCardContents = styled.div`
  flex-shrink: 0;

  &#mini-movie-poster {
    width: 150px;
    height: 225px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }

    @media (max-width: 768px) {
      width: 120px;
      height: 180px;
    }
  }

  &#film-description {
    flex: 1;
    min-width: 0; // Important for text truncation
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h2 {
      margin: 0;
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.87);
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    h3 {
      margin: 0;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
      font-weight: normal;
    }

    p {
      margin: 0;
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.4;
      // Limit description to 3-4 lines with ellipsis
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  }
`;

// These are div blocks that show the films poster
// and details when they match a search query
function SearchResultCard(prop) {
  // ---PROP NAME--- //                                       // ---DESCRPTION--- //
  const title = prop.title; // Used for the title of the film
  const movieId = prop.id || prop.movieId || prop.tmdbId; // Movie ID for routing
  const releaseYear = prop.releaseYear; // Used to display year film is
  // released in the card
  const releaseDate = prop.release_date || prop.releaseDate; // Alternative date field
  const description = prop.description; // Fills the rest of the card with
  // the film's description
  const posterPath = prop.poster_path || prop.posterUrl; // TMDB poster path or full URL

  // Extract year from releaseYear or releaseDate
  // If releaseYear is valid, use it; otherwise try to extract from releaseDate
  let displayYear = null;
  if (releaseYear && releaseYear !== 0) {
    displayYear = releaseYear;
  } else if (releaseDate) {
    // Extract year from date string (e.g., "2021-10-22" -> "2021")
    const yearMatch = String(releaseDate).match(/^(\d{4})/);
    if (yearMatch) {
      displayYear = yearMatch[1];
    }
  }

  // Create the link to the movie detail page using movie ID
  const filmPage = movieId ? `/movies/${movieId}` : '#';

  // Get poster URL from TMDB, or use placeholder if missing
  const posterUrl = getPosterUrl(posterPath, 'w300');

  return (
    // The whole card is clickable
    <StyledNavLink to={filmPage} onClick={!movieId ? (e) => e.preventDefault() : undefined}>
      <StyledFilmCard id="flex-card">
        {/* Separate the image and the description 
                    body into two columns */}
        <StyledFilmCardContents id="mini-movie-poster">
          {posterUrl ? (
            <img src={posterUrl} alt={`${title} poster`} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#5a5b5f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#bdbdbd',
                borderRadius: '5px',
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
          {displayYear && <h3>({displayYear})</h3>}
          <p>{description}</p>
        </StyledFilmCardContents>
      </StyledFilmCard>
    </StyledNavLink>
  );
}

export default SearchResultCard;
