// Import packages that allow for CSS styling to be applied to React elements
import { NavLink } from 'react-router'; // Handles the redirection to other pages
import styled from 'styled-components'; // Handles the CSS styling to React elements

export const StyledTrendingItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  overflow: visible; // Allow hover effects to extend
  position: relative; // Ensure proper stacking context
  z-index: 2; // Default: above glows from other items (when not hovered)

  // When hovered, lower z-index so glow extends, but adjacent cards stay above
  &:hover {
    z-index: 1; // Still above glow (-1) but below non-hovered cards (2)
  }
`;

// Container that clips the glow to rounded corners
// Extends 16px beyond card on all sides, matches reference implementation
// z-index: -1 ensures it's behind all cards to prevent overlap
export const StyledGlowClipContainer = styled.div`
  position: absolute;
  top: -16px;
  right: -16px;
  bottom: -16px;
  left: -16px;
  border-radius: 5px;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1; // Behind everything to prevent overlap with adjacent cards
  pointer-events: none;
`;

// Blurred background glow effect (inspired by movie-ui-browser)
// Image fills container completely with strong blur for border effect
export const StyledGlowBackground = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(64px) brightness(1.2);
`;

// Container for 3D tilt effect (Apple TV style)
// Width increased to 150px to show 6 cards instead of 6-7
export const StyledCardContainer = styled.div`
  position: relative;
  width: 150px; // Increased from 120px to show 6 cards instead of 6-7
  perspective: 1000px; // Enable 3D transforms
  overflow: visible; // Allow glow to extend beyond container
  contain: none; // Don't contain layout to allow glow extension
  /* No z-index here - let parent list item handle stacking */

  // Show glow on hover - creates rounded border effect
  // Matches reference: group-hover:opacity-70 (0.7 opacity)
  &:hover ${StyledGlowClipContainer} {
    opacity: 0.7;
  }
`;

// Wrapper for entire card (poster + black bar) with 3D tilt effect
// Moves as one piece, matching movie-ui-browser structure
export const StyledCardWrapper = styled.div.attrs((props) => ({
  style: {
    transform: props.$transform || 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
    transformStyle: 'preserve-3d',
  },
}))`
  width: 100%;
  border-radius: 5px;
  overflow: hidden; // Clips entire card to rounded corners
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition:
    box-shadow 0.3s ease,
    transform 0.15s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 1; // Above glow (which is z-index: 0) to ensure card is on top
  background-color: #000000; // Black background for seamless connection
  will-change: transform;
  // Ensure proper rendering
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  isolation: isolate; // Create stacking context for 3D transforms

  ${StyledCardContainer}:hover & {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
  }
`;

// Poster image inside the card wrapper
// Maintains 2:3 aspect ratio like movie-ui-browser
export const StyledPosterWrapper = styled.div`
  width: 100%;
  height: 225px; // 150px * 1.5 = 225px (2:3 aspect ratio)
  overflow: hidden; // Keep rounded borders intact
  position: relative;
  background-color: #242424;
`;

// Styled poster image for movie lists - card style matching wireframe
export const StyledPoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// Placeholder for missing posters - wrapped to maintain rounded borders
export const StyledPosterPlaceholder = styled.div`
  width: 150px;
  height: 225px;
  background-color: #5a5b5f;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 0.8em;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
`;

// Black rounded bar extending from poster (matches movie-ui-browser CardContent)
// Same width as poster, seamlessly connected
export const StyledCardContent = styled.div`
  background-color: #000000;
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// Movie title inside the black bar with ellipsis truncation
export const StyledMovieTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.87);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s ease;
`;

// Release date inside the black bar
export const StyledReleaseDate = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
`;

// Styled NavLink for movie cards - make entire card clickable
export const StyledMovieCardLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &:hover ${StyledMovieTitle} {
    color: #cec8c8ff; // Off-white color on hover
    text-shadow:
      0 0 8px rgba(206, 200, 200, 0.5),
      0 0 12px rgba(206, 200, 200, 0.3);
  }
`;
