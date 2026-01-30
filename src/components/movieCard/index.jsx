// Import Packages
import { useRef, useState } from 'react'; // Holds state variables

// Import the calendar icon to display on the movie cards
import CalendarIcon from '../../assets/CalendarIcon';

// Import the movie card component element styling
import {
  StyledCardContainer,
  StyledCardContent,
  StyledCardWrapper,
  StyledGlowBackground,
  StyledGlowClipContainer,
  StyledMovieCardLink,
  StyledMovieTitle,
  StyledPoster,
  StyledPosterPlaceholder,
  StyledPosterWrapper,
  StyledReleaseDate,
  StyledTrendingItem,
} from './style';

// Component for movie card with 3D tilt effect
function MovieCardWithTilt({ posterUrl, children }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card centre
    const xValue = e.clientX - rect.left - width / 2;
    const yValue = e.clientY - rect.top - height / 2;

    // Calculate rotation values (max 15 degrees)
    const rotateX = (-yValue / height) * 15;
    const rotateY = (xValue / width) * 15;

    // Apply scale and rotation
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
  };

  const handleMouseLeave = () => {
    // Smoothly return to centre
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
  };

  return (
    <StyledCardContainer
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {posterUrl && (
        <StyledGlowClipContainer>
          <StyledGlowBackground src={posterUrl} alt="" />
        </StyledGlowClipContainer>
      )}
      <StyledCardWrapper $transform={transform}>{children}</StyledCardWrapper>
    </StyledCardContainer>
  );
}

export function MovieCard(prop) {
  // Properties of the Movie Card Object
  const posterUrl = prop.posterURL || prop.posterUrl; // URL to the movie poster (fixed typo)
  const movieId = prop.id || prop.movieId || prop.tmdbId; // ID number of the movie
  const movieTitle = prop.title || prop.movieTitle || prop.name; // Name of the movie
  const releaseDate = prop.release_date || prop.releaseDate || prop.first_air_date || ''; // Release date of the movie
  const formattedDate = releaseDate ? new Date(releaseDate).getFullYear().toString() : ''; // Format the release date to something legible

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
