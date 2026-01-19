// Import Packages
import styled from "styled-components";
import { useState } from "react";

// Utilies
import { get } from '../api/api';

// Components
import MovieCarousel from "../components/MovieCarousel";  // Favourite movies carousel

// Stack the user's portait to the left of their details
const StyledDashboard = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  flex-wrap: wrap;
  width: 60%;
`;

// Give all the subheadings a similar grayish white as the 
// rest of the text but a bolder tone
const StyledSubheading = styled.h2`
  margin-bottom: 0.5rem;
`;

// Give all the regular text a grayish white
const StyledText = styled.p`
  margin: 0.25rem 0;
  color: #bdbdbd;
`;

const StyledUsersName = styled.h1`
  color: #bdbdbd;
`;

function UserProfilePage() {
  // Hooks                                          // Description
  const [favourites, setFavourites] = useState([]); // Use this to load up this user's favourite movies and fetch the posters

  // Load up this user's favourites, watchlist, and 
  // all their reviews when this page loads
  // useEffect(() => {})

  return (
    <StyledDashboard id = "dashboard">
      <div id = "logout-button">
        <button type="button" id = "log-out">
            Log out
        </button>
      </div>
      <div id = "user-information">
        <StyledUsersName>Jackie Chan</StyledUsersName>
        <StyledText>Account Created: January 18, 2026</StyledText>
      </div>
      <div id = "favourites">
        <StyledSubheading>Favourites</StyledSubheading>
        <MovieCarousel moviesArray = {favourites} />
      </div>
      <div id = "watchlist">
        <StyledSubheading>Watchlist</StyledSubheading>
        <StyledText>User's Watchlist Component here...</StyledText>
        <StyledText>Statuses: Watching, Completed, On Hold, Dropped, Want to Watch</StyledText>
        <StyledText>Movie/Show Poster, subtitle with the movie name and release year</StyledText>
        <StyledText>Episodes watched</StyledText>
        <StyledText>Score (Rating)</StyledText>
      </div>
      <div id = "reviews">
        <StyledSubheading>Reviews</StyledSubheading>
        <StyledText>Review Component here...</StyledText>
        <StyledText>Movie poster</StyledText>
        <StyledText>Movie name, release year</StyledText>
        <StyledText>Your rating:</StyledText>
        <StyledText>Your review:</StyledText>
      </div>
    </StyledDashboard>
  );
}

export default UserProfilePage;