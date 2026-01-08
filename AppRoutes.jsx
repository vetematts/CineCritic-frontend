// Import Routing features from the react-router library
import { Route, Routes, useLocation } from "react-router";

// Import all the pages for AppRoutes to redirect users to
import Layout from "./src/components/Layout";
import HomePage from "./src/pages/HomePage";
import AdvancedSearchPage from "./src/pages/AdvancedSearchPage";

// This component handles all the routing to the different pages
function AppRoutes() {
    const location = useLocation();
  
    return (
        <Routes>
            <Route path = "/" element = {<Layout currentPage = {location.pathname} />}> {/* Parent Route */}
                <Route index element = {<HomePage />} /> {/* Rendered in the <Outlet /> */}
                <Route path = "/advancedSearch" element = {<AdvancedSearchPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;