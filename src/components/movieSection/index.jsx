// Import the movie carousel child component
import { MovieCarousel } from '../movieCarousel';

// Import the movie section component element styling
import {
  StyledSectionHeading,
  StyledSectionRow,
  StyledSectionWrapper,
  StyledSkeletonCard,
  StyledSkeletonContent,
  StyledSkeletonItem,
  StyledSkeletonLine,
  StyledSkeletonLineShort,
  StyledSkeletonList,
  StyledSkeletonPoster,
} from './style';

// Reusable movie section component with heading and carousel
export function MovieSection({ title, movies, loading = false }) {
  if (loading) {
    return (
      <StyledSectionWrapper>
        <StyledSectionRow>
          <StyledSectionHeading>{title}</StyledSectionHeading>
        </StyledSectionRow>
        <StyledSkeletonList>
          {Array.from({ length: 6 }).map((_, index) => (
            <StyledSkeletonItem key={`${title}-skeleton-${index}`}>
              <StyledSkeletonCard>
                <StyledSkeletonPoster />
                <StyledSkeletonContent>
                  <StyledSkeletonLine />
                  <StyledSkeletonLineShort />
                </StyledSkeletonContent>
              </StyledSkeletonCard>
            </StyledSkeletonItem>
          ))}
        </StyledSkeletonList>
      </StyledSectionWrapper>
    );
  }

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
