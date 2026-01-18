// Child Component                      // -----DESCRPTION-----//
import MovieCard from "./MovieCard";    // Create the clickable movie card posters

// Movie carousel will be sent an array of movies
function MovieCarousel(prop) {
    return (
        <>
            {
                prop.map((movie) => {
                    const posterURL = getPosterUrl(
                                        movie.poster_path || 
                                        movie.posterUrl, 
                                        'w200');
                    const movieId = movie.id || 
                                    movie.tmdbId;
                    const movieTitle = movie.title || 
                                        movie.name;
                    const releaseDate = movie.release_date || 
                                        movie.first_air_date || 
                                        '';
                    
                    return(
                        <MovieCard
                            posterURL = {posterURL}
                            movieId = {movieId}
                            movieTitle = {movieTitle}
                            releaseDate = {releaseDate}
                        />
                    );
                })
            }
        </>
    );
}

export default MovieCarousel;