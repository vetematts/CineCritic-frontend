// Import packages

// Import other components
import SearchBar from "./SearchBar";

// Import image assets
import logo from "../assets/cine_critic_logo_small.png";
import styled from "styled-components";
import { NavLink } from "react-router";

// Styled parts
// Create a responsive header that doesn't wrap and maintains its shape
const StyledHeader = styled.header`
    display: flex;
    flex: 1;
`;

// Small icon that will grow and shrink with the rest of the header
const StyledLogo = styled.img`
    display: flex;
    flex: 0;
    justify-content: flex-start;
`;

function Header() {
    return (
        <StyledHeader>
            <NavLink to = "/">
                <StyledLogo 
                    src = {logo} 
                    alt = "CineCritic Logo"
                />
            </NavLink>
            <SearchBar />
        </StyledHeader>
    );
}

export default Header;