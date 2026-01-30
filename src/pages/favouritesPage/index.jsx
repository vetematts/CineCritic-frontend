// Import navigation and state handling packages
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

// Import authorisation / security methods
import { useAuth } from '../../contexts/AuthContext';

// Import utilities 
import { get } from '../../api/api';
import getPosterUrl from '../../utils/image-pathing';

// Import the CSS styling of the favourites page elements
import { 
  StyledEmptyMessage, 
  StyledError, 
  StyledFavouritesContainer, 
  StyledFavouritesItem, 
  StyledFavouritesLink, 
  StyledFavouritesList, 
  StyledMovieTitle, 
  StyledFavouritesPoster, 
  StyledFavouritesPosterPlaceholder, 
  StyledPageTitle
} from './style';

export function FavouritesPage() {
  const { user, isAuthenticated } = useAuth();
  const { id: routeUserId } = useParams();
  const userId = user?.id ?? user?.sub ?? null;
  const targetUserId = routeUserId ? Number(routeUserId) : userId;
  const isOwner = !routeUserId || Number(routeUserId) === userId;
  const [favourites, setFavourites] = useState([]);
  const [favouritesError, setFavouritesError] = useState(null);

  useEffect(() => {
    if (!targetUserId) {
      return;
    }

    let isMounted = true;

    // Load the user's favourites once authenticated.
    const loadFavourites = async () => {
      setFavouritesError(null);
      try {
        const data = await get(
          isOwner
            ? `/api/favourites/${targetUserId}`
            : `/api/public/users/${targetUserId}/favourites`
        );
        if (isMounted) {
          setFavourites(data || []);
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

  // Return user to login page if they're not authenticated.
  if (!routeUserId && !isAuthenticated) return <Navigate to="/login" />;

  return (
    <StyledFavouritesContainer>
      <StyledPageTitle>Favourites</StyledPageTitle>
      {favouritesError && <StyledError>{favouritesError}</StyledError>}
      {favourites.length === 0 && (
        <StyledEmptyMessage>No items in your favourites yet.</StyledEmptyMessage>
      )}
      {favourites.length > 0 && (
        <StyledFavouritesList>
          {favourites.map((entry) => {
            const posterUrl = getPosterUrl(entry.poster_url || entry.poster_path, 'w200');
            // Backend now returns tmdb_id from the movies table join
            const movieId = entry.tmdb_id;
            return (
              <StyledFavouritesItem key={entry.movie_id || entry.id}>
                <StyledFavouritesLink to={`/movies/${movieId}`}>
                  {posterUrl ? (
                    <StyledFavouritesPoster src={posterUrl} alt={`${entry.title} poster`} />
                  ) : (
                    <StyledFavouritesPosterPlaceholder>No poster</StyledFavouritesPosterPlaceholder>
                  )}
                  <StyledMovieTitle>
                    <strong>{entry.title}</strong>
                    {entry.release_year && ` (${entry.release_year})`}
                  </StyledMovieTitle>
                </StyledFavouritesLink>
              </StyledFavouritesItem>
            );
          })}
        </StyledFavouritesList>
      )}
    </StyledFavouritesContainer>
  );
}