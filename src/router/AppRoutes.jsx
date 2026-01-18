// Import Routing features from the react-router library
import { Route, Routes, useLocation } from 'react-router';

// Import all the pages for AppRoutes to redirect users to
import PageLayout from '../pages/PageLayout';
import HomePage from '../pages/HomePage';
import AdvancedSearchPage from '../pages/AdvancedSearchPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import MovieDetailPage from '../pages/MovieDetailPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import UserProfilePage from '../pages/UserProfilePage';

// This component handles all the routing to the different pages
function AppRoutes() {
  // Find out what page we're on so we can hide
  // the header if on the home page
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<PageLayout currentPage={location.pathname} />}>
        {' '}
        {/* Parent Route */}
        <Route index element={<HomePage />} /> {/* Rendered in the <Outlet /> */}
        <Route path="/advancedSearch" element={<AdvancedSearchPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user" element={<UserProfilePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
