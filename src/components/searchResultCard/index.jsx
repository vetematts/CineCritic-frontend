// Import poster URL utility for TMDB images
import getPosterUrl from '../../utils/image-pathing';

// Import the search results card CSS styling
import { 
  StyledFilmCard, 
  StyledFilmCardContents, 
  StyledNavLink 
} from './style';

// These are div blocks that show the films poster
// and details when they match a search query
export function SearchResultCard(prop) {
  // ---PROP NAME--- //                                       // ---DESCRPTION--- //
  const title = prop.title;                                   // Used for the title of the film
  const movieId = prop.id || prop.movieId || prop.tmdbId;     // Movie ID for routing
  const releaseYear = prop.releaseYear;                       // Used to display year film is
                                                              // released in the card
  const releaseDate = prop.release_date || prop.releaseDate;  // Alternative date field
  const description = prop.description;                       // Fills the rest of the card with
                                                              // the film's description
  const posterPath = prop.poster_path || prop.posterUrl;      // TMDB poster path or full URL

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