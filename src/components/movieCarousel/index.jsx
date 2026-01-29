// Import utility functions                           // -----DESCRPTION-----//
import getPosterUrl from '../../utils/image-pathing'; // Creates URL to grab movie poster link

// Import child components                // -----DESCRPTION-----//
import { MovieCard } from '../movieCard'; // Create the clickable movie card posters

// Import the movie carousel component element styling
import { StyledCarouselList } from './style';

// Movie carousel will be sent an array of movies
export function MovieCarousel({ moviesArray }) {
  if (!moviesArray || moviesArray.length === 0) {
    return null;
  }

  return (
    <StyledCarouselList>
      {moviesArray.map((movie) => {
        const posterURL = getPosterUrl(movie.poster_path || movie.posterUrl, 'w200');
        const movieId = movie.id || movie.tmdbId;
        const movieTitle = movie.title || movie.name;
        const releaseDate = movie.release_date || movie.releaseDate || movie.first_air_date || '';

        return (
          <MovieCard
            key={movieId}
            posterURL={posterURL}
            id={movieId}
            title={movieTitle}
            release_date={releaseDate}
          />
        );
      })}
    </StyledCarouselList>
  );
}