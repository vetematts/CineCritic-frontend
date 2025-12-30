// Import the methods used for unit testing
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

// Import the Advanced Search Page to test
import AdvancedSearchPage from "../../Not added yet/pages/AdvancedSearchPage";


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
test("Test Case 2: Check labels are correctly rendered", 
    () => {
        // Arrange
        render(<AdvancedSearchPage />);

        // Act: None
        // Assert: Labels are visible
        const titleLabel = screen.getByText(/Movie Title/i);
        const releaseYearLabel = screen.getByText(/Release Year/i);
        const filmCrewLabel = screen.getByText(/Film Crew/i);
        const ratingLabel = screen.getByText(/Rating/i);
        const genresLabel = screen.getByText(/Genres/i);
        expect(titleLabel).toBeInTheDocument();
        expect(releaseYearLabel).toBeInTheDocument();
        expect(filmCrewLabel).toBeInTheDocument();
        expect(ratingLabel).toBeInTheDocument();
        expect(genresLabel).toBeInTheDocument();
    }
)

// Test Case 3: Check the placeholder text in the input fields
test("Test Case 3: Check correct placeholder text in inputs",
    () => {
        // Arrange
        render(<AdvancedSearchPage />);

        // Act: None
        // Assert: Correct placeholder text in the input fields
        const titlePlaceholder = screen.getByPlaceholderText(/Any word in the name of the movie/i);
        const releaseYearPlaceholder = screen.getByPlaceholderText(/Any number when the movie was released/i);
        const filmCrewPlaceholder = screen.getByPlaceholderText(/Any word in the name of any film crew members/i);
        const ratingDropDownPlaceholder = screen.getByDisplayValue(/Equal to/i);
        const ratingPlaceholder = screen.getByPlaceholderText(/Any number between 0 and 5/i);
        const genresPlaceholder = screen.getByPlaceholderText(/Enter any genre/i);
        expect(titlePlaceholder).toBeInTheDocument();
        expect(releaseYearPlaceholder).toBeInTheDocument();
        expect(filmCrewPlaceholder).toBeInTheDocument();
        expect(ratingDropDownPlaceholder).toBeInTheDocument();
        expect(ratingPlaceholder).toBeInTheDocument();
        expect(genresPlaceholder).toBeInTheDocument();
    }
)