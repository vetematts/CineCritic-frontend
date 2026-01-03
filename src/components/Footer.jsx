import styled from "styled-components";

const StyledFooter = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const StyledFooterColumns = styled.div`
    flex: 1;
`;

const StyledFooterHeadings = styled.h4`
    color: #e0d9d9ff;
`;

const StyledFooterText = styled.p`
    color: #c2b9b9ff;
`;


// Three div containers to flex as columns that contain different links
// with a regular div container that describes the site. The footer 
// will act as the inner-flex container.
function Footer() {
    return (
        <footer>
            <StyledFooter id = "flex-container">
                <StyledFooterColumns id = "films-search">
                    <StyledFooterHeadings>Films</StyledFooterHeadings>
                    <ul>
                        <li>Advanced Search</li>
                        <li>All Films</li>
                    </ul>
                </StyledFooterColumns>
                <StyledFooterColumns id = "your-account">
                    <StyledFooterHeadings>Account</StyledFooterHeadings>
                    <ul>
                        <li>Your Account</li>
                        <li>Register</li>
                        <li>Terms of Service</li>
                    </ul>
                </StyledFooterColumns>
                <StyledFooterColumns id = "developer-links">
                    <StyledFooterHeadings>Developers</StyledFooterHeadings>
                    <ul>
                        <li>API Documentation</li>
                        <li>Contact Us</li>
                        <li>Our GitHub</li>
                    </ul>
                </StyledFooterColumns>
            </StyledFooter>
            <StyledFooterColumns id = "footer-description">
                <StyledFooterText>
                    Cinecritic is an unofficial film reviewing website where users can share their watchlists and film recommendations.
                </StyledFooterText>
                <StyledFooterText>
                    This site was designed for academic purposes and to share our enthusiasm for films.
                </StyledFooterText>
            </StyledFooterColumns>
        </footer>
    );
}

export default Footer;