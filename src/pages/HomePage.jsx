// Import Packages
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Import the Search Bar component
import SearchBar from "../components/SearchBar";

// Import image assets
import banner from "../assets/cine_critic_logo.png";

// Styled components
const StyledHomeContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledHomeRow = styled.div`
    display: flex;    
    flex: 1;

    &#home-search-bar {
        align-items: center;
    }

    &#home-advanced-search {
        // Align the contents of the container under and 
        // at the end of the search bar
        justify-content: flex-end;
    }

    &#home-random-recommendations{
        align-items: flex-start;
    }
`;

// Align the home logo container to centre the image
const StyledFigure = styled.figure`
    // Figure is the flex container for the image
    display: flex;    
    flex: 1;
    align-items: center;
    justify-content: center;
`;

// Re-size the logo to be roughly 1/3rd to 1/4th of the screen
const StyledHomeLogo = styled.img`
    // This takes shape according to the parent, the figure 
    // container
    flex: 1;
    width: 40%;

    // Provide a bit of space between the logo and the search
    // bar
    padding: 0 0 2rem 0;
`;

// Style the advanced search link under the search bar
const StyledAdvancedSearchLink = styled(NavLink)`
    // Same gold-ish colour scheme as headings
    color: #e9da57;
    text-decoration: none;

    padding: 1rem 0 0 2rem;
    max-width: 80rem;
`;

// The default page that is loaded
function HomePage() {
    return (
        <>
            <StyledHomeContainer className = "flex-container">
                    <StyledFigure id = "banner-container">
                        <StyledHomeLogo 
                            src = {banner}
                            className = "home_logo" 
                            alt = "CineCritic Banner" 
                        />
                    </StyledFigure>
                <StyledHomeRow id = "home-search-bar">
                    <SearchBar />
                </StyledHomeRow>
                <StyledHomeRow id = "home-advanced-search">
                    <StyledAdvancedSearchLink to = "/advancedSearch">
                        Advanced Search
                    </StyledAdvancedSearchLink>
                </StyledHomeRow>
                <StyledHomeRow id = "home-random-recommendations">
                    <h3>Random Recommendations</h3>
                    {/* Insert Recommendations Carousel */}
                </StyledHomeRow>
            </StyledHomeContainer>
        </>
    );
}

export default HomePage;