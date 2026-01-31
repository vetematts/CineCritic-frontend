import {
  StyledSkeletonCard,
  StyledSkeletonContent,
  StyledSkeletonItem,
  StyledSkeletonLine,
  StyledSkeletonLineShort,
  StyledSkeletonList,
  StyledSkeletonPoster,
} from './style';

export function SkeletonCarousel({ count = 6 }) {
  return (
    <StyledSkeletonList>
      {Array.from({ length: count }).map((_, index) => (
        <StyledSkeletonItem key={`skeleton-card-${index}`}>
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
  );
}
