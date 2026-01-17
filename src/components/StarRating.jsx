import { useState } from 'react';
import styled from 'styled-components';

const StyledStarContainer = styled.div`
  display: inline-flex;
  gap: 0.125rem;
  align-items: center;
  user-select: none;
`;

const StyledStarWrapper = styled.div`
  position: relative;
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;
`;

// SVG star icon with rounded style
const StarSvg = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.75rem;
  height: 1.75rem;
  transition: fill 0.15s ease;
  fill: ${(props) => (props.$filled ? '#e9da57' : 'rgba(255, 255, 255, 0.2)')};
`;

// Half-star mask (clips to show only left half when half-filled)
const HalfStarMask = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

// Clickable areas for left and right halves
const ClickableArea = styled.div`
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 10;
  ${(props) => (props.$isLeft ? 'left: 0;' : 'right: 0;')}
`;

// Rounded star SVG path - softer, more letterboxd-style
const StarPath = () => (
  <path
    d="M14.5,3.2l1.1,2.3l2.5,0.4c0.3,0,0.4,0.4,0.2,0.6l-1.8,1.8l0.4,2.5c0,0.3-0.3,0.5-0.5,0.4l-2.2-1.2l-2.2,1.2
    c-0.2,0.1-0.5-0.1-0.5-0.4l0.4-2.5l-1.8-1.8c-0.2-0.2-0.1-0.6,0.2-0.6l2.5-0.4L14.5,3.2
    C14.6,3,14.8,3,14.9,3.1C14.9,3.1,14.9,3.2,14.5,3.2z"
    style={{ strokeLinejoin: 'round', strokeLinecap: 'round' }}
  />
);

// Letterboxd-style star rating component with rounded SVG stars
export default function StarRating({ value = 0, onChange, disabled = false }) {
  const [hoverValue, setHoverValue] = useState(null);

  const handleClick = (starIndex, isLeftHalf) => {
    if (disabled) return;
    const newRating = starIndex + (isLeftHalf ? 0.5 : 1);
    onChange?.(String(newRating));
  };

  const handleMouseMove = (starIndex, isLeftHalf) => {
    if (disabled) return;
    setHoverValue(starIndex + (isLeftHalf ? 0.5 : 1));
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const displayValue = hoverValue !== null ? hoverValue : Number(value);

  // Rounded star SVG path - softer, more letterboxd-style with rounded points
  const roundedStarPath = (
    <path
      d="M12 2l2.4 4.9 5.4 0.8-3.9 3.8 0.9 5.4-4.8-2.5-4.8 2.5 0.9-5.4-3.9-3.8 5.4-0.8z"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="0.5"
    />
  );

  return (
    <StyledStarContainer onMouseLeave={handleMouseLeave}>
      {[0, 1, 2, 3, 4].map((starIndex) => {
        const starValue = starIndex + 1;
        const isFilled = displayValue >= starValue;
        const isHalfFilled = displayValue > starIndex && displayValue < starValue;

        return (
          <StyledStarWrapper key={starIndex}>
            {/* Always show base star (gray if empty, gold if filled) */}
            {isFilled ? (
              // Fully filled star - just show gold star
              <StarSvg $filled={true} viewBox="0 0 24 24">
                {roundedStarPath}
              </StarSvg>
            ) : isHalfFilled ? (
              // Half-filled star - show gray base with gold left half
              <>
                <StarSvg $filled={false} viewBox="0 0 24 24">
                  {roundedStarPath}
                </StarSvg>
                <HalfStarMask>
                  <StarSvg $filled={true} viewBox="0 0 24 24">
                    {roundedStarPath}
                  </StarSvg>
                </HalfStarMask>
              </>
            ) : (
              // Empty star - show gray only
              <StarSvg $filled={false} viewBox="0 0 24 24">
                {roundedStarPath}
              </StarSvg>
            )}

            {/* Clickable left half */}
            <ClickableArea
              $isLeft
              onClick={() => handleClick(starIndex, true)}
              onMouseMove={() => handleMouseMove(starIndex, true)}
            />

            {/* Clickable right half */}
            <ClickableArea
              $isLeft={false}
              onClick={() => handleClick(starIndex, false)}
              onMouseMove={() => handleMouseMove(starIndex, false)}
            />
          </StyledStarWrapper>
        );
      })}
    </StyledStarContainer>
  );
}
