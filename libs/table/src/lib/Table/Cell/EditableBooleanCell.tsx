import React, { FC } from 'react';
import { Cell } from 'react-table';
import styled from 'styled-components';

import { Toggle } from '@dg3/components';
import { CellUpdateFunction, EditableBoolean } from '@dg3/types';
import { getColumnId, getRowId } from '@dg3/utils';
import { TableCellContent } from './TableCellContent';

const StyledEditableCell = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  cell: Cell;
  updateData: CellUpdateFunction;
}

export const EditableBooleanCell: FC<Props> = (props) => {
  const { cell, updateData } = props;
  const value = cell.value.value ?? cell.value;
  const onToggle = (checked: boolean) =>
    updateData(getRowId(cell), getColumnId(cell), checked, cell.value);
  const editable: EditableBoolean = props.cell.column.editable;

  const title = value ? editable.trueLabel : editable.falseLabel;
  return (
    <StyledEditableCell>
      <TableCellContent tooltip={title}>{title}</TableCellContent>
      <Toggle checked={value} onToggle={onToggle} height={18} width={33} />
    </StyledEditableCell>
  );
};
