// Import Packages
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

// Import the Search Bar component
import SearchBar from '../components/SearchBar';
import { get } from '../api/api';
import getPosterUrl from '../utilities/image-pathing';
import { useAuth } from '../contexts/AuthContext';
import { logoutRequest } from '../api/auth';

// Import image assets
import banner from '../assets/cine_critic_logo.png';
import CalendarIcon from '../assets/CalendarIcon';
import ProfileIcon from '../assets/ProfileIcon';

// Styled components
const StyledHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 76%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const StyledHomeRow = styled.div`
  display: flex;
  flex: 1;

  &#home-search-bar {
    align-items: center;
    gap: 0.75rem;
    flex-wrap: nowrap;
    justify-content: center;

    @media (max-width: 768px) {
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }

  &#home-advanced-search {
    align-items: center;
    justify-content: flex-start;
    margin-top: 0.75rem;
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

// Style the advanced search button under the search bar
const StyledAdvancedSearchButton = styled(NavLink)`
  color: #cec8c8ff;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

const StyledRandomRecommendations = styled.h3`
  align-items: flex-start;
  max-width: 100%;
  color: #cec8c8ff;
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

const StyledTrendingItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  overflow: visible; // Allow hover effects to extend
  position: relative; // Ensure proper stacking context
  z-index: 2; // Default: above glows from other items (when not hovered)

  // When hovered, lower z-index so glow extends, but adjacent cards stay above
  &:hover {
    z-index: 1; // Still above glow (-1) but below non-hovered cards (2)
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

// Blurred background glow effect (inspired by movie-ui-browser)
// Image fills container completely with strong blur for border effect
const StyledGlowBackground = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(64px) brightness(1.2);
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

// Wrapper for entire card (poster + black bar) with 3D tilt effect
// Moves as one piece, matching movie-ui-browser structure
const StyledCardWrapper = styled.div.attrs((props) => ({
  style: {
    transform: props.$transform || 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
    transformStyle: 'preserve-3d',
  },
}))`
  width: 100%;
  border-radius: 5px;
  overflow: hidden; // Clips entire card to rounded corners
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition:
    box-shadow 0.3s ease,
    transform 0.15s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  z-index: 1; // Above glow (which is z-index: 0) to ensure card is on top
  background-color: #000000; // Black background for seamless connection
  will-change: transform;
  // Ensure proper rendering
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  isolation: isolate; // Create stacking context for 3D transforms

  ${StyledCardContainer}:hover & {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
  }
`;

// Poster image inside the card wrapper
// Maintains 2:3 aspect ratio like movie-ui-browser
const StyledPosterWrapper = styled.div`
  width: 100%;
  height: 225px; // 150px * 1.5 = 225px (2:3 aspect ratio)
  overflow: hidden; // Keep rounded borders intact
  position: relative;
  background-color: #242424;
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
  width: 150px;
  height: 225px;
  background-color: #5a5b5f;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 0.8em;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
`;

// Black rounded bar extending from poster (matches movie-ui-browser CardContent)
// Same width as poster, seamlessly connected
const StyledCardContent = styled.div`
  background-color: #000000;
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// Movie title inside the black bar with ellipsis truncation
const StyledMovieTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.87);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s ease;
`;

// Release date inside the black bar
const StyledReleaseDate = styled.p`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
`;

// Styled NavLink for movie cards - make entire card clickable
const StyledMovieCardLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &:hover ${StyledMovieTitle} {
    color: #cec8c8ff; // Off-white color on hover
    text-shadow:
      0 0 8px rgba(206, 200, 200, 0.5),
      0 0 12px rgba(206, 200, 200, 0.3);
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

const StyledHomeHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 2rem;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 1.5rem;
    gap: 0.5rem;
  }
`;

const StyledLoginLink = styled(NavLink)`
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.35rem 0.7rem;
    gap: 0.4rem;
  }
`;

const StyledAuthButton = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.35rem 0.7rem;
  }
`;

const StyledDashboardLink = styled(NavLink)`
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.25);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.35rem 0.7rem;
    gap: 0.4rem;
  }

  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;

// Component for movie card with 3D tilt effect
function MovieCardWithTilt({ posterUrl, children }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card centre
    const xValue = e.clientX - rect.left - width / 2;
    const yValue = e.clientY - rect.top - height / 2;

    // Calculate rotation values (max 15 degrees)
    const rotateX = (-yValue / height) * 15;
    const rotateY = (xValue / width) * 15;

    // Apply scale and rotation
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
  };

  const handleMouseLeave = () => {
    // Smoothly return to centre
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
  };

  return (
    <StyledCardContainer
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {posterUrl && (
        <StyledGlowClipContainer>
          <StyledGlowBackground src={posterUrl} alt="" />
        </StyledGlowClipContainer>
      )}
      <StyledCardWrapper $transform={transform}>{children}</StyledCardWrapper>
    </StyledCardContainer>
  );
}

