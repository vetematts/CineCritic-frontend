import { NavLink } from "react-router";
import styled from "styled-components";

// Create space between the main component and the footer
const StyledFooter = styled.footer`
    // Same width as the header    
    width: 76%;
    
    //Create distance between the footer and the main body
    margin: 15rem 0 0 0;
`;

// Allow the columns to shrink and grow depending on the screen size
// Allow the columns to tuck themselves under as a group depending on
// the type of device / screen resolution
const StyledFooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

// Provied enough space for the columns so users won't 
// accidentally press another link and there's enough space
// for visual clarity
const StyledFooterColumns = styled.div`
    // Allow the columns to shrink and grow depending 
    // on the screen size
    flex: 1;

    // Space the columns so they are now 1 column per 
    // row in mobile resolution
    min-width: 10rem;
    margin: 1rem;
`;

// Create some distance away from the description and the footer links
const StyledFooterTextContainer = styled.div`
    margin: 5rem 0 0 0;
`;

// Give the column headings a lighter grayish colour compared to the links
const StyledFooterHeadings = styled.h4`
    color: #cec8c8ff;
`;

// Give the description a greyish colour but not too bright to 
// draw the user's attention away from the body
const StyledFooterText = styled.p`
    color: #9b9393ff;
`;

// Give the links a greyish-offwhite colour
const StyledFooterLinks = styled(NavLink)`
    color: #9b9393ff;
    text-decoration: none;
`;

// Remove the indentation from list items
const StyledList = styled.ul`
    margin: 0;
    padding: 0;
`;

// Remove the list dots
const StyledFooterLinkList = styled.li`
    list-style: none;
`;

// Three div containers to flex as columns that contain different links
// with a regular div container that describes the site. The footer 
// will act as the inner-flex container.
function Footer() {
    return (
        <StyledFooter>
            <StyledFooterContainer id = "flex-container">
                <StyledFooterColumns id = "films-search">
                    <StyledFooterHeadings>Films</StyledFooterHeadings>
                    <StyledList>
                        <StyledFooterLinkList>
                            <StyledFooterLinks to = "/advancedSearch">
                                Advanced Search
                            </StyledFooterLinks>
                        </StyledFooterLinkList>
                        <StyledFooterLinkList><StyledFooterLinks>All Films</StyledFooterLinks></StyledFooterLinkList>
                    </StyledList>
                </StyledFooterColumns>
                <StyledFooterColumns id = "your-account">
                    <StyledFooterHeadings>Account</StyledFooterHeadings>
                    <StyledList>
                        <StyledFooterLinkList><StyledFooterLinks>Your Account</StyledFooterLinks></StyledFooterLinkList>
                        <StyledFooterLinkList><StyledFooterLinks>Register</StyledFooterLinks></StyledFooterLinkList>
                        <StyledFooterLinkList><StyledFooterLinks>Terms of Service</StyledFooterLinks></StyledFooterLinkList>
                    </StyledList>
                </StyledFooterColumns>
                <StyledFooterColumns id = "developer-links">
                    <StyledFooterHeadings>Developers</StyledFooterHeadings>
                    <StyledList>
                        <StyledFooterLinkList><StyledFooterLinks>API Documentation</StyledFooterLinks></StyledFooterLinkList>
                        <StyledFooterLinkList><StyledFooterLinks>Contact Us</StyledFooterLinks></StyledFooterLinkList>
                        <StyledFooterLinkList><StyledFooterLinks>Our GitHub</StyledFooterLinks></StyledFooterLinkList>
                    </StyledList>
                </StyledFooterColumns>
            </StyledFooterContainer>
            <StyledFooterTextContainer id = "footer-description">
                <StyledFooterText>
                    Cinecritic is an unofficial film reviewing website where users can share their watchlists and film recommendations.
                </StyledFooterText>
                <StyledFooterText>
                    Any images or text taken from the films are not a product of Cinecritic and are the copyrighted products of their producers. We respect the owners
                </StyledFooterText>
                <StyledFooterText>
                    This site was designed for academic purposes and to share our enthusiasm for films.
                </StyledFooterText>
            </StyledFooterTextContainer>
        </StyledFooter>
    );
}

export default Footer;