// Import packages that allow for CSS styling to be applied to React elements
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Stack the user's portait to the left of their details
export const StyledDashboard = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem 1rem 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem 0.75rem 0.75rem 0.75rem;
  }
`;

// Portait should take no more than 20% of the space
export const StyledPortaitColumn = styled.div`
  flex-basis: 20%;
  min-width: 200px;

  @media (max-width: 768px) {
    flex-basis: 100%;
    width: 100%;
  }
`;

// Set a restriction to the maximum size limit on the profile picture
// 160px x 160px
export const StyledProfilePicture = styled.img`
  flex: 1;
  max-width: 10rem;
  max-height: 10rem;
  border: 1px;
  border-radius: 10rem;
`;

// Give all the subheadings a similar grayish white as the
// rest of the text but a bolder tone
export const StyledSubheading = styled.h2`
  margin-bottom: 0.5rem;
  color: #cec8c8ff;
  font-size: 1.5rem;
  font-weight: 600;
`;

// Styled link for subheadings that should be clickable
export const StyledSubheadingLink = styled(NavLink)`
  margin-bottom: 0.5rem;
  color: #cec8c8ff;
  text-decoration: none;
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 600;
  transition:
    color 0.2s ease,
    text-decoration 0.2s ease;
  cursor: pointer;
  border-bottom: 2px solid transparent;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.5);
  }
`;

export const StyledStrongText = styled.p`
  color: #bdbdbd;
  font-weight: bold;
`;

// Give all the regular text a grayish white
export const StyledText = styled.p`
  margin: 0.25rem 0;
  color: #bdbdbd;
`;

// Container for "See more..." link, aligned to the right
export const StyledSeeMoreRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

// Styled "See more..." link
export const StyledSeeMoreLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  padding-bottom: 2px;
  font-size: 0.95rem;
  transition:
    color 0.2s ease,
    border-bottom-color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.6);
  }
`;

export const StyledUsersName = styled.h1`
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

// Container for user information section
export const StyledUserInformation = styled.div`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

// Container for user profile content
export const StyledUserProfileContainer = styled.div`
  flex: 1;
  min-width: 0; // Important: allows flex children to shrink below content size
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Container for carousel to ensure proper scrolling
export const StyledCarouselContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  margin-top: 0.5rem;
  position: relative;
  min-width: 0; // Important: allows overflow to work in flex containers

  @media (max-width: 768px) {
    margin-top: 0.75rem;
  }
`;
