// Import Routing features from the react-router library
import { Route, Routes, useLocation } from "react-router";

// Import all the pages for AppRoutes to redirect users to
import PageLayout from "./src/pages/PageLayout";
import HomePage from "./src/pages/HomePage";
import AdvancedSearchPage from "./src/pages/AdvancedSearchPage";
import MovieDetailPage from "./src/pages/MovieDetailPage";
import LoginPage from "./src/pages/LoginPage";
import SignupPage from "./src/pages/SignupPage";
import DashboardPage from "./src/pages/DashboardPage";

// This component handles all the routing to the different pages
function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<PageLayout currentPage={location.pathname} />}>
        {" "}
        {/* Parent Route */}
        <Route index element={<HomePage />} />{" "}
        {/* Rendered in the <Outlet /> */}
        <Route path="/advancedSearch" element={<AdvancedSearchPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
