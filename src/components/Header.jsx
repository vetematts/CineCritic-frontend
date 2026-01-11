// Import packages

// Import other components
import SearchBar from "./SearchBar";

// Import image assets
import logo from "../assets/cine_critic_logo_small.png";
import styled from "styled-components";
import { NavLink } from "react-router";

// Styled parts
// Create a responsive header that doesn't wrap and maintains its shape
// This is the flex container parent
const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-evenly;
    
    // Give the header an actual width so the flex children
    // have something to reference to
    width: 76%; // This is taking 76% of the root containers width

    // Place a small gap between each item in the navbar
    gap: 2rem;  

    // Add space between the header and the main body
    margin: 0 0 3rem 0;
`;

// These are the flex items within the flex container "Header"
const StyledHeaderColumns = styled.div`
    flex: 1;
        
    &#header-search-bar {
        // Make this item fill up the rest of the container
        flex-basis: 100%;
    }
`;

// Small icon that will grow and shrink with the rest of the header
const StyledLogo = styled.img`
    // display: flex;
    // flex: 1 0 5%;
    // flex: 1;    
`;

function Header() {
    return (
        <StyledHeader>
            <StyledHeaderColumns id = "site-logo">
                <NavLink to = "/">
                    <StyledLogo 
                        src = {logo} 
                        alt = "CineCritic Logo"
                    />
                </NavLink>
            </StyledHeaderColumns>
            <StyledHeaderColumns id = "header-search-bar">
                <SearchBar />
            </StyledHeaderColumns>
            <StyledHeaderColumns id = "user-menu">
                {/* Add in the user profile/menu */}
            </StyledHeaderColumns>
        </StyledHeader>
    );
}

export default Header;