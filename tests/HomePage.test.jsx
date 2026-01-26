import { expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock useNavigate before importing components that use it
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  NavLink: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('../src/api/api', () => ({
  get: vi.fn(),
}));

vi.mock('../src/contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    logout: vi.fn(),
  }),
}));

import HomePage from '../src/pages/HomePage';
import { get } from '../src/api/api';

test('renders trending and top-rated lists', async () => {
  get
    .mockResolvedValueOnce([
      { id: 1, title: 'Trending Movie', poster_path: '/trending-poster.jpg' },
    ])
    .mockResolvedValueOnce([{ id: 2, title: 'Top Rated Movie', poster_path: '/top-poster.jpg' }]);

  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(get).toHaveBeenCalledWith('/api/movies/trending');
  });

  // Check for section headings
  expect(screen.getByText('Trending')).toBeInTheDocument();
  expect(screen.getByText('Top Rated')).toBeInTheDocument();

  // Check that movie titles are rendered (when posters are present)
  // Movies appear in multiple sections (Random Recommendations, Trending, Top Rated)
  // so we use getAllByText to handle multiple occurrences
  expect(screen.getAllByText('Trending Movie').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Top Rated Movie').length).toBeGreaterThan(0);
});

test('renders movie posters when poster_path is provided', async () => {
  get
    .mockResolvedValueOnce([
      { id: 1, title: 'Trending Movie', poster_path: '/trending-poster.jpg' },
    ])
    .mockResolvedValueOnce([{ id: 2, title: 'Top Rated Movie', poster_path: '/top-poster.jpg' }]);

  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  await waitFor(() => {
    const posters = screen.getAllByAltText('Trending Movie poster');
    expect(posters.length).toBeGreaterThan(0);
    expect(posters[0]).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w200/trending-poster.jpg'
    );
  });
});

test('renders placeholder when poster_path is missing', async () => {
  get
    .mockResolvedValueOnce([{ id: 1, title: 'Trending Movie' }])
    .mockResolvedValueOnce([{ id: 2, title: 'Top Rated Movie' }]);

  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getAllByText('No poster').length).toBeGreaterThan(0);
  });
});

test('handles posterUrl (full URL) from backend', async () => {
  get
    .mockResolvedValueOnce([
      { id: 1, title: 'Trending Movie', posterUrl: 'https://image.tmdb.org/t/p/w500/custom.jpg' },
    ])
    .mockResolvedValueOnce([]);

  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  await waitFor(() => {
    const posters = screen.getAllByAltText('Trending Movie poster');
    expect(posters.length).toBeGreaterThan(0);
    expect(posters[0]).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/custom.jpg');
  });
});
