import { expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '../src/pages/DashboardPage';
import { get } from '../src/api/api';

vi.mock('../src/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 1 },
    isAuthenticated: true,
    logout: vi.fn(),
  }),
}));

vi.mock('../src/api/api', () => ({
  get: vi.fn(),
}));

test('loads and displays watchlist entries', async () => {
  get.mockResolvedValue([{ id: 1, title: 'Test Movie', release_year: 2020, status: 'planned' }]);

  render(<DashboardPage />);

  await waitFor(() => {
    expect(get).toHaveBeenCalledWith('/api/watchlist/1');
  });

  expect(screen.getByText(/watchlist/i)).toBeInTheDocument();
  expect(screen.getByText('Test Movie')).toBeInTheDocument();
  expect(screen.getByText(/2020/)).toBeInTheDocument();
  expect(screen.getByText(/planned/)).toBeInTheDocument();
});

test('shows empty state when watchlist is empty', async () => {
  get.mockResolvedValue([]);

  render(<DashboardPage />);

  await waitFor(() => {
    expect(get).toHaveBeenCalledWith('/api/watchlist/1');
  });

  expect(screen.getByText(/no items in your watchlist yet/i)).toBeInTheDocument();
});

test('renders watchlist items with poster images when poster_url is provided', async () => {
  get.mockResolvedValue([
    {
      id: 1,
      title: 'Test Movie',
      release_year: 2020,
      status: 'planned',
      poster_url: '/test-poster.jpg',
    },
  ]);

  render(<DashboardPage />);

  await waitFor(() => {
    const poster = screen.getByAltText('Test Movie poster');
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w200/test-poster.jpg');
  });
});

test('renders placeholder when poster_url is missing', async () => {
  get.mockResolvedValue([
    {
      id: 1,
      title: 'Test Movie',
      release_year: 2020,
      status: 'planned',
    },
  ]);

  render(<DashboardPage />);

  await waitFor(() => {
    expect(screen.getByText('No poster')).toBeInTheDocument();
  });
});

test('handles poster_path field from backend', async () => {
  get.mockResolvedValue([
    {
      id: 1,
      title: 'Test Movie',
      release_year: 2020,
      status: 'planned',
      poster_path: '/movie-poster.jpg',
    },
  ]);

  render(<DashboardPage />);

  await waitFor(() => {
    const poster = screen.getByAltText('Test Movie poster');
    expect(poster).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w200/movie-poster.jpg');
  });
});
