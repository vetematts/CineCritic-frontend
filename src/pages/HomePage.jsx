// Import Packages
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Import the Search Bar component
import SearchBar from '../components/SearchBar';
import { get } from '../api/api';
import getPosterUrl from '../utilities/image-pathing';

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
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// Styled poster image for movie lists
const StyledPoster = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
`;

// Placeholder for missing posters
const StyledPosterPlaceholder = styled.div`
  width: 100px;
  height: 150px;
  background-color: #5a5b5f;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 0.8em;
`;

const StyledRandomList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
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

          // Pick a small random selection from the combined lists.
          const combined = [...trendingList, ...topRatedList];
          const shuffled = combined.sort(() => Math.random() - 0.5);
          setRandomRecs(shuffled.slice(0, 5));
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
        <StyledRandomList>
          {randomRecs.map((movie) => {
            const posterUrl = getPosterUrl(movie.poster_path || movie.posterUrl, 'w200');
            return (
              <StyledTrendingItem key={movie.id || movie.tmdbId}>
                {posterUrl ? (
                  <StyledPoster src={posterUrl} alt={`${movie.title || movie.name} poster`} />
                ) : (
                  <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                )}
                <span>{movie.title || movie.name}</span>
              </StyledTrendingItem>
            );
          })}
        </StyledRandomList>
        {error && <StyledError>{error}</StyledError>}
        <StyledTrendingList>
          {trending.map((movie) => {
            const posterUrl = getPosterUrl(movie.poster_path || movie.posterUrl, 'w200');
            return (
              <StyledTrendingItem key={movie.id || movie.tmdbId}>
                {posterUrl ? (
                  <StyledPoster src={posterUrl} alt={`${movie.title || movie.name} poster`} />
                ) : (
                  <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                )}
                <span>{movie.title || movie.name}</span>
              </StyledTrendingItem>
            );
          })}
        </StyledTrendingList>
        <StyledRandomRecommendations>Top Rated</StyledRandomRecommendations>
        <StyledTrendingList>
          {topRated.map((movie) => {
            const posterUrl = getPosterUrl(movie.poster_path || movie.posterUrl, 'w200');
            return (
              <StyledTrendingItem key={movie.id || movie.tmdbId}>
                {posterUrl ? (
                  <StyledPoster src={posterUrl} alt={`${movie.title || movie.name} poster`} />
                ) : (
                  <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                )}
                <span>{movie.title || movie.name}</span>
              </StyledTrendingItem>
            );
          })}
        </StyledTrendingList>
        {/* Insert Recommendations Carousel */}
      </StyledHomeContainer>
    </>
  );
}

export default HomePage;
