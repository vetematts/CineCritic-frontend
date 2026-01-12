import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();

  // Return user to login page if they're not authenticated.
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <main>
      <h1>Dashboard (Placeholder)</h1>
      <div id="dev-information">
        <p>Authenticated: {JSON.stringify(isAuthenticated)}</p>
        <p>User: {JSON.stringify(user)}</p>
      </div>
      <button type="button" onClick={() => logout()}>
        Log out
      </button>
    </main>
  );
}
