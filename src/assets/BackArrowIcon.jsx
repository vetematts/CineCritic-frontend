import styled from 'styled-components';

// Back arrow icon component (matches lucide-react ChevronLeft icon)
const BackArrowIcon = styled.svg`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export default function BackArrowIconComponent() {
  return (
    <BackArrowIcon viewBox="0 0 24 24">
      <polyline points="15 18 9 12 15 6" />
    </BackArrowIcon>
  );
}
