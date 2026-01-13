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
  expect(screen.getByText('Test Movie (2020) - planned')).toBeInTheDocument();
});
