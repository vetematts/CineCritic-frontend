// Import Packages
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Import the Search Bar component
import SearchBar from '../components/SearchBar';
import { get } from '../api/api';

// Import image assets
import banner from '../assets/cine_critic_logo.png';
import MovieCarousel from '../components/MovieCarousel';

// Styled components
const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 76%;
`;

const StyledHomeRow = styled.div`
  display: flex;
  flex: 1;

  &#home-search-bar {
    align-items: center;
  }

  &#home-advanced-search {
    // Align the contents of the container under and
    // at the end of the search bar
    justify-content: flex-end;
  }

  &#home-random-recommendations {
    align-items: flex-start;
  }
`;

// Align the home logo container to centre the image
const StyledFigure = styled.figure`
  // Figure is the flex container for the image
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

// Re-size the logo to be roughly 1/3rd to 1/4th of the screen
const StyledHomeLogo = styled.img`
  // This takes shape according to the parent, the figure
  // container
  flex: 1;
  width: 100%;
  max-width: min(40vw, 420px);

  // Provide a bit of space between the logo and the search
  // bar
  padding: 0 0 2rem 0;
`;

// Style the advanced search link under the search bar
const StyledAdvancedSearchLink = styled(NavLink)`
  // Same gold-ish colour scheme as headings
  // color: #e9da57;
  color: #e6d4ad;
  text-decoration: none;

  display: flex;
  justify-content: flex-end;
  padding: 1rem 0 0 2rem;
  max-width: 100%;
`;

const StyledRandomRecommendations = styled.h3`
  align-items: flex-start;
  max-width: 100%;
`;

// Horizontal scrolling container for movie cards
const StyledTrendingList = styled.ul`
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
`;

// Container that clips the glow to rounded corners
// Extends 16px beyond card on all sides, matches reference implementation
// z-index: -1 ensures it's behind all cards to prevent overlap
const StyledGlowClipContainer = styled.div`
  position: absolute;
  top: -16px;
  right: -16px;
  bottom: -16px;
  left: -16px;
  border-radius: 5px;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1; // Behind everything to prevent overlap with adjacent cards
  pointer-events: none;
`;

// Container for 3D tilt effect (Apple TV style)
// Width increased to 150px to show 6 cards instead of 6-7
const StyledCardContainer = styled.div`
  position: relative;
  width: 150px; // Increased from 120px to show 6 cards instead of 6-7
  perspective: 1000px; // Enable 3D transforms
  overflow: visible; // Allow glow to extend beyond container
  contain: none; // Don't contain layout to allow glow extension
  /* No z-index here - let parent list item handle stacking */

  // Show glow on hover - creates rounded border effect
  // Matches reference: group-hover:opacity-70 (0.7 opacity)
  &:hover ${StyledGlowClipContainer} {
    opacity: 0.7;
  }
`;

const StyledRandomList = styled.ul`
  list-style: none;
  padding: 0 16px; // Left/right padding to allow first/last card glows to extend
  margin: 0 0 1rem 0;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  overflow-x: auto;
  overflow-y: hidden; // Prevent vertical scrollbar
  scrollbar-width: thin;
  scrollbar-color: #5a5b5f #242424;

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
`;

const StyledError = styled.p`
  color: #ffb4a2;
`;

// The default page that is loaded
function HomePage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [randomRecs, setRandomRecs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Load trending + top-rated movies from the backend on first render.
    const loadTrending = async () => {
      setError(null);

      try {
        const [trendingData, topRatedData] = await Promise.all([
          get('/api/movies/trending'),
          get('/api/movies/top-rated'),
        ]);
        if (isMounted) {
          const trendingList = trendingData || [];
          const topRatedList = topRatedData || [];
          setTrending(trendingList);
          setTopRated(topRatedList);

          // Pick a random selection from the combined lists for recommendations.
          // Use 8-10 movies for a good single-row display
          const combined = [...trendingList, ...topRatedList];
          const shuffled = combined.sort(() => Math.random() - 0.5);
          setRandomRecs(shuffled.slice(0, 10));
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.error || 'Unable to load trending movies.');
        }
      }
    };

    loadTrending();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <StyledHomeContainer className="flex-container">
        <StyledFigure id="banner-container">
          <StyledHomeLogo src={banner} className="home_logo" alt="CineCritic Banner" />
        </StyledFigure>
        <StyledHomeRow id="home-search-bar">
          <SearchBar />
        </StyledHomeRow>
        <StyledHomeRow id="home-advanced-search">
          <StyledAdvancedSearchLink to="/advancedSearch">Advanced Search</StyledAdvancedSearchLink>
        </StyledHomeRow>

        {/* Random Recommendation Section */}
        <StyledHomeRow id="home-random-recommendations">
          <StyledRandomRecommendations>Random Recommendations</StyledRandomRecommendations>
        </StyledHomeRow>
        <StyledRandomList>
          <MovieCarousel moviesArray = {randomRecs} />
        </StyledRandomList>
        {error && <StyledError>{error}</StyledError>}

        {/* Trending Section */}
        <StyledHomeRow id="home-trending">
          <StyledRandomRecommendations>Trending</StyledRandomRecommendations>
        </StyledHomeRow>
        <StyledTrendingList>
          <MovieCarousel moviesArray = {trending} />
        </StyledTrendingList>

        {/* Top Rated Section */}
        <StyledHomeRow id="home-top-rated">
          <StyledRandomRecommendations>Top Rated</StyledRandomRecommendations>
        </StyledHomeRow>
        <StyledTrendingList>
          <MovieCarousel moviesArray = {topRated} />
        </StyledTrendingList>
      </StyledHomeContainer>
    </>
  );
}

export default HomePage;
