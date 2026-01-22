import styled from 'styled-components';

// Badge component placeholder - ready for future implementation
const StyledBadge = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
`;

// Badge container for displaying multiple badges
const StyledBadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

// Placeholder badge component
// TODO: Implement actual badge functionality
function Badge({ src, alt, ...props }) {
  return (
    <StyledBadge
      src={src || 'https://via.placeholder.com/48'}
      alt={alt || 'Badge'}
      {...props}
    />
  );
}

// Badge list component for displaying multiple badges
function BadgeList({ badges = [] }) {
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

export default Badge;
export { BadgeList };
