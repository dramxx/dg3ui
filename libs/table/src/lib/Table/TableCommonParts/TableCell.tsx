import React from 'react';
import { Cell } from 'react-table';

import { MappingObject } from '@dg3/schema';
import { FILTERABLE_CELL, UNFILTERABLE_CELL } from '@dg3/types';
import { StyledTableCell } from './StyledTableCell';

interface Props {
  cell: Cell;
  index: number;
  openedColumnFilterId: string;
  onColumnFilter?: (columnId: string, value: MappingObject) => void;
  allowSelect: boolean;
}

export const TableCell: React.FC<Props> = (props: Props) => {
  const { cell, openedColumnFilterId, onColumnFilter, allowSelect } = props;
  const isFilterable = openedColumnFilterId === cell.column.id;

  const handleContextClick = (event, cell) => {
    const cellId = cell.column.id;
    const value = cell.row.original[cellId];

    if (onColumnFilter && !cell.column.disableColumnFilter) {
      onColumnFilter(cellId, value);
    }

    event.preventDefault();
    event.stopPropagation();
  };

  const calcClassname = openedColumnFilterId
    ? isFilterable
      ? FILTERABLE_CELL
      : UNFILTERABLE_CELL
    : null;

  const renderCell = (cell) => {
    if (cell.column.id === 'selection') {
      return cell.render('Cell');
    } else if (cell.column.editable) {
      return cell.render('EditableCell');
    } else if (cell.column.detailLink) {
      return cell.render('LinkCell');
    } else {
      return cell.render('Cell');
    }
  };

  return (
    <StyledTableCell
      className={calcClassname}
      width={cell.column.width}
      {...cell.getCellProps()}
      onContextMenu={(event) => handleContextClick(event, cell)}
      openedColumnFilterId={!!openedColumnFilterId}
      active={isFilterable}
      allowSelect={allowSelect}
    >
      {renderCell(cell)}
    </StyledTableCell>
  );
};
