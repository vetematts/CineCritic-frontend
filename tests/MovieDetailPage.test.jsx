import { expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MovieDetailPage from '../src/pages/MovieDetailPage';
import { get } from '../src/api/api';

vi.mock('../src/api/api', () => ({
  get: vi.fn(),
}));

vi.mock('../src/contexts/AuthContext', () => ({
  useAuth: () => ({ user: null }),
}));

test('renders movie detail and reviews', async () => {
  get
    .mockResolvedValueOnce({ title: 'Alien', release_date: '1979-05-25' })
    .mockResolvedValueOnce([{ id: 1, content: 'Great movie', rating: 5 }]);

  render(
    <MemoryRouter initialEntries={['/movies/123']}>
      <Routes>
        <Route path="/movies/:id" element={<MovieDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(get).toHaveBeenCalledWith('/api/movies/123');
  });

  expect(screen.getByText('Alien')).toBeInTheDocument();
  expect(screen.getByText(/released 1979-05-25/i)).toBeInTheDocument();
  expect(screen.getByText('Great movie')).toBeInTheDocument();
});
