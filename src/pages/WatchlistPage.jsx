import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { get } from '../api/api';
import getPosterUrl from '../utilities/image-pathing';

// Container for watchlist content
const StyledWatchlistContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

// Styled components for watchlist display
const StyledWatchlistItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  list-style: none;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const StyledWatchlistPoster = styled.img`
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

const StyledWatchlistPosterPlaceholder = styled.div`
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

const StyledWatchlistList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default function WatchlistPage() {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id ?? user?.sub ?? null;
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistError, setWatchlistError] = useState(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    let isMounted = true;

    // Load the user's watchlist once authenticated.
    const loadWatchlist = async () => {
      setWatchlistError(null);
      try {
        const data = await get(`/api/watchlist/${userId}`);
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
  }, [userId]);

  // Return user to login page if they're not authenticated.
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <StyledWatchlistContainer>
      <h1>Watchlist</h1>
      {watchlistError && <p>{watchlistError}</p>}
      {watchlist.length === 0 && <p>No items in your watchlist yet.</p>}
      {watchlist.length > 0 && (
        <StyledWatchlistList>
          {watchlist.map((entry) => {
            const posterUrl = getPosterUrl(entry.poster_url || entry.poster_path, 'w200');
            return (
              <StyledWatchlistItem key={entry.id}>
                {posterUrl ? (
                  <StyledWatchlistPoster src={posterUrl} alt={`${entry.title} poster`} />
                ) : (
                  <StyledWatchlistPosterPlaceholder>No poster</StyledWatchlistPosterPlaceholder>
                )}
                <div>
                  <strong>{entry.title}</strong> {entry.release_year && `(${entry.release_year})`}
                </div>
              </StyledWatchlistItem>
            );
          })}
        </StyledWatchlistList>
      )}
    </StyledWatchlistContainer>
  );
}
