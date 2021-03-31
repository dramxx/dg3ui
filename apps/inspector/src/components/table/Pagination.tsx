import React, { FC } from 'react';

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = (props: PaginationProps) => {
  const { total, page, pageSize, onPageChange } = props;

  const pageCount = Math.ceil(total / pageSize);
  const isFirstPage = pageCount === 0 || page === 0;
  const isLastPage = pageCount === 0 || page === pageCount - 1;

  return (
    <div style={{ padding: '10px' }}>
      <button
        style={{ backgroundColor: 'whitesmoke', color: isFirstPage ? 'lightgrey' : 'black', cursor: 'pointer' }}
        disabled={isFirstPage}
        onClick={() => onPageChange(page - 1)}
      >
        previous page
      </button>
      <button onClick={() => onPageChange(page)} style={{ cursor: 'pointer', backgroundColor: 'lightblue' }}>
        {page + 1}
      </button>
      <button
        style={{ backgroundColor: 'whitesmoke', color: isLastPage ? 'lightgrey' : 'black', cursor: 'pointer' }}
        disabled={isLastPage}
        onClick={() => onPageChange(page + 1)}
      >
        next page
      </button>
    </div>
  );
};

export default Pagination;
