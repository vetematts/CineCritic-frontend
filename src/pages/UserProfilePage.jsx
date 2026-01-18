import styled from "styled-components";

// Stack the user's portait to the left of their details
const StyledDashboard = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: row;
  flex-wrap: wrap;
`;

// Portait should take no more than 20% of the space
const StyledPortaitColumn = styled.div`
  flex-basis: 20%
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
  return (
    <StyledDashboard id = "dashboard">
      <StyledPortaitColumn id = "user-portait-badge-container">
        <div id="user-profile-portait">
          {/* <img src = {userProfile} /> */}
          <div id = "badges">
            <p>Badges</p>
            <StyledText>Put in a badge component and fill up this space with images of badges...</StyledText>
          </div>
          <button type="button" id = "log-out">
            Log out
          </button>  
        </div>
    </StyledPortaitColumn>
    <div id = "user-profile-container">
        <div id = "user-information">
          <StyledUsersName>Jackie Chan</StyledUsersName>
          <StyledText>Account Created: January 18, 2026</StyledText>
        </div>
        <div id = "favourites">
          <StyledSubheading>Favourites</StyledSubheading>
        </div>
        <div id = "watchlist">
          <StyledSubheading>Watchlist</StyledSubheading>
          <p>User's Watchlist Component here...</p>
          <p>Statuses: Watching, Completed, On Hold, Dropped, Want to Watch</p>
          <p>Movie/Show Poster, subtitle with the movie name and release year</p>
          <p>Episodes watched</p>
          <p>Score (Rating)</p>
        </div>
        <div id = "reviews">
          <StyledSubheading>Reviews</StyledSubheading>
          <p>Review Component here...</p>
          <p>Movie poster</p>
          <p>Movie name, release year</p>
          <p>Your rating:</p>
          <p>Your review:</p>
        </div>
      </div>
    </StyledDashboard>
  );
}

export default UserProfilePage;