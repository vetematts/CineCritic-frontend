import { expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProfilePage from '../src/pages/UserProfilePage';
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
  get.mockImplementation((url) => {
    if (url === '/api/users/me') {
      return Promise.resolve({ created_at: '2020-01-01' });
    }
    if (url.startsWith('/api/favourites/')) {
      return Promise.resolve([]);
    }
    if (url.startsWith('/api/watchlist/')) {
      return Promise.resolve([
        { tmdb_id: 1, title: 'Test Movie', release_year: 2020, poster_url: '/test-poster.jpg' },
      ]);
    }
    return Promise.resolve([]);
  });

  render(
    <MemoryRouter>
      <UserProfilePage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(get).toHaveBeenCalledWith('/api/watchlist/1');
  });

  expect(screen.getByText(/watchlist/i)).toBeInTheDocument();
  expect(screen.getByText('Test Movie')).toBeInTheDocument();
  expect(screen.getByText(/2020/)).toBeInTheDocument();
});

test('shows empty state when watchlist is empty', async () => {
  get.mockImplementation((url) => {
    if (url === '/api/users/me') {
      return Promise.resolve({ created_at: '2020-01-01' });
    }
    if (url.startsWith('/api/favourites/')) {
      return Promise.resolve([]);
    }
    if (url.startsWith('/api/watchlist/')) {
      return Promise.resolve([]);
    }
    return Promise.resolve([]);
  });

  render(
    <MemoryRouter>
      <UserProfilePage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(get).toHaveBeenCalledWith('/api/watchlist/1');
  });

  expect(screen.getByText(/no items in your watchlist yet/i)).toBeInTheDocument();
});

test('renders watchlist items with poster images when poster_url is provided', async () => {
  get.mockImplementation((url) => {
    if (url === '/api/users/me') {
      return Promise.resolve({ created_at: '2020-01-01' });
    }
    if (url.startsWith('/api/favourites/')) {
      return Promise.resolve([]);
    }
    if (url.startsWith('/api/watchlist/')) {
      return Promise.resolve([
        {
          tmdb_id: 1,
          title: 'Test Movie',
          release_year: 2020,
          poster_url: '/test-poster.jpg',
        },
      ]);
    }
    return Promise.resolve([]);
  });

  render(
    <MemoryRouter>
      <UserProfilePage />
    </MemoryRouter>
  );

  await waitFor(() => {
    const poster = screen.getByAltText('Test Movie poster');
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w200/test-poster.jpg');
  });
});

test('renders placeholder when poster_url is missing', async () => {
  get.mockImplementation((url) => {
    if (url === '/api/users/me') {
      return Promise.resolve({ created_at: '2020-01-01' });
    }
    if (url.startsWith('/api/favourites/')) {
      return Promise.resolve([]);
    }
    if (url.startsWith('/api/watchlist/')) {
      return Promise.resolve([
        {
          tmdb_id: 1,
          title: 'Test Movie',
          release_year: 2020,
        },
      ]);
    }
    return Promise.resolve([]);
  });

  render(
    <MemoryRouter>
      <UserProfilePage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('No poster')).toBeInTheDocument();
  });
});

test('handles poster_path field from backend', async () => {
  get.mockImplementation((url) => {
    if (url === '/api/users/me') {
      return Promise.resolve({ created_at: '2020-01-01' });
    }
    if (url.startsWith('/api/favourites/')) {
      return Promise.resolve([]);
    }
    if (url.startsWith('/api/watchlist/')) {
      return Promise.resolve([
        {
          tmdb_id: 1,
          title: 'Test Movie',
          release_year: 2020,
          poster_path: '/movie-poster.jpg',
        },
      ]);
    }
    return Promise.resolve([]);
  });

  render(
    <MemoryRouter>
      <UserProfilePage />
    </MemoryRouter>
  );

  await waitFor(() => {
    const poster = screen.getByAltText('Test Movie poster');
    expect(poster).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w200/movie-poster.jpg');
  });
});
