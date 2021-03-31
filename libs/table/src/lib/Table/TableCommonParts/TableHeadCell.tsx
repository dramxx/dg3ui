import React from 'react';
import { Column } from 'react-table';

import { OrderingType } from '@dg3/types';
import { ComplexTableHeadCell } from './ComplexTableHeadCell';
import { SimpleTableHeadCell } from './SimpleTableHeadCell';
import { StyledTableHeadCell } from './StyledTableHeadCell';

interface Props {
  simpleCell?: boolean;
  column: Column;
  setOpenedColumnFilterId: (columnId: string) => void;
  openedColumnFilterId: string;
  allowFilter: boolean;
  ordering?: OrderingType;
  changeOrdering?: (newOrdering: OrderingType) => void;
}

export const TableHeadCell = (props: Props) => {
  const { simpleCell, column } = props;

  return (
    <StyledTableHeadCell width={column.width}>
      {simpleCell ? (
        /* Header cell that just render value */
        <SimpleTableHeadCell column={column} />
      ) : (
        /* Header cell that can handle sorting/filtering */
        <ComplexTableHeadCell {...props} />
      )}
    </StyledTableHeadCell>
  );
};
