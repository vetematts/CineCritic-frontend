import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { get } from '../api/api';
import getPosterUrl from '../utils/image-pathing';

// Container for favourites content
const StyledFavouritesContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.87);

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

// Page title styling
const StyledPageTitle = styled.h1`
  color: rgba(255, 255, 255, 0.95);
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 2rem 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

// Error message styling
const StyledError = styled.p`
  color: #ffb4a2;
  margin: 0.5rem 0;
`;

// Empty state message styling
const StyledEmptyMessage = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 1rem 0;
`;

// Styled link for favourites items
const StyledFavouritesLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

// Styled components for favourites display
const StyledFavouritesItem = styled.li`
  padding: 1.25rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StyledFavouritesPoster = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 80px;
    height: 120px;
  }
`;

const StyledFavouritesPosterPlaceholder = styled.div`
  width: 100px;
  height: 150px;
  background-color: #5a5b5f;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 0.8em;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 80px;
    height: 120px;
  }
`;

const StyledFavouritesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Movie title styling
const StyledMovieTitle = styled.div`
  color: rgba(255, 255, 255, 0.87);

  strong {
    color: rgba(255, 255, 255, 0.95);
    font-weight: 600;
    font-size: 1.1rem;
  }

  // Year styling
  color: rgba(255, 255, 255, 0.7);
`;

export default function FavouritesPage() {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id ?? user?.sub ?? null;
  const [favourites, setFavourites] = useState([]);
  const [favouritesError, setFavouritesError] = useState(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    let isMounted = true;

    // Load the user's favourites once authenticated.
    const loadFavourites = async () => {
      setFavouritesError(null);
      try {
        const data = await get(`/api/favourites/${userId}`);
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
  }, [userId]);

  // Return user to login page if they're not authenticated.
  if (!isAuthenticated) return <Navigate to="/login" />;

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
