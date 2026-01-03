// Import the routing library
import { BrowserRouter } from 'react-router';

// Plugin the pages
import HomePage from './src/pages/HomePage'
import Footer from './src/components/Footer';

// Import the routes to connect all the page interactions
import AppRoutes from './AppRoutes';

// Import the styling for the application
import './App.css'


function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes>
          <main>
            <HomePage />
          </main>
        </AppRoutes>
      </BrowserRouter>
    </>
  )
}

export default App;
