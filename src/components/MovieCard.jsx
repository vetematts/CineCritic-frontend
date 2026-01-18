function MovieCard(prop) {
    const posterUrl = getPosterUrl(movie.poster_path || movie.posterUrl, 'w200');
    const movieId = movie.id || movie.tmdbId;
    const movieTitle = movie.title || movie.name;
    const releaseDate = movie.release_date || movie.first_air_date || '';
    const formattedDate = releaseDate ? new Date(releaseDate).getFullYear().toString() : '';

    return (
        <StyledTrendingItem key={movieId}>
            <StyledMovieCardLink to={`/movies/${movieId}`}>
                {posterUrl ? (
                <MovieCardWithTilt posterUrl={posterUrl}>
                    <StyledPosterWrapper>
                    <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                    </StyledPosterWrapper>
                    <StyledCardContent>
                    <StyledMovieTitle>{movieTitle}</StyledMovieTitle>
                    {formattedDate && (
                        <StyledReleaseDate>
                        <CalendarIcon />
                        {formattedDate}
                        </StyledReleaseDate>
                    )}
                    </StyledCardContent>
                </MovieCardWithTilt>
                ) : (
                <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                )}
            </StyledMovieCardLink>
        </StyledTrendingItem>
    );
}

export default MovieCard;