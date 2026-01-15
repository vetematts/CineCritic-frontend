// This file recreates the correct API end points when
// querying the database

// Film search endpoint
function getSearchURL(searchQuery) {
  const trimmed = String(searchQuery ?? '').trim();
  const searchURL = `/search?q=${encodeURIComponent(trimmed)}`;
  return searchURL;
}

export default getSearchURL;
