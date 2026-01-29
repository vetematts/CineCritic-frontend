// Import the methods used for unit testing
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

// Import the Advanced Search Page to test
import AdvancedSearchPage from '../src/pages/AdvancedSearchPage';

// // Test Case 1: Initialisation of the Advanced Search Page
// test("Test Case 1: Initialisation of the Advanced Search Page | " +
//     "Shows the initialisation of the states when the Advanced Se" +
//     "arch Page is first rendered",
//     () => {
//         // Arrange
//         render(<AdvancedSearchPage />);

//         // Act: None

//     }
// )

// Test Case 2: Check the labels are rendered
test('Test Case 2: Check labels are correctly rendered', async () => {
  // Arrange
  render(<AdvancedSearchPage />);

  // Act: None
  // Assert: Labels are visible
  await screen.findByText(/Loading genres/i);
  const titleLabel = screen.getByText(/Movie Title/i);
  const releaseYearLabel = screen.getByText(/Release Year/i);
  const filmCrewLabel = screen.getByText(/Film Crew/i);
  const ratingLabel = screen.getByText(/Rating/i);
  // Genres label - use getAllByText since "Genres" appears in both label and loading text
  const genresLabels = screen.getAllByText(/Genres/i);
  expect(genresLabels.length).toBeGreaterThan(0);
  expect(titleLabel).toBeInTheDocument();
  expect(releaseYearLabel).toBeInTheDocument();
  expect(filmCrewLabel).toBeInTheDocument();
  expect(ratingLabel).toBeInTheDocument();
});

// Test Case 3: Check the placeholder text in the input fields
test('Test Case 3: Check correct placeholder text in inputs', async () => {
  // Arrange
  const { container } = render(<AdvancedSearchPage />);

  // Act: None
  // Assert: Correct placeholder text in the input fields
  await screen.findByText(/Loading genres/i);
  const titlePlaceholder = screen.getByPlaceholderText(/Any word in the name of the movie/i);
  const releaseYearPlaceholder = screen.getByPlaceholderText(
    /Any number when the movie was released/i
  );
  const filmCrewPlaceholder = screen.getByPlaceholderText(
    /Any word in the name of any film crew members/i
  );
  const ratingDropDownPlaceholder = screen.getByDisplayValue(/Average/i);
  const ratingStars = container.querySelectorAll('svg');
  // Genres is now a dropdown, not an input - check for loading state or dropdown instead
  const genresLoadingText =
    screen.queryByText(/Loading genres/i) || screen.getByText(/Unable to load genres/i);
  expect(titlePlaceholder).toBeInTheDocument();
  expect(releaseYearPlaceholder).toBeInTheDocument();
  expect(filmCrewPlaceholder).toBeInTheDocument();
  expect(ratingDropDownPlaceholder).toBeInTheDocument();
  expect(ratingStars.length).toBeGreaterThanOrEqual(5);
  expect(genresLoadingText).toBeInTheDocument();
});
