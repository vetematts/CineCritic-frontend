// Import packages that allow for CSS styling to be applied to React elements
import { NavLink } from 'react-router';
import styled from 'styled-components';

// Create space between the main component and the footer
export const StyledFooter = styled.footer`
  /* Same width as the header */
  width: 76%;

  /* Create distance between the footer and the main body */
  margin: 15rem 0 0 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
    margin: 8rem 0 0 0;
  }
`;

// Allow the columns to shrink and grow depending on the screen size
// Allow the columns to tuck themselves under as a group depending on
// the type of device / screen resolution
export const StyledFooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

// Provied enough space for the columns so users won't
// accidentally press another link and there's enough space
// for visual clarity
export const StyledFooterColumns = styled.div`
  // Allow the columns to shrink and grow depending
  // on the screen size
  flex: 1;

  // Space the columns so they are now 1 column per
  // row in mobile resolution
  min-width: 10rem;
  margin: 1rem;

  @media (max-width: 768px) {
    min-width: 0;
    flex: 1 1 calc(50% - 2rem);
    margin: 0.5rem;
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

// Create some distance away from the description and the footer links
export const StyledFooterTextContainer = styled.div`
  flex: 1;
  margin: 5rem 0 0 0;

  @media (max-width: 768px) {
    margin: 3rem 0 0 0;
  }
`;

// Give the column headings a lighter grayish colour compared to the links
export const StyledFooterHeadings = styled.h4`
  color: #cec8c8ff;
`;

// Give the description a greyish colour but not too bright to
// draw the user's attention away from the body
export const StyledFooterText = styled.p`
  color: #9b9393ff;
`;

// Give the links a greyish-offwhite colour
export const StyledFooterLinks = styled(NavLink)`
  color: #9b9393ff;
  text-decoration: none;
`;

// Remove the indentation from list items
export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
`;

// Remove the list dots
export const StyledFooterLinkList = styled.li`
  list-style: none;

  // Space out the links
  padding: 0 0 0.5rem 0;
`;