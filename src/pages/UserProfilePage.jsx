import styled from "styled-components";

// Import image assets
import profilePic from '../assets/img/user/jackieChan.png';

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

// Set a restriction to the maximum size limit on the profile picture
// 160px x 160px
const StyledProfilePicture = styled.img`
  flex: 1;  
  max-width: 10rem;
  max-height: 10rem;
  border: 1px;
  border-radius: 10rem;
`;

// Give all the subheadings a similar grayish white as the 
// rest of the text but a bolder tone
const StyledSubheading = styled.h2`
  margin-bottom: 0.5rem;
`;

const StyledStrongText = styled.p`
  color: #bdbdbd;
  font-weight: bold;
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
  const []
  return (
    <StyledDashboard id = "dashboard">
      <StyledPortaitColumn id = "user-portait-badge-container">
        <div id="user-profile-portait">
          <StyledProfilePicture src={profilePic} className="profile-picture" alt="Profile Picture" />
          <div id = "badges">
            <StyledStrongText>Badges</StyledStrongText>
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
      </div>
    </StyledDashboard>
  );
}

export default UserProfilePage;