import React, { FC } from 'react';
import { Cell } from 'react-table';

import { CellUpdateFunction } from '@dg3/types';
import { EditableBooleanCell } from './EditableBooleanCell';
import { EditableTextCell } from './EditableTextCell';

interface Props {
  cell: Cell;
  updateData: CellUpdateFunction;
}

export const EditableCellRender: FC<Props> = (props) => {
  switch (props.cell.column.editable.type) {
    case 'text':
      return <EditableTextCell {...props} />;
    case 'boolean':
      return <EditableBooleanCell {...props} />;
  }
};
