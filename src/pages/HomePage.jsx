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

// Horizontal scrolling container for movie cards
const StyledTrendingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  overflow-x: auto;
  overflow-y: hidden;
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
  // Add padding to prevent hover overflow
  & > li {
    flex-shrink: 0;
    padding: 0.5rem;
    margin: -0.5rem 0; // Compensate for padding to maintain spacing
  }
`;

const StyledTrendingItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  overflow: visible; // Allow hover effects to extend
`;

// Wrapper for poster to maintain rounded borders during hover
const StyledPosterWrapper = styled.div`
  width: 120px;
  height: 180px;
  border-radius: 5px;
  overflow: hidden; // Keep rounded borders intact
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
`;

// Styled poster image for movie lists - card style matching wireframe
const StyledPoster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// Placeholder for missing posters - wrapped to maintain rounded borders
const StyledPosterPlaceholder = styled.div`
  width: 120px;
  height: 180px;
  background-color: #5a5b5f;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 0.8em;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
`;

// Movie title below poster - fixed width to match poster
const StyledMovieTitle = styled.span`
  font-size: 0.85em;
  text-align: center;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.87);
  transition: color 0.2s ease;
  padding: 0 2px; // Small padding to prevent edge clipping
`;

// Styled NavLink for movie cards - make entire card clickable
const StyledMovieCardLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  
  &:hover ${StyledMovieTitle} {
    color: #e9da57; // Gold color on hover
  }
`;

const StyledRandomList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  overflow-x: auto;
  overflow-y: hidden;
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
  // Add padding to prevent hover overflow
  & > li {
    flex-shrink: 0;
    padding: 0.5rem;
    margin: -0.5rem 0; // Compensate for padding to maintain spacing
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
        <StyledHomeRow id="home-random-recommendations">
          <StyledRandomRecommendations>Random Recommendations</StyledRandomRecommendations>
        </StyledHomeRow>
        <StyledRandomList>
          {randomRecs.map((movie) => {
            const posterUrl = getPosterUrl(movie.poster_path || movie.posterUrl, 'w200');
            const movieId = movie.id || movie.tmdbId;
            const movieTitle = movie.title || movie.name;
            return (
              <StyledTrendingItem key={movieId}>
                <StyledMovieCardLink to={`/movies/${movieId}`}>
                  {posterUrl ? (
                    <StyledPosterWrapper>
                      <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                    </StyledPosterWrapper>
                  ) : (
                    <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                  )}
                  <StyledMovieTitle>{movieTitle}</StyledMovieTitle>
                </StyledMovieCardLink>
              </StyledTrendingItem>
            );
          })}
        </StyledRandomList>
        {error && <StyledError>{error}</StyledError>}
        
        {/* Trending Section */}
        <StyledHomeRow id="home-trending">
          <StyledRandomRecommendations>Trending</StyledRandomRecommendations>
        </StyledHomeRow>
        <StyledTrendingList>
          {trending.map((movie) => {
            const posterUrl = getPosterUrl(movie.poster_path || movie.posterUrl, 'w200');
            const movieId = movie.id || movie.tmdbId;
            const movieTitle = movie.title || movie.name;
            return (
              <StyledTrendingItem key={movieId}>
                <StyledMovieCardLink to={`/movies/${movieId}`}>
                  {posterUrl ? (
                    <StyledPosterWrapper>
                      <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                    </StyledPosterWrapper>
                  ) : (
                    <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                  )}
                  <StyledMovieTitle>{movieTitle}</StyledMovieTitle>
                </StyledMovieCardLink>
              </StyledTrendingItem>
            );
          })}
        </StyledTrendingList>
        
        {/* Top Rated Section */}
        <StyledHomeRow id="home-top-rated">
          <StyledRandomRecommendations>Top Rated</StyledRandomRecommendations>
        </StyledHomeRow>
        <StyledTrendingList>
          {topRated.map((movie) => {
            const posterUrl = getPosterUrl(movie.poster_path || movie.posterUrl, 'w200');
            const movieId = movie.id || movie.tmdbId;
            const movieTitle = movie.title || movie.name;
            return (
              <StyledTrendingItem key={movieId}>
                <StyledMovieCardLink to={`/movies/${movieId}`}>
                  {posterUrl ? (
                    <StyledPosterWrapper>
                      <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                    </StyledPosterWrapper>
                  ) : (
                    <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                  )}
                  <StyledMovieTitle>{movieTitle}</StyledMovieTitle>
                </StyledMovieCardLink>
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
