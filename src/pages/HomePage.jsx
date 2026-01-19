// Import Packages
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Import the Search Bar component
import SearchBar from '../components/SearchBar';
import MovieSection from '../components/MovieSection';
import { get } from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import { logoutRequest } from '../api/auth';

// Import image assets
import banner from '../assets/cine_critic_logo.png';
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

const StyledDiscoverButton = styled(NavLink)`
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
          <StyledDiscoverButton to="/discover">Discover</StyledDiscoverButton>
        </StyledHomeRow>
        {error && <StyledError>{error}</StyledError>}

        {/* Movie Sections */}
        <MovieSection title="Random Recommendations" movies={randomRecs} />
        <MovieSection title="Trending" movies={trending} />
        <MovieSection title="Top Rated" movies={topRated} />
        {/* Insert Recommendations Carousel */}
      </StyledHomeContainer>
    </>
  );
}

export default HomePage;
