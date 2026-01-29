// Import the movie carousel child component
import { MovieCarousel } from '../movieCarousel';

// Import the movie section component element styling
import { StyledSectionHeading, StyledSectionRow, StyledSectionWrapper } from './style';

// Reusable movie section component with heading and carousel
export function MovieSection({ title, movies }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <StyledSectionWrapper>
      <StyledSectionRow>
        <StyledSectionHeading>{title}</StyledSectionHeading>
      </StyledSectionRow>
      <MovieCarousel moviesArray={movies} />
    </StyledSectionWrapper>
  );
}
