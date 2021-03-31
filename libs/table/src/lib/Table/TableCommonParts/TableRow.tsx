import React from 'react';

import { MappingObject } from '@dg3/schema';
import { StyledTableRow } from './StyledTableRow';
import { TableCell } from './TableCell';

interface Props {
  row: any;
  openedColumnFilterId: string;
  onColumnFilter?: (columnId: string, value: MappingObject) => void;
  allowSelect: boolean;
  allowRowSelect: boolean;
}

export const TableRow: React.FC<Props> = (props: Props) => {
  const { row, openedColumnFilterId, onColumnFilter, allowSelect } = props;

  return (
    <StyledTableRow
      openedColumnFilterId={openedColumnFilterId}
      {...row.getRowProps()}
      selected={row.isSelected}
    >
      {row.cells.map((cell, index) => {
        return (
          <TableCell
            key={cell.id}
            {...cell.getCellProps()}
            cell={cell}
            index={index}
            openedColumnFilterId={openedColumnFilterId}
            onColumnFilter={onColumnFilter}
            allowSelect={allowSelect}
          />
        );
      })}
    </StyledTableRow>
  );
};
