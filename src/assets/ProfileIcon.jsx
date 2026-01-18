import styled from 'styled-components';

// Profile/User icon component (matches lucide-react User icon)
const ProfileIcon = styled.svg`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

export default function ProfileIconComponent() {
  return (
    <ProfileIcon viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </ProfileIcon>
  );
}
