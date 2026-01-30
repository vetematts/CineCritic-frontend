// Import Packages to track states
import { useEffect, useState } from 'react';

// Import the Search Bar component and the different Movie panels
import { SearchBar } from '../../components/searchbar';
import { MovieSection } from '../../components/movieSection';

// Import authorisation security methods
import { useAuth } from '../../contexts/AuthContext';
import { logoutRequest } from '../../api/auth';

// Import API method to obtain movie information
import { get } from '../../api/api';

// Import image assets
import banner from '../../assets/cine_critic_logo.png';
import ProfileIcon from '../../assets/ProfileIcon';

// Import the CSS styling for the home page
import {
  StyledAdvancedSearchButton,
  StyledAuthButton,
  StyledDashboardLink,
  StyledDiscoverButton,
  StyledError,
  StyledFigure,
  StyledHomeContainer,
  StyledHomeHeader,
  StyledHomeLogo,
  StyledHomeRow,
  StyledLoginLink,
} from './style';

// The default page that is loaded
export function HomePage() {
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
