import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Mock useNavigate before importing SearchBar
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

import SearchBar from '../src/components/SearchBar';

test('submits search term and navigates to search results', async () => {
  render(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText(/search/i);
  await userEvent.type(input, 'alien');
  await userEvent.keyboard('{Enter}');

  // SearchBar navigates to /search?q=alien
  expect(mockNavigate).toHaveBeenCalledWith('/search?q=alien');
});
