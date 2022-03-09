import React from 'react';

import { Pagination } from 'react-bootstrap';

function Paginate({ scoresPerPage, totalScores, currentPage, setCurrentPage }) {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalScores / scoresPerPage); i++) {
    pageNumbers.push(i);
  }

  function displayedPages() {
    if (pageNumbers.length < 5) return pageNumbers;
    // handle upper pagination
    if (currentPage > pageNumbers.length - 3) {
      return pageNumbers.slice((pageNumbers.length - 5), pageNumbers.length);
    // handle mid pagination
    } else if (currentPage > 2) {
      return pageNumbers.slice((currentPage - 3), (currentPage + 2));
    //handle lower pagination
    } else if (currentPage <= 2) {
      return pageNumbers.slice(0, 5);
    } 
  }

  return (
    <nav>
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(1)} />
        {displayedPages().map(number => {
          const isActive = number === currentPage;
          return (
          <Pagination.Item key={number} active={isActive} onClick={() => setCurrentPage(number)}>
            {number}
          </Pagination.Item>
        )
        })}
        <Pagination.Last onClick={() => setCurrentPage(pageNumbers.length)} />
      </Pagination>
    </nav>
  )
}

export default Paginate;