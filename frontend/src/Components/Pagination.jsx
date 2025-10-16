import React, { useState, useEffect } from 'react';
import '../styles/Pagination.css';

// A simple custom hook to get the window width
const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const windowWidth = useWindowSize();
  const isMobile = windowWidth < 600; // Mobile breakpoint

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Renders the page numbers specifically for the desktop view
  const renderDesktopPageNumbers = () => {
    const pages = [];

    // Add the previous page number if it exists
    if (currentPage > 1) {
      pages.push(currentPage - 1);
    }

    // Always add the current page number
    pages.push(currentPage);

    // Add the next page number if it exists
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }
    
    // Handle edge case where you are on the last page and there are more than 2 pages
    if (currentPage === totalPages && totalPages > 2) {
        pages.unshift(currentPage - 2);
    }

    // Handle edge case where you are on the first page and there are more than 2 pages
    if (currentPage === 1 && totalPages > 2) {
        pages.push(currentPage + 2);
    }


    return pages.map(pageNumber => (
      <button
        key={pageNumber}
        className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
        onClick={() => onPageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    ));
  };

  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  return (
    <nav className="pagination-nav" aria-label="Movie list pagination">
      <button className="page-arrow" onClick={handlePrevious} disabled={currentPage === 1}>
        &laquo; Prev
      </button>

      {isMobile ? (
        // Mobile View: Shows "Page X / Y"
        <div className="page-info">
          Page {currentPage} / {totalPages}
        </div>
      ) : (
        // Desktop View: Shows page numbers
        <div className="page-numbers">
          {renderDesktopPageNumbers()}
        </div>
      )}

      <button className="page-arrow" onClick={handleNext} disabled={currentPage === totalPages}>
        Next &raquo;
      </button>
    </nav>
  );
};

export default Pagination;