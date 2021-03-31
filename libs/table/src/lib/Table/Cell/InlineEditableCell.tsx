import React, { ComponentType, FC, useState } from 'react';
import { Cell } from 'react-table';
import styled from 'styled-components';

import { EditIcon } from '@dg3/icons';
import { CellUpdateFunction, InlineEditorProps } from '@dg3/types';
import { getCellValue } from '@dg3/utils';
import { TableCellContent } from './TableCellContent';

const StyledTriggerCell = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;

  :hover {
    margin: 0 -${(props) => props.theme.spacing.small}; // overrides parent padding
    width: calc(100% + 2 * ${(props) => props.theme.spacing.small});
    min-height: 100%;
    padding: 0 calc(${(props) => props.theme.spacing.small} - 1px);
    border: 1px solid ${(props) => props.theme.colors.primary2};
    border-radius: ${(props) => props.theme.radius.small};
  }
`;

const StyledContent = styled(TableCellContent)`
  margin-top: -1px;
`;

interface Props {
  cell: Cell;
  updateData: CellUpdateFunction;
  editor: ComponentType<InlineEditorProps>;
}

export const InlineEditableCell: FC<Props> = (props) => {
  const { cell, updateData, editor: Editor } = props;
  const [editing, setEditing] = useState(false);

  return editing ? (
    <Editor
      cell={cell}
      updateData={updateData}
      stopEditing={() => setEditing(false)}
    />
  ) : (
    <StyledTriggerCell onClick={() => setEditing(true)}>
      <StyledContent tooltip={getCellValue(cell)}>
        {getCellValue(cell)}
      </StyledContent>
      <EditIcon active={true} />
    </StyledTriggerCell>
  );
};

interface EditorProps {
  cell: Cell;
  updateData: CellUpdateFunction;
}

export const withInlineEditableCell = (
  editor: ComponentType<InlineEditorProps>
): FC<EditorProps> => (props) => (
  <InlineEditableCell editor={editor} {...props} />
);
