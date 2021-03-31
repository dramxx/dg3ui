import React, { FC } from 'react';
import { Cell, Column, useTable } from 'react-table';
import styled from 'styled-components';

import { EditableCellConfig } from '@dg3/schema';
import { CellUpdateFunction } from '@dg3/types';
import { getColumnId, getRowId, noop } from '@dg3/utils';
import { DefaultCellRender } from './Cell/DefaultCellRender';
import { EditableEnumCell } from './Cell/EditableEnumCell';
import { EditableTextCell } from './Cell/EditableTextCell';
import { StyledTableCell } from './TableCommonParts/StyledTableCell';
import { StyledTableHeadCell } from './TableCommonParts/StyledTableHeadCell';
import {
  StyledTableHeaderRow,
  StyledTableRow,
} from './TableCommonParts/StyledTableRow';

const StyledTable = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

const getEditableCell = (editable: EditableCellConfig): string => {
  switch (editable.type) {
    case 'string':
      return 'EditableTextCell';
    case 'enum':
      return 'EditableEnumCell';
  }
};

interface Props {
  data: { id: string; [key: string]: unknown }[];
  columns: Column[];
  editable: EditableCellConfig[];
  onCellEdit?: CellUpdateFunction;
}

export const AttributeTable: FC<Props> = (props) => {
  const { data, columns, editable, onCellEdit = noop } = props;
  const defaultColumn = {
    EditableTextCell,
    EditableEnumCell,
    Cell: DefaultCellRender,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ data, columns, defaultColumn, updateData: onCellEdit });

  const renderCell = (cell: Cell) => {
    const rowId = getRowId(cell);
    const columnId = getColumnId(cell);
    const editableConfig = editable.find(
      (config) => config.rowId === rowId && config.columnId === columnId
    );
    return editableConfig
      ? cell.render(getEditableCell(editableConfig))
      : cell.render('Cell');
  };

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map(({ getHeaderGroupProps, headers }) => (
          <StyledTableHeaderRow {...getHeaderGroupProps()}>
            {headers.map((column) => (
              <StyledTableHeadCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </StyledTableHeadCell>
            ))}
          </StyledTableHeaderRow>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <StyledTableRow {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <StyledTableCell {...cell.getCellProps()}>
                  {renderCell(cell)}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          );
        })}
      </tbody>
    </StyledTable>
  );
};
