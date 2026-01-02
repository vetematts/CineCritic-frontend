// Import packages that allow us to track which page we're on
import { Outlet } from "react-router-dom"

// Plugin the top level components that will exist on all the pages
import Header from './Header';
import Footer from "./Footer";

// Create a templated layout for the webpage
function Layout({currentPage}) {
    return (
        <>
            {/* Only show the header when we're 
                not on the main/front page */}
            {(currentPage !== "/") && <Header />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
};

export default Layout;