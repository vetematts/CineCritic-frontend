// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

export const StyledStarContainer = styled.div`
  display: inline-flex;
  gap: 0.125rem;
  align-items: center;
  user-select: none;
`;

export const StyledStarWrapper = styled.div`
  position: relative;
  width: ${({ $size = 2 }) => `${$size}rem`};
  height: ${({ $size = 2 }) => `${$size}rem`};
  cursor: pointer;
`;

// Base gray star - always shown
export const StarSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: rgba(255, 255, 255, 0.2);
`;

// Gold filled star - uses clip-path for half stars
export const GoldStarSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: #e9da57;
  transition: clip-path 0.15s ease;
  clip-path: ${(props) => (props.$isHalf ? 'inset(0 50% 0 0)' : 'inset(0 0 0 0)')};
`;

// Clickable areas
export const ClickableArea = styled.div`
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 10;
  ${(props) => (props.$isLeft ? 'left: 0;' : 'right: 0;')}
`;
