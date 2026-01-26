// Build TMDB poster image URL from poster_path or posterUrl
// TMDB image base URL: https://image.tmdb.org/t/p/{size}{poster_path}
// Size options: w200, w300, w500, original
function getPosterUrl(posterPath, size = 'w500') {
  // If posterPath is null/undefined, return null for missing posters
  if (!posterPath) {
    return null;
  }

  // If posterPath is already a full URL (from backend posterUrl), return as-is
  if (posterPath.startsWith('http://') || posterPath.startsWith('https://')) {
    return posterPath;
  }

  // Build full TMDB image URL
  // Ensure posterPath starts with / (TMDB paths start with /)
  const path = posterPath.startsWith('/') ? posterPath : `/${posterPath}`;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export default getPosterUrl;
