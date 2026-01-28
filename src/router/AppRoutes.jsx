// Import the routing and current page tracking features 
// from the react-router library
import { Route, Routes, useLocation } from 'react-router';

// Import all the pages for AppRoutes to redirect users to
import AdvancedSearchPage from '../pages/AdvancedSearchPage';
import DiscoverPage from '../pages/DiscoverPage';
import FavouritesPage from '../pages/FavouritesPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MovieDetailPage from '../pages/MovieDetailPage';
import PageLayout from '../pages/PageLayout';
import SearchResultsPage from '../pages/SearchResultsPage';
import SignupPage from '../pages/SignupPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import UserProfilePage from '../pages/UserProfilePage';
import UserReviewsPage from '../pages/UserReviewsPage';
import WatchlistPage from '../pages/WatchlistPage';

// This component handles all the routing to the different pages
function AppRoutes() {
  // Find out what page we're on so we can hide the header if on 
  // the home page
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<PageLayout currentPage={location.pathname} />}>
        {' '}
        {/* Parent Route */}
        <Route index element={<HomePage />} /> {/* Rendered in the <Outlet /> */}
        <Route path="/advancedSearch" element={<AdvancedSearchPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/reviews" element={<UserReviewsPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/tos" element={<TermsOfServicePage />} />
        <Route path="/user" element={<UserProfilePage />} />
        <Route path="/user/:id" element={<UserProfilePage />} />
        <Route path="/user/:id/reviews" element={<UserReviewsPage />} />
        <Route path="/user/:id/favourites" element={<FavouritesPage />} />
        <Route path="/user/:id/watchlist" element={<WatchlistPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
