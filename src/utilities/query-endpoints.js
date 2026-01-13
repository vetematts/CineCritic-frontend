// This file recreates the correct API end points when
// querying the database

// Film search endpoint
function getSearchURL(searchQuery) {
  return new URL(`/search/?q=${searchQuery}`);
}

export default {
  getSearchURL,
};
