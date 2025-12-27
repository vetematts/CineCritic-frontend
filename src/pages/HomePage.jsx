import { NavLink } from "react-router-dom";

// Import the Search Bar component
import SearchBar from "../components/SearchBar";

function HomePage() {
    return (
        <>
            <figure>
                <img 
                    src = "../assets/cine_critic_logo.png" 
                    className = "home_logo" 
                    alt = "CineCritic Banner" 
                />
            </figure>
            <SearchBar />
            {/* <NavLink to = "/advancedSearch">
                Advanced Search
            </NavLink> */}
            <h3>Random Recommendations</h3>
            {/* Insert Recommendations Carousel */}
        </>
    );
}

export default HomePage;