// This file recreates the correct API end points when
// querying the database

// Film search endpoint
function getSearchURL(searchQuery) {
  const searchURL = `/search?q=${searchQuery}`;
  return new URL(searchURL, import.meta.url).href;
}

export default getSearchURL;
