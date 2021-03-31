import { isEmpty } from 'ramda';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { NumberInput } from '@dg3/components';
import { FilledLeftArrowIcon, FilledRightArrowIcon } from '@dg3/icons';

const StyledPagination = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledPreviousNext = styled.div<{ active: boolean }>`
  cursor: ${(props) => (props.active ? 'pointer' : 'not-allowed')};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
`;

const StyledPageSelect = styled.div`
  margin-left: 5px;
`;

interface PaginationProps {
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
  pageIndex: number;
  pageOptions: number[];
}

export const Pagination: React.FC<PaginationProps> = (
  props: PaginationProps
) => {
  const { gotoPage, pageIndex, pageOptions } = props;

  const CURRENT_PAGE_NUMBER = pageIndex + 1;
  const [pageNumber, setPageNumber] = useState(CURRENT_PAGE_NUMBER);

  useEffect(() => {
    setPageNumber(CURRENT_PAGE_NUMBER);
  }, [pageIndex]);

  const canPrevious = pageIndex > 0;
  const canNext = pageIndex < pageOptions.length - 1;

  const handlePreviousClick = () => {
    if (canPrevious) {
      gotoPage(pageIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (canNext) {
      gotoPage(pageIndex + 1);
    }
  };

  const handleGotoPage = () => {
    if (isEmpty(pageNumber)) {
      setPageNumber(CURRENT_PAGE_NUMBER);
      return;
    }
    gotoPage(pageNumber - 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      (event.target as HTMLInputElement).blur();
      handleGotoPage();
    }
  };

  return (
    <StyledPagination>
      <StyledPreviousNext active={canPrevious} onClick={handlePreviousClick}>
        <FilledLeftArrowIcon active={canPrevious} />
      </StyledPreviousNext>

      <NumberInput
        value={pageNumber}
        onChange={setPageNumber}
        onBlur={handleGotoPage}
        onKeyDown={handleKeyDown}
        minimum={1}
        maximum={pageOptions.length}
        height={'20px'}
      />
      <StyledPageSelect>{`/ ${pageOptions.length}`}</StyledPageSelect>
      <StyledPreviousNext active={canNext} onClick={handleNextClick}>
        <FilledRightArrowIcon active={canNext} />
      </StyledPreviousNext>
    </StyledPagination>
  );
};
