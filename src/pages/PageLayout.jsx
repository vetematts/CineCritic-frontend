// Import packages that allow us to track which page we're on
import { Outlet } from "react-router-dom";

// Plugin the top level components that will exist on all the pages
import Header from "../components/Header";
import Footer from "../components/Footer";

// Create a templated layout for the webpage
function PageLayout({ currentPage }) {
  return (
    <>
      {/* Only show the header when we're 
                not on the main/front page */}
      {currentPage !== "/" && <Header />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PageLayout;
