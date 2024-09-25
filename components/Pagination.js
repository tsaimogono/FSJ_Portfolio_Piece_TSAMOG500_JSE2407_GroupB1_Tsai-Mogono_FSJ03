import React from 'react';

/**
 * Pagination Component
 * Renders pagination controls to navigate between pages of content.
 * Displays "Previous" and "Next" buttons along with the current page number.
 * 
 * @param {Object} props - The component props.
 * @param {number} props.page - The current page number.
 * @param {number} props.totalPages - The total number of pages.
 * @param {Function} props.handlePageChange - Function to handle page changes.
 * 
 * @returns {JSX.Element} The Pagination component.
 */
const Pagination = ({ page, totalPages, handlePageChange }) => {
  return (
    <div className='mt-6 flex justify-center space-x-4'>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className='bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50'
      >
        Previous
      </button>
      {/* <span className='text-lg font-bold text-gray-700'>
        Page {page} of {totalPages}
      </span> */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
