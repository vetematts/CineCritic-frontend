// Import Packages
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';

// Utilies
import { useAuth } from '../contexts/AuthContext';
import { get } from '../api/api';

// Components
import { MovieCarousel } from '../components/movieCarousel'; // Favourite movies carousel
import UserReviewPanel from '../components/UserReviewPanel'; // User reviews panel
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
  padding: 2rem 1rem 1rem 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem 0.75rem 0.75rem 0.75rem;
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

// Container for "See more..." link, aligned to the right
const StyledSeeMoreRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

// Styled "See more..." link
const StyledSeeMoreLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.35);
  padding-bottom: 2px;
  font-size: 0.95rem;
  transition:
    color 0.2s ease,
    border-bottom-color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.6);
  }
`;

const StyledUsersName = styled.h1`
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

// Container for user information section
const StyledUserInformation = styled.div`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

// Container for user profile content
const StyledUserProfileContainer = styled.div`
  flex: 1;
  min-width: 0; // Important: allows flex children to shrink below content size
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Container for carousel to ensure proper scrolling
const StyledCarouselContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  margin-top: 0.5rem;
  position: relative;
  min-width: 0; // Important: allows overflow to work in flex containers

  @media (max-width: 768px) {
    margin-top: 0.75rem;
  }
`;

function UserProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const { id: routeUserId } = useParams();

  // Hooks                                          // Description
  const [favourites, setFavourites] = useState([]); // Use this to load up this user's favourite movies and fetch the posters
  const [favouritesError, setFavouritesError] = useState(null);
  const [watchlist, setWatchlist] = useState([]); // Use this to load up this user's watchlist movies and fetch the posters
  const [watchlistError, setWatchlistError] = useState(null);
  const [accountCreatedDate, setAccountCreatedDate] = useState(null);
  const [accountCreatedLoading, setAccountCreatedLoading] = useState(true);
  const [accountCreatedError, setAccountCreatedError] = useState(null);

  const userId = user?.id ?? user?.sub ?? null;
  const targetUserId = routeUserId ? Number(routeUserId) : userId;
  const isOwner = !routeUserId || Number(routeUserId) === userId;
  const [publicUser, setPublicUser] = useState(null);
  const [publicUserError, setPublicUserError] = useState(null);
  const [publicUserLoading, setPublicUserLoading] = useState(false);

  const displayUser = isOwner ? user : publicUser;
  const username =
    displayUser?.username || displayUser?.name || displayUser?.email?.split('@')[0] || 'User';

  // Format date to match UI style (e.g., "15 Jan 2024")
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;
      const day = date.getDate();
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return null;
    }
  };

  // Load favourites
  useEffect(() => {
    if (!targetUserId) {
      return;
    }

    let isMounted = true;

    const loadFavourites = async () => {
      setFavouritesError(null);
      try {
        const data = await get(
          isOwner
            ? `/api/favourites/${targetUserId}`
            : `/api/public/users/${targetUserId}/favourites`
        );
        if (isMounted) {
          // Map backend data to MovieCarousel format
          const mappedFavourites = (data || []).map((entry) => ({
            id: entry.tmdb_id,
            tmdbId: entry.tmdb_id,
            title: entry.title,
            poster_path: entry.poster_url,
            posterUrl: entry.poster_url,
            release_date: entry.release_year ? `${entry.release_year}-01-01` : null,
            releaseYear: entry.release_year,
          }));
          setFavourites(mappedFavourites);
        }
      } catch (err) {
        if (isMounted) {
          setFavouritesError(err?.message || 'Unable to load favourites.');
        }
      }
    };

    loadFavourites();

    return () => {
      isMounted = false;
    };
  }, [targetUserId, isOwner]);

  // Load watchlist
  useEffect(() => {
    if (!targetUserId) {
      return;
    }

    let isMounted = true;

    const loadWatchlist = async () => {
      setWatchlistError(null);
      try {
        const data = await get(
          isOwner ? `/api/watchlist/${targetUserId}` : `/api/public/users/${targetUserId}/watchlist`
        );
        if (isMounted) {
          // Map backend data to MovieCarousel format
          const mappedWatchlist = (data || []).map((entry) => ({
            id: entry.tmdb_id,
            tmdbId: entry.tmdb_id,
            title: entry.title,
            poster_path: entry.poster_url || entry.poster_path,
            posterUrl: entry.poster_url || entry.poster_path,
            release_date: entry.release_year ? `${entry.release_year}-01-01` : null,
            releaseYear: entry.release_year,
          }));
          setWatchlist(mappedWatchlist);
        }
      } catch (err) {
        if (isMounted) {
          setWatchlistError(err?.message || 'Unable to load watchlist.');
        }
      }
    };

    loadWatchlist();

    return () => {
      isMounted = false;
    };
  }, [targetUserId, isOwner]);

  // Load account creation date
  useEffect(() => {
    const loadAccountCreatedDate = async () => {
      setAccountCreatedLoading(true);
      setAccountCreatedError(null);

      try {
        // Check if user object already has created_at
        if (displayUser?.created_at || displayUser?.createdAt || displayUser?.created) {
          const dateStr = displayUser.created_at || displayUser.createdAt || displayUser.created;
          const formatted = formatDate(dateStr);
          setAccountCreatedDate(formatted);
          setAccountCreatedLoading(false);
          return;
        }

        if (isOwner) {
          // If not in user object, try fetching from /api/users/me
          const userData = await get('/api/users/me');
          const dateStr = userData?.created_at || userData?.createdAt || userData?.created;
          if (dateStr) {
            const formatted = formatDate(dateStr);
            setAccountCreatedDate(formatted);
          } else {
            setAccountCreatedError('Date not available');
          }
        } else if (targetUserId) {
          const userData = await get(`/api/users/${targetUserId}`);
          const dateStr = userData?.created_at || userData?.createdAt || userData?.created;
          if (dateStr) {
            const formatted = formatDate(dateStr);
            setAccountCreatedDate(formatted);
          } else {
            setAccountCreatedError('Date not available');
          }
        }
      } catch (err) {
        setAccountCreatedError(err?.message || 'Unable to load account date');
      } finally {
        setAccountCreatedLoading(false);
      }
    };

    if (targetUserId) {
      loadAccountCreatedDate();
    }
  }, [displayUser, isOwner, targetUserId]);

  // Load public user data when viewing another profile
  useEffect(() => {
    if (!routeUserId || isOwner) {
      return;
    }

    let isMounted = true;
    setPublicUserLoading(true);
    setPublicUserError(null);

    const loadPublicUser = async () => {
      try {
        const userData = await get(`/api/users/${routeUserId}`);
        if (isMounted) {
          setPublicUser(userData);
        }
      } catch (err) {
        if (isMounted) {
          setPublicUserError(err?.message || 'Unable to load user profile.');
        }
      } finally {
        if (isMounted) {
          setPublicUserLoading(false);
        }
      }
    };

    loadPublicUser();

    return () => {
      isMounted = false;
    };
  }, [routeUserId, isOwner]);

  // Return user to login page if they're not authenticated.
  if (!routeUserId && !isAuthenticated) return <Navigate to="/login" />;

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
      <StyledUserProfileContainer id="user-profile-container">
        <StyledUserInformation id="user-information">
          <StyledUsersName>{username}</StyledUsersName>
          {publicUserError && (
            <StyledText style={{ color: '#ffb4a2' }}>{publicUserError}</StyledText>
          )}
          {publicUserLoading && <StyledText>Loading profile...</StyledText>}
          <StyledText>
            Account Created:{' '}
            {accountCreatedLoading
              ? 'Loading...'
              : accountCreatedError
                ? accountCreatedError
                : accountCreatedDate || 'Date not available'}
          </StyledText>
        </StyledUserInformation>
        <div id="favourites">
          <StyledSubheadingLink to={isOwner ? '/favourites' : `/user/${targetUserId}/favourites`}>
            Favourites
          </StyledSubheadingLink>
          {favouritesError && (
            <StyledText style={{ color: '#ffb4a2' }}>{favouritesError}</StyledText>
          )}
          {!favouritesError && favourites.length === 0 && (
            <StyledText>
              No favourites yet. Add movies to your favourites to see them here.
            </StyledText>
          )}
          {favourites.length > 0 && (
            <>
              <StyledCarouselContainer>
                <MovieCarousel moviesArray={favourites.slice(0, 10)} />
              </StyledCarouselContainer>
              <StyledSeeMoreRow>
                <StyledSeeMoreLink
                  to={isOwner ? '/favourites' : `/user/${targetUserId}/favourites`}
                >
                  See more...
                </StyledSeeMoreLink>
              </StyledSeeMoreRow>
            </>
          )}
        </div>
        <div id="watchlist">
          <StyledSubheadingLink to={isOwner ? '/watchlist' : `/user/${targetUserId}/watchlist`}>
            Watchlist
          </StyledSubheadingLink>
          {watchlistError && <StyledText style={{ color: '#ffb4a2' }}>{watchlistError}</StyledText>}
          {!watchlistError && watchlist.length === 0 && (
            <StyledText>
              No items in your watchlist yet. Add movies to your watchlist to see them here.
            </StyledText>
          )}
          {watchlist.length > 0 && (
            <>
              <StyledCarouselContainer>
                <MovieCarousel moviesArray={watchlist.slice(0, 10)} />
              </StyledCarouselContainer>
              <StyledSeeMoreRow>
                <StyledSeeMoreLink to={isOwner ? '/watchlist' : `/user/${targetUserId}/watchlist`}>
                  See more...
                </StyledSeeMoreLink>
              </StyledSeeMoreRow>
            </>
          )}
        </div>
        <div id="reviews">
          <StyledSubheadingLink to={isOwner ? '/reviews' : `/user/${targetUserId}/reviews`}>
            Reviews
          </StyledSubheadingLink>
          <UserReviewPanel
            userId={targetUserId}
            limit={3}
            showViewAll={isOwner}
            isOwner={isOwner}
            usePublicEndpoints={!isOwner}
          />
        </div>
      </StyledUserProfileContainer>
    </StyledDashboard>
  );
}

export default UserProfilePage;
