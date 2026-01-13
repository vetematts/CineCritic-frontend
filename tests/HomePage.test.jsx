import { expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../src/pages/HomePage';
import { get } from '../src/api/api';

vi.mock('../src/api/api', () => ({
  get: vi.fn(),
}));

test('renders trending and top-rated lists', async () => {
  get
    .mockResolvedValueOnce([{ id: 1, title: 'Trending Movie' }])
    .mockResolvedValueOnce([{ id: 2, title: 'Top Rated Movie' }]);

  render(<HomePage />);

  await waitFor(() => {
    expect(get).toHaveBeenCalledWith('/api/movies/trending');
  });

  expect(screen.getByText('Trending Movie')).toBeInTheDocument();
  expect(screen.getByText('Top Rated Movie')).toBeInTheDocument();
});
