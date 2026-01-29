// Import package to allow use of state variables
import { useState } from 'react';

// Import the star rating component element styling
import {
  ClickableArea,
  GoldStarSvg,
  StarSvg,
  StyledStarContainer,
  StyledStarWrapper,
} from './style';

// Star rating component
export function StarRating({ value = 0, onChange, disabled = false }) {
  const [hoverValue, setHoverValue] = useState(null);

  // Round to nearest 0.5 increment
  const normalizeValue = (val) => {
    const num = Number(val);
    if (isNaN(num) || num < 0) return 0;
    if (num > 5) return 5;
    return Math.round(num * 2) / 2;
  };

  const handleClick = (starIndex, isLeftHalf) => {
    if (disabled) return;
    const newRating = starIndex + (isLeftHalf ? 0.5 : 1);
    const normalizedRating = normalizeValue(newRating);
    onChange?.(String(normalizedRating));
  };

  const handleMouseMove = (starIndex, isLeftHalf) => {
    if (disabled) return;
    const hoverRating = starIndex + (isLeftHalf ? 0.5 : 1);
    setHoverValue(normalizeValue(hoverRating));
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const displayValue = hoverValue !== null ? hoverValue : normalizeValue(value);

  // Star SVG path
  const starPath = (
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.89a1 1 0 00-1.176 0l-3.976 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.518-4.674z" />
  );

  return (
    <StyledStarContainer onMouseLeave={handleMouseLeave}>
      {[0, 1, 2, 3, 4].map((starIndex) => {
        const starValue = starIndex + 1;
        const isFilled = displayValue >= starValue;
        const isHalfFilled = displayValue > starIndex && displayValue < starValue;

        return (
          <StyledStarWrapper key={starIndex}>
            {/* Base gray star - always shown */}
            <StarSvg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
              {starPath}
            </StarSvg>

            {/* Gold star - full or half based on state */}
            {(isFilled || isHalfFilled) && (
              <GoldStarSvg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                $isHalf={isHalfFilled}
              >
                {starPath}
              </GoldStarSvg>
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
