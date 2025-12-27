// Import Routing features from the react-router library
import { Route, Routes } from "react-router";

// Import all the pages for AppRoutes to redirect users to
import HomePage from "./src/pages/HomePage";
import AdvancedSearchPage from "./src/pages/AdvancedSearchPage";

// This component handles all the routing to the different pages
function AppRoutes() {
    return (
        <Routes>
            <Route path = "/" element = {<HomePage />} />
            <Route path = "/advancedSearch" element = {<AdvancedSearchPage />} />
        </Routes>
    )
}

export default AppRoutes;