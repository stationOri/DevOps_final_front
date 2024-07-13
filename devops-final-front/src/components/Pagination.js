import React from 'react';
import "../css/components/Pagination.css";
import LeftPage from "../assets/images/left-chevron.png";

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange, activeColor }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="paginationWrapper">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className="paginationButton"
        disabled={currentPage === 1}
      >
        <img src={LeftPage} alt="Previous" className="paginationIcon" />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`paginationButton ${currentPage === index + 1 ? "active" : ""}`}
          style={{ backgroundColor: currentPage === index + 1 ? activeColor : 'white' }}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        className="paginationButton"
        disabled={currentPage === totalPages}
      >
        <img src={LeftPage} alt="Next" className="paginationIcon forrightarrow" />
      </button>
    </div>
  );
}

export default Pagination;