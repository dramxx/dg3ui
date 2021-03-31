import { Cell } from 'react-table';

export const getRowId = (cell: Cell): string => {
  const id = cell.row.original.id;
  return id.value ?? id;
};

export const getColumnId = (cell: Cell): string => cell.column.id;

const hasSimpleValue = (cell: Cell): boolean =>
  typeof cell.value !== 'object' ||
  cell.value === null ||
  Array.isArray(cell.value) ||
  cell.value instanceof Date;

export const getCellValue = (cell: Cell) =>
  hasSimpleValue(cell) ? cell.value : cell.value.value;
