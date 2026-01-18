import styled from 'styled-components';

// Clock icon component (matches lucide-react Clock icon)
const ClockIcon = styled.svg`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export default function ClockIconComponent() {
  return (
    <ClockIcon viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </ClockIcon>
  );
}
