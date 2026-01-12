// Import Packages
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Import the Search Bar component
import SearchBar from '../components/SearchBar';
import { get } from '../api/api';

// Import image assets
import banner from '../assets/cine_critic_logo.png';

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
  color: #e9da57;
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

const StyledTrendingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledTrendingItem = styled.li`
  padding: 0.5rem 0;
`;

const StyledError = styled.p`
  color: #ffb4a2;
`;

// The default page that is loaded
function HomePage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
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
          setTrending(trendingData || []);
          setTopRated(topRatedData || []);
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
        <StyledHomeRow id="home-random-recommendations">
          <StyledRandomRecommendations>Random Recommendations</StyledRandomRecommendations>
        </StyledHomeRow>
        {error && <StyledError>{error}</StyledError>}
        <StyledTrendingList>
          {trending.map((movie) => (
            <StyledTrendingItem key={movie.id || movie.tmdbId}>
              {movie.title || movie.name}
            </StyledTrendingItem>
          ))}
        </StyledTrendingList>
        <StyledRandomRecommendations>Top Rated</StyledRandomRecommendations>
        <StyledTrendingList>
          {topRated.map((movie) => (
            <StyledTrendingItem key={movie.id || movie.tmdbId}>
              {movie.title || movie.name}
            </StyledTrendingItem>
          ))}
        </StyledTrendingList>
        {/* Insert Recommendations Carousel */}
      </StyledHomeContainer>
    </>
  );
}

export default HomePage;
