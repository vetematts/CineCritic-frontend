// Import Packages
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Import the Search Bar component
import SearchBar from "../components/SearchBar";

// Import image assets
import banner from "../assets/cine_critic_logo.png";

// Styled components
// Align the home logo container to centre the image
const StyledBannerContainer = styled.figure`
    align-items: center;
    justify-content: center;
`;

// Re-size the logo to be roughly 1/3rd to 1/4th of the screen
const StyledHomeLogo = styled.img`
  height: 20rem;
  padding: 1.5em;
`;

// Style the advanced search link under the search bar
const StyledAdvancedSearchLink = styled(NavLink)`
    /* Same gold-ish colour scheme as headings */
    color: #e9da57;
    text-decoration: none;
    
    /* Align the contents of the container under and at the end of the search bar */
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0 0 2rem;
    width: 80rem;
`;

const StyledRandomRecommendations = styled.h3`
    align-items: flex-start;
    width: 100rem;
`;

// The default page that is loaded
function HomePage() {
    return (
        <>
            <StyledBannerContainer>
                <StyledHomeLogo 
                    src = {banner}
                    className = "home_logo" 
                    alt = "CineCritic Banner" 
                />
            </StyledBannerContainer>
            <SearchBar />
            <StyledAdvancedSearchLink to = "/advancedSearch">
                Advanced Search
            </StyledAdvancedSearchLink>
            <StyledRandomRecommendations>
                Random Recommendations
            </StyledRandomRecommendations>
            {/* Insert Recommendations Carousel */}
        </>
    );
}

export default HomePage;