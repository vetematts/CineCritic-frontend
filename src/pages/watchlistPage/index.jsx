// Import navigation and state handling packages
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

// Import authorisation / security methods
import { useAuth } from '../../contexts/AuthContext';

// Import utilities
import { get } from '../../api/api';
import getPosterUrl from '../../utils/image-pathing';

// Import the CSS Styling for the watchlist page elements
import {
  StyledEmptyMessage,
  StyledError,
  StyledMovieTitle,
  StyledPageTitle,
  StyledWatchlistContainer,
  StyledWatchlistItem,
  StyledWatchlistLink,
  StyledWatchlistList,
  StyledWatchlistPoster,
  StyledWatchlistPosterPlaceholder,
} from './style';

export function WatchlistPage() {
  const { user, isAuthenticated } = useAuth();
  const { id: routeUserId } = useParams();
  const userId = user?.id ?? user?.sub ?? null;
  const targetUserId = routeUserId ? Number(routeUserId) : userId;
  const isOwner = !routeUserId || Number(routeUserId) === userId;
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistError, setWatchlistError] = useState(null);

  useEffect(() => {
    if (!targetUserId) {
      return;
    }

    let isMounted = true;

    // Load the user's watchlist once authenticated.
    const loadWatchlist = async () => {
      setWatchlistError(null);
      try {
        const data = await get(
          isOwner ? `/api/watchlist/${targetUserId}` : `/api/public/users/${targetUserId}/watchlist`
        );
        if (isMounted) {
          setWatchlist(data || []);
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

  // Return user to login page if they're not authenticated.
  if (!routeUserId && !isAuthenticated) return <Navigate to="/login" />;

  return (
    <StyledWatchlistContainer>
      <StyledPageTitle>Watchlist</StyledPageTitle>
      {watchlistError && <StyledError>{watchlistError}</StyledError>}
      {watchlist.length === 0 && (
        <StyledEmptyMessage>No items in your watchlist yet.</StyledEmptyMessage>
      )}
      {watchlist.length > 0 && (
        <StyledWatchlistList>
          {watchlist.map((entry) => {
            const posterUrl = getPosterUrl(entry.poster_url || entry.poster_path, 'w200');
            // Backend now returns tmdb_id from the movies table join
            const movieId = entry.tmdb_id;
            return (
              <StyledWatchlistItem key={entry.id}>
                <StyledWatchlistLink to={`/movies/${movieId}`}>
                  {posterUrl ? (
                    <StyledWatchlistPoster src={posterUrl} alt={`${entry.title} poster`} />
                  ) : (
                    <StyledWatchlistPosterPlaceholder>No poster</StyledWatchlistPosterPlaceholder>
                  )}
                  <StyledMovieTitle>
                    <strong>{entry.title}</strong>
                    {entry.release_year && ` (${entry.release_year})`}
                  </StyledMovieTitle>
                </StyledWatchlistLink>
              </StyledWatchlistItem>
            );
          })}
        </StyledWatchlistList>
      )}
    </StyledWatchlistContainer>
  );
}
