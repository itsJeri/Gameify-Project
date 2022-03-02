import React from 'react';

function Pagination({ scoresPerPage, totalScores, setCurrentPage }) {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalScores / scoresPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => setCurrentPage(number)} href='#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination;