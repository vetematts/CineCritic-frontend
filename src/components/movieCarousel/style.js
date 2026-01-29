// Import packages that allow for CSS styling to be applied to React elements
import styled from 'styled-components';

// Horizontal scrolling container for movie cards
export const StyledCarouselList = styled.ul`
  list-style: none;
  padding: 0 16px; // Left/right padding to allow first/last card glows to extend
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  overflow-x: auto;
  overflow-y: hidden; // Prevent vertical scrollbar while allowing horizontal scroll
  scrollbar-width: thin;
  scrollbar-color: #5a5b5f #242424;
  width: 100%;
  min-width: 0; // Critical: allows flex children to shrink and enable scrolling
  -webkit-overflow-scrolling: touch; // Smooth scrolling on iOS
  scroll-behavior: smooth;

  // Hide scrollbar for webkit browsers but keep functionality
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #242424;
  }

  &::-webkit-scrollbar-thumb {
    background: #5a5b5f;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6a6b6f;
  }

  // Prevent cards from shrinking below their minimum size
  // Add padding to allow glow to extend without clipping
  & > li {
    flex-shrink: 0;
    padding: 16px 0; // Vertical padding only for glow, no horizontal padding
    margin: 0; // No negative margin needed
  }

  @media (max-width: 768px) {
    padding: 0 8px;
    gap: 0.5rem;
  }
`;