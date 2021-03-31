import { isNil } from 'ramda';
import React from 'react';
import { Cell } from 'react-table';

import { renderValueByType } from '@dg3/components';
import { TableCellContent } from './TableCellContent';

export const renderValue = (cell: Cell) => {
  const cellValue = cell.row.original[cell.column.id];

  const value = isNil(cellValue?.value) ? cellValue : cellValue.value;

  return renderValueByType(value, cellValue?.options);
};

export const DefaultCellRender = ({ cell }) => {
  const value = renderValue(cell);
  return <TableCellContent tooltip={value}>{value}</TableCellContent>;
};
