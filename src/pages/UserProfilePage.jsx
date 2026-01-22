// Import Packages
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';

// Utilies
import { useAuth } from '../contexts/AuthContext';
import { get } from '../api/api';

// Components
import MovieCarousel from '../components/MovieCarousel'; // Favourite movies carousel
import UserReviews from '../components/UserReviews'; // User reviews component
// import { BadgeList } from '../components/Badge'; // Badge component - commented out for future implementation

// Stack the user's portait to the left of their details
const StyledDashboard = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0.75rem;
  }
`;

// Portait should take no more than 20% of the space
const StyledPortaitColumn = styled.div`
  flex-basis: 20%;
  min-width: 200px;

  @media (max-width: 768px) {
    flex-basis: 100%;
    width: 100%;
  }
`;

// Set a restriction to the maximum size limit on the profile picture
// 160px x 160px
const StyledProfilePicture = styled.img`
  flex: 1;
  max-width: 10rem;
  max-height: 10rem;
  border: 1px;
  border-radius: 10rem;
`;

// Give all the subheadings a similar grayish white as the
// rest of the text but a bolder tone
const StyledSubheading = styled.h2`
  margin-bottom: 0.5rem;
  color: #cec8c8ff;
  font-size: 1.5rem;
  font-weight: 600;
`;

// Styled link for subheadings that should be clickable
const StyledSubheadingLink = styled(NavLink)`
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

const StyledStrongText = styled.p`
  color: #bdbdbd;
  font-weight: bold;
`;

// Give all the regular text a grayish white
const StyledText = styled.p`
  margin: 0.25rem 0;
  color: #bdbdbd;
`;

const StyledUsersName = styled.h1`
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.5rem;
`;

function UserProfilePage() {
  const { user, isAuthenticated } = useAuth();

  // Hooks                                          // Description
  const [favourites, _setFavourites] = useState([]); // Use this to load up this user's favourite movies and fetch the posters
  const [accountCreatedDate, setAccountCreatedDate] = useState(null);
  const [accountCreatedLoading, setAccountCreatedLoading] = useState(true);
  const [accountCreatedError, setAccountCreatedError] = useState(null);

  // Return user to login page if they're not authenticated.
  if (!isAuthenticated) return <Navigate to="/login" />;

  const username = user?.username || user?.name || user?.email?.split('@')[0] || 'User';
  const userId = user?.id ?? user?.sub ?? null;

  // Format date to readable format (e.g., "January 15, 2024")
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return null;
    }
  };

  // Load account creation date
  useEffect(() => {
    const loadAccountCreatedDate = async () => {
      setAccountCreatedLoading(true);
      setAccountCreatedError(null);

      try {
        // Check if user object already has created_at
        if (user?.created_at || user?.createdAt || user?.created) {
          const dateStr = user.created_at || user.createdAt || user.created;
          const formatted = formatDate(dateStr);
          setAccountCreatedDate(formatted);
          setAccountCreatedLoading(false);
          return;
        }

        // If not in user object, try fetching from /api/users/me
        const userData = await get('/api/users/me');
        const dateStr = userData?.created_at || userData?.createdAt || userData?.created;
        if (dateStr) {
          const formatted = formatDate(dateStr);
          setAccountCreatedDate(formatted);
        } else {
          setAccountCreatedError('Date not available');
        }
      } catch (err) {
        setAccountCreatedError(err?.message || 'Unable to load account date');
      } finally {
        setAccountCreatedLoading(false);
      }
    };

    if (userId) {
      loadAccountCreatedDate();
    }
  }, [user, userId]);

  return (
    <StyledDashboard id="dashboard">
      {/* Profile Picture and Badges section - commented out for future implementation */}
      {/* <StyledPortaitColumn id="user-portait-badge-container">
        <div id="user-profile-portait">
          <StyledProfilePicture
            src="https://via.placeholder.com/160"
            className="profile-picture"
            alt="Profile Picture"
          />
          <div id="badges">
            <StyledStrongText>Badges</StyledStrongText>
            <BadgeList badges={[]} />
          </div>
        </div>
      </StyledPortaitColumn> */}
      <div id="user-profile-container">
        <div id="user-information">
          <StyledUsersName>{username}</StyledUsersName>
          <StyledText>
            Account Created:{' '}
            {accountCreatedLoading
              ? 'Loading...'
              : accountCreatedError
                ? accountCreatedError
                : accountCreatedDate || 'Date not available'}
          </StyledText>
        </div>
        <div id="favourites">
          <StyledSubheadingLink to="/favourites">Favourites</StyledSubheadingLink>
          <MovieCarousel moviesArray={favourites} />
        </div>
        <div id="watchlist">
          <StyledSubheadingLink to="/watchlist">Watchlist</StyledSubheadingLink>
          <StyledText>User's Watchlist Component here...</StyledText>
          <StyledText>Statuses: Watching, Completed, On Hold, Dropped, Want to Watch</StyledText>
          <StyledText>Movie/Show Poster, subtitle with the movie name and release year</StyledText>
          <StyledText>Episodes watched</StyledText>
          <StyledText>Score (Rating)</StyledText>
        </div>
        <div id="reviews">
          <StyledSubheadingLink to="/reviews">Reviews</StyledSubheadingLink>
          <UserReviews userId={userId} limit={5} showViewAll={true} />
        </div>
      </div>
    </StyledDashboard>
  );
}

export default UserProfilePage;
