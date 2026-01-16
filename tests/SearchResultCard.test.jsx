import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SearchResultCard from '../src/components/SearchResultCard';

test('renders movie card with poster image when poster_path is provided', () => {
  render(
    <MemoryRouter>
      <SearchResultCard
        title="Test Movie"
        releaseYear="2023"
        description="A test movie description"
        poster_path="/test-poster.jpg"
      />
    </MemoryRouter>
  );

  const posterImage = screen.getByAltText('Test Movie poster');
  expect(posterImage).toBeInTheDocument();
  expect(posterImage).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w300/test-poster.jpg');
  expect(screen.getByText('Test Movie')).toBeInTheDocument();
  expect(screen.getByText('(2023)')).toBeInTheDocument();
});

test('renders movie card with poster image when posterUrl (full URL) is provided', () => {
  render(
    <MemoryRouter>
      <SearchResultCard
        title="Test Movie"
        releaseYear="2023"
        description="A test movie description"
        posterUrl="https://image.tmdb.org/t/p/w500/custom-poster.jpg"
      />
    </MemoryRouter>
  );

  const posterImage = screen.getByAltText('Test Movie poster');
  expect(posterImage).toBeInTheDocument();
  expect(posterImage).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/custom-poster.jpg');
});

test('renders placeholder div when poster_path is missing', () => {
  render(
    <MemoryRouter>
      <SearchResultCard
        title="Test Movie"
        releaseYear="2023"
        description="A test movie description"
      />
    </MemoryRouter>
  );

  expect(screen.queryByAltText('Test Movie poster')).not.toBeInTheDocument();
  expect(screen.getByText('No poster')).toBeInTheDocument();
  expect(screen.getByText('Test Movie')).toBeInTheDocument();
});

test('renders placeholder div when poster_path is null', () => {
  render(
    <MemoryRouter>
      <SearchResultCard
        title="Test Movie"
        releaseYear="2023"
        description="A test movie description"
        poster_path={null}
      />
    </MemoryRouter>
  );

  expect(screen.queryByAltText('Test Movie poster')).not.toBeInTheDocument();
  expect(screen.getByText('No poster')).toBeInTheDocument();
});

test('renders placeholder div when poster_path is empty string', () => {
  render(
    <MemoryRouter>
      <SearchResultCard
        title="Test Movie"
        releaseYear="2023"
        description="A test movie description"
        poster_path=""
      />
    </MemoryRouter>
  );

  expect(screen.queryByAltText('Test Movie poster')).not.toBeInTheDocument();
  expect(screen.getByText('No poster')).toBeInTheDocument();
});

test('creates correct link to movie detail page', () => {
  render(
    <MemoryRouter>
      <SearchResultCard
        id={123}
        title="Test Movie"
        releaseYear="2023"
        description="A test movie description"
        poster_path="/test-poster.jpg"
      />
    </MemoryRouter>
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/movies/123');
});
