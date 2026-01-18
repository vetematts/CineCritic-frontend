function UserProfilePage() {
  return (
    <>
    <div id = "flex-container">
      <div id = "user-portait-badge-container">
        <div id="user-profile-portait">
          <img src = {userProfile} />
          <div id = "badges">
            <p>Badges</p>
            <p>Put in a badge component and fill up this space with images of badges...</p>
          </div>
          <button type="button" id = "log-out">
            Log out
          </button>  
        </div>
    </div>
    <div id = "user-profile-container">
        <div id = "user-information">
          <p>User: </p>
          <p>Account Created:</p>
        </div>
        <div id = "favourites">
          <h2>Favourites</h2>
        </div>
        <div id = "watchlist">
          <h2>Watchlist</h2>
          <p>User's Watchlist Component here...</p>
          <p>Statuses: Watching, Completed, On Hold, Dropped, Want to Watch</p>
          <p>Movie/Show Poster, subtitle with the movie name and release year</p>
          <p>Episodes watched</p>
          <p>Score (Rating)</p>
        </div>
        <div id = "reviews">
          <p>Review Component here...</p>
          <p>Movie poster</p>
          <p>Movie name, release year</p>
          <p>Your rating:</p>
          <p>Your review:</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default UserProfilePage;