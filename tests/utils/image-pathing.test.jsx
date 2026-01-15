import { expect, test } from 'vitest';
import getPosterUrl from '../../src/utilities/image-pathing';

test('builds TMDB poster URL from poster_path', () => {
  const result = getPosterUrl('/test-poster.jpg', 'w500');
  expect(result).toBe('https://image.tmdb.org/t/p/w500/test-poster.jpg');
});

test('builds TMDB poster URL without leading slash', () => {
  const result = getPosterUrl('test-poster.jpg', 'w500');
  expect(result).toBe('https://image.tmdb.org/t/p/w500/test-poster.jpg');
});

test('uses different image sizes correctly', () => {
  expect(getPosterUrl('/poster.jpg', 'w200')).toBe('https://image.tmdb.org/t/p/w200/poster.jpg');
  expect(getPosterUrl('/poster.jpg', 'w300')).toBe('https://image.tmdb.org/t/p/w300/poster.jpg');
  expect(getPosterUrl('/poster.jpg', 'w500')).toBe('https://image.tmdb.org/t/p/w500/poster.jpg');
  expect(getPosterUrl('/poster.jpg', 'original')).toBe('https://image.tmdb.org/t/p/original/poster.jpg');
});

test('defaults to w500 size when size not provided', () => {
  const result = getPosterUrl('/test-poster.jpg');
  expect(result).toBe('https://image.tmdb.org/t/p/w500/test-poster.jpg');
});

test('returns null when poster_path is null', () => {
  const result = getPosterUrl(null);
  expect(result).toBeNull();
});

test('returns null when poster_path is undefined', () => {
  const result = getPosterUrl(undefined);
  expect(result).toBeNull();
});

test('returns null when poster_path is empty string', () => {
  const result = getPosterUrl('');
  expect(result).toBeNull();
});

test('returns full URL as-is when poster_path is already a full URL (http)', () => {
  const fullUrl = 'http://example.com/poster.jpg';
  const result = getPosterUrl(fullUrl);
  expect(result).toBe(fullUrl);
});

test('returns full URL as-is when poster_path is already a full URL (https)', () => {
  const fullUrl = 'https://image.tmdb.org/t/p/w500/custom-poster.jpg';
  const result = getPosterUrl(fullUrl);
  expect(result).toBe(fullUrl);
});

test('handles posterUrl from backend (full URL)', () => {
  const backendUrl = 'https://image.tmdb.org/t/p/w500/backend-poster.jpg';
  const result = getPosterUrl(backendUrl, 'w300');
  // Should return as-is since it's already a full URL
  expect(result).toBe(backendUrl);
});
