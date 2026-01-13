import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { get } from '../api/api';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
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
    <main>
      <h1>Dashboard (Placeholder)</h1>
      <div id="dev-information">
        <p>Authenticated: {JSON.stringify(isAuthenticated)}</p>
        <p>User: {JSON.stringify(user)}</p>
      </div>
      <section>
        <h2>Watchlist</h2>
        {watchlistError && <p>{watchlistError}</p>}
        {watchlist.length === 0 && <p>No items in your watchlist yet.</p>}
        {watchlist.length > 0 && (
          <ul>
            {watchlist.map((entry) => (
              <li key={entry.id}>
                {entry.title} ({entry.release_year}) - {entry.status}
              </li>
            ))}
          </ul>
        )}
      </section>
      <button type="button" onClick={() => logout()}>
        Log out
      </button>
    </main>
  );
}
