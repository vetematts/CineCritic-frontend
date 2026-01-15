import styled from 'styled-components';

// Calendar icon component (matches lucide-react Calendar icon)
const CalendarIcon = styled.svg`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export default function CalendarIconComponent() {
  return (
    <CalendarIcon viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </CalendarIcon>
  );
}