// The default page that is loaded
function HomePage() {
  const { isAuthenticated, logout } = useAuth();
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
        <StyledHomeHeader>
          {isAuthenticated ? (
            <>
              <StyledDashboardLink to="/user">
                <ProfileIcon />
                Profile
              </StyledDashboardLink>
              <StyledAuthButton
                type="button"
                onClick={async () => {
                  try {
                    await logoutRequest();
                    logout();
                  } catch (error) {
                    console.error('Logout error:', error);
                    logout(); // Still log out locally even if API call fails
                  }
                }}
              >
                Log out
              </StyledAuthButton>
            </>
          ) : (
            <StyledLoginLink to="/login">
              <ProfileIcon />
              Login / Signup
            </StyledLoginLink>
          )}
        </StyledHomeHeader>
        <StyledFigure id="banner-container">
          <StyledHomeLogo src={banner} className="home_logo" alt="CineCritic Banner" />
        </StyledFigure>
        <StyledHomeRow id="home-search-bar">
          <SearchBar />
          <StyledAdvancedSearchButton to="/advancedSearch">
            Advanced Search
          </StyledAdvancedSearchButton>
        </StyledHomeRow>
        <StyledHomeRow id="home-random-recommendations">
          <StyledRandomRecommendations>Random Recommendations</StyledRandomRecommendations>
        </StyledHomeRow>
        <StyledRandomList>
          {randomRecs.map((movie) => {
            const posterUrl = getPosterUrl(movie.poster_path || movie.posterUrl, 'w200');
            const movieId = movie.id || movie.tmdbId;
            const movieTitle = movie.title || movie.name;
            const releaseDate = movie.release_date || movie.first_air_date || '';
            const formattedDate = releaseDate ? new Date(releaseDate).getFullYear().toString() : '';
            return (
              <StyledTrendingItem key={movieId}>
                <StyledMovieCardLink to={`/movies/${movieId}`}>
                  {posterUrl ? (
                    <MovieCardWithTilt posterUrl={posterUrl}>
                      <StyledPosterWrapper>
                        <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                      </StyledPosterWrapper>
                      <StyledCardContent>
                        <StyledMovieTitle>{movieTitle}</StyledMovieTitle>
                        {formattedDate && (
                          <StyledReleaseDate>
                            <CalendarIcon />
                            {formattedDate}
                          </StyledReleaseDate>
                        )}
                      </StyledCardContent>
                    </MovieCardWithTilt>
                  ) : (
                    <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                  )}
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
            const releaseDate = movie.release_date || movie.first_air_date || '';
            const formattedDate = releaseDate ? new Date(releaseDate).getFullYear().toString() : '';
            return (
              <StyledTrendingItem key={movieId}>
                <StyledMovieCardLink to={`/movies/${movieId}`}>
                  {posterUrl ? (
                    <MovieCardWithTilt posterUrl={posterUrl}>
                      <StyledPosterWrapper>
                        <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                      </StyledPosterWrapper>
                      <StyledCardContent>
                        <StyledMovieTitle>{movieTitle}</StyledMovieTitle>
                        {formattedDate && (
                          <StyledReleaseDate>
                            <CalendarIcon />
                            {formattedDate}
                          </StyledReleaseDate>
                        )}
                      </StyledCardContent>
                    </MovieCardWithTilt>
                  ) : (
                    <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                  )}
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
            const releaseDate = movie.release_date || movie.first_air_date || '';
            const formattedDate = releaseDate ? new Date(releaseDate).getFullYear().toString() : '';
            return (
              <StyledTrendingItem key={movieId}>
                <StyledMovieCardLink to={`/movies/${movieId}`}>
                  {posterUrl ? (
                    <MovieCardWithTilt posterUrl={posterUrl}>
                      <StyledPosterWrapper>
                        <StyledPoster src={posterUrl} alt={`${movieTitle} poster`} />
                      </StyledPosterWrapper>
                      <StyledCardContent>
                        <StyledMovieTitle>{movieTitle}</StyledMovieTitle>
                        {formattedDate && (
                          <StyledReleaseDate>
                            <CalendarIcon />
                            {formattedDate}
                          </StyledReleaseDate>
                        )}
                      </StyledCardContent>
                    </MovieCardWithTilt>
                  ) : (
                    <StyledPosterPlaceholder>No poster</StyledPosterPlaceholder>
                  )}
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
