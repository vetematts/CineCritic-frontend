// Import packages that allow us to track which page we're on
import { Outlet } from "react-router-dom"

// Plugin the top level components that will exist on all the pages
import Header from '../components/Header';
import Footer from "../components/Footer";
import styled from "styled-components";

// Set the width of the main to match the root div container.
// This is used for the flex container and its children to reference
// when flexing.
const StyledMain = styled.main`
    // Set this to be a container and use 100% of the root's width
    width: 100%;
    display: flex;    
    justify-content: center;    // All items justified center
`;

// Create a templated layout for the webpage
function PageLayout({currentPage}) {
    return (
        <>
            {/* Only show the header when we're 
                not on the main/front page */}
            {(currentPage !== "/") && <Header />}
            <StyledMain>
                <Outlet />
            </StyledMain>
            <Footer />
        </>
    )
};

export default PageLayout;