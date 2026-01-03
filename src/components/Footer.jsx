// Three div containers to flex as columns that contain different links
// with a regular div container that describes the site. The footer 
// will act as the inner-flex container.
function Footer() {
    return (
        <footer>
            <div class = "films-search">
                <ul>
                    <li>Advanced Search</li>
                    <li>All Films</li>
                </ul>
            </div>
            <div class = "your-account">
                <ul>
                    <li>Your Account</li>
                    <li>Register</li>
                    <li>Terms of Service</li>
                </ul>
            </div>
            <div class = "developer-links">
                <ul>
                    <li>API Documentation</li>
                    <li>Contact Us</li>
                    <li>Our GitHub</li>
                </ul>
            </div>
            <div class = "footer-description">
                <p>
                    Cinecritic is an unofficial film reviewing website where users can share their watchlists and film recommendations. This site was designed for academic purposes and to share our enthusiasm for films.
                </p>
            </div>
        </footer>
    )
}

export default Footer;