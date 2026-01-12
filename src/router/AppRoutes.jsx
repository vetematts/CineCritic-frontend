// Import Routing features from the react-router library
import { Route, Routes, useLocation } from "react-router";

// Import all the pages for AppRoutes to redirect users to
import PageLayout from "../pages/PageLayout";
import HomePage from "../pages/HomePage";
import AdvancedSearchPage from "../pages/AdvancedSearchPage";
import SearchResults from "../pages/SearchResultsPage";

// This component handles all the routing to the different pages
function AppRoutes() {
    // Find out what page we're on so we can hide 
    // the header if on the home page
    const location = useLocation();
  
    return (
        <Routes>
            <Route path = "/" element = {<PageLayout currentPage = {location.pathname} />}> {/* Parent Route */}
                <Route index element = {<HomePage />} /> {/* Rendered in the <Outlet /> */}
                <Route path = "/advancedSearch" element = {<AdvancedSearchPage />} />
                <Route path = "/search" element = {<SearchResults />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;
