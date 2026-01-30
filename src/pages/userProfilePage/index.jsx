// Import Packages
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

// Utilies
import { useAuth } from '../../contexts/AuthContext';
import { get } from '../../api/api';
import { formatDate } from '../../utils/date-formatting';

// Components
import { MovieCarousel } from '../../components/movieCarousel'; // Favourite movies carousel
import { UserReviewPanel } from '../../components/userReviewPanel'; // User reviews panel

// Import the CSS styling for the user's profile page
import {
  StyledCarouselContainer,
  StyledDashboard,
  StyledSeeMoreLink,
  StyledSeeMoreRow,
  StyledStrongText,
  StyledSubheading,
  StyledSubheadingLink,
  StyledText,
  StyledUserInformation,
  StyledUserProfileContainer,
  StyledUsersName,
} from './style';

export function UserProfilePage() {
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
  const username = displayUser?.username || displayUser?.name || 'User';

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
