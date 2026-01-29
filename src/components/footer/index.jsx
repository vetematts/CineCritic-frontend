// Import the styling for each of the footer components
import { 
  StyledFooter,
  StyledFooterContainer,
  StyledFooterColumns,
  StyledFooterTextContainer,
  StyledFooterHeadings,
  StyledFooterText,
  StyledFooterLinks,
  StyledList,
  StyledFooterLinkList
} from './style';

// Three div containers to flex as columns that contain different links
// with a regular div container that describes the site. The footer
// will act as the inner-flex container.
export function Footer() {
  return (
    <StyledFooter>
      <StyledFooterContainer id="flex-container">
        <StyledFooterColumns id="films-search">
          <StyledFooterHeadings>Films</StyledFooterHeadings>
          <StyledList>
            <StyledFooterLinkList>
              <StyledFooterLinks to="/advancedSearch">Advanced Search</StyledFooterLinks>
            </StyledFooterLinkList>
            <StyledFooterLinkList>
              <StyledFooterLinks>All Films</StyledFooterLinks>
            </StyledFooterLinkList>
          </StyledList>
        </StyledFooterColumns>
        <StyledFooterColumns id="your-account">
          <StyledFooterHeadings>Account</StyledFooterHeadings>
          <StyledList>
            <StyledFooterLinkList>
              <StyledFooterLinks to="/user">Your Account</StyledFooterLinks>
            </StyledFooterLinkList>
            <StyledFooterLinkList>
              <StyledFooterLinks to="/signup">Register</StyledFooterLinks>
            </StyledFooterLinkList>
            <StyledFooterLinkList>
              <StyledFooterLinks to="/tos">Terms of Service</StyledFooterLinks>
            </StyledFooterLinkList>
          </StyledList>
        </StyledFooterColumns>
        <StyledFooterColumns id="developer-links">
          <StyledFooterHeadings>Developers</StyledFooterHeadings>
          <StyledList>
            <StyledFooterLinkList>
              <StyledFooterLinks to="https://vetematts.github.io/CineCritic-backend/#/">
                API Documentation
              </StyledFooterLinks>
            </StyledFooterLinkList>
            <StyledFooterLinkList>
              <StyledFooterLinks to="https://x.com/vetematts">Contact Us</StyledFooterLinks>
            </StyledFooterLinkList>
            <StyledFooterLinkList>
              <StyledFooterLinks to="https://github.com/users/vetematts/projects/2">
                Our GitHub
              </StyledFooterLinks>
            </StyledFooterLinkList>
          </StyledList>
        </StyledFooterColumns>
      </StyledFooterContainer>
      <StyledFooterTextContainer id="footer-description">
        <StyledFooterText>
          Cinecritic is an unofficial film reviewing website where users can share their watchlists
          and film recommendations.
        </StyledFooterText>
        <StyledFooterText>
          Any images or text taken from the films are not a product of Cinecritic and are the
          copyrighted products of their producers. We respect the owners
        </StyledFooterText>
        <StyledFooterText>
          This site was designed for academic purposes and to share our enthusiasm for films.
        </StyledFooterText>
      </StyledFooterTextContainer>
    </StyledFooter>
  );
}