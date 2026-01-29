// Import the css styling for the badges
import { StyledBadge, StyledBadgeContainer } from "./style";

// TODO: Implement actual badge functionality
export function Badge({ src, alt, ...props }) {
  return (
    <StyledBadge 
      src={src || 'https://via.placeholder.com/48'} 
      alt={alt || 'Badge'} 
      {...props} 
    />
  );
}

// Badge list component for displaying multiple badges
export function BadgeList({ badges = [] }) {
  // Placeholder badges - replace with actual badge data when ready
  const placeholderBadges = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    src: 'https://via.placeholder.com/48',
    alt: `Badge ${i + 1}`,
  }));

  const displayBadges = badges.length > 0 ? badges : placeholderBadges;

  return (
    <StyledBadgeContainer>
      {displayBadges.map((badge) => (
        <Badge key={badge.id} src={badge.src} alt={badge.alt} />
      ))}
    </StyledBadgeContainer>
  );
}
