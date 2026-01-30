// Import the routing and current page tracking features
// from the react-router library
import { Route, Routes, useLocation } from 'react-router';

// Import all the pages for AppRoutes to redirect users to
import { AdvancedSearchPage } from '../pages/advancedSearchPage';
import { DiscoverPage } from '../pages/discoverPage';
import { FavouritesPage } from '../pages/favouritesPage';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import MovieDetailPage from '../pages/MovieDetailPage';
import { PageLayout } from '../pages/pageLayout';
import SearchResultsPage from '../pages/SearchResultsPage';
import { SignupPage } from '../pages/signupPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import UserProfilePage from '../pages/UserProfilePage';
import UserReviewsPage from '../pages/UserReviewsPage';
import { WatchlistPage } from '../pages/watchlistPage';

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
