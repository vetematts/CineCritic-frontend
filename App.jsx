// Import the routing library
import { BrowserRouter } from 'react-router';

// Import the routes to connect all the page interactions
import AppRoutes from './AppRoutes';

// Import the styling for the application
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App;
