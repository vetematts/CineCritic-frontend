// Utilities
import styled from "styled-components";
import MovieCarousel from "./MovieCarousel";

// Styled heading for movie sections
const StyledSectionHeading = styled.h3`
  align-items: flex-start;
  max-width: 100%;
  color: #cec8c8ff;
  margin: 0 0 0.5rem 0;
`;

// Container for section row (heading)
const StyledSectionRow = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

// Wrapper for entire section (heading + carousel)
const StyledSectionWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;

  &:first-of-type {
    margin-top: 3rem; // Extra spacing for first section after search bar
  }
`;

// Reusable movie section component with heading and carousel
function MovieSection({ title, movies }) {
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

export default MovieSection;
