// Import state variables to navigate through to the search result page
import { useState } from 'react';
import { useNavigate } from 'react-router';

// Utility - formats URL after submitting search query
import getSearchURL from '../../utils/query-endpoints';

// Import the styling
import { 
  StyledForm, 
  StyledSearchBar, 
  StyledSearchButton 
} from './style';

// Search bar handles the processing of any queries submitted anywhere the component exists
export function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Goto the search results page with the query being in the URL
  const handleSubmit = async (event) => {
    event.preventDefault(); // Stop the default reloading page
    const searchQueryPage = getSearchURL(searchTerm);
    // navigate(searchQueryPage, {searchTerm: {searchTerm}});
    navigate(searchQueryPage);
  };

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledSearchBar
        type="text"
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchTerm}
        placeholder="Search"
      />
      <StyledSearchButton type="submit">Search</StyledSearchButton>
    </StyledForm>
  );
}