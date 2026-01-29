// Import the css styling for the badges
import { StyledBadge } from './style';

// TODO: Implement actual badge functionality
export function Badge({ src, alt, ...props }) {
  return (
    <StyledBadge src={src || 'https://via.placeholder.com/48'} alt={alt || 'Badge'} {...props} />
  );
}
