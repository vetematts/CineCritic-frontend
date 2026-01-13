import { expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../src/components/SearchBar';
import { get } from '../src/api/api';

vi.mock('../src/api/api', () => ({
  get: vi.fn(),
}));

test('submits search term and calls search endpoint', async () => {
  get.mockResolvedValue([]);

  render(<SearchBar />);

  await userEvent.type(screen.getByPlaceholderText(/search/i), 'alien');
  await userEvent.click(screen.getByRole('textbox'));
  await userEvent.keyboard('{Enter}');

  await waitFor(() => {
    expect(get).toHaveBeenCalledWith('/api/movies/search', {
      params: { q: 'alien' },
    });
  });
});
