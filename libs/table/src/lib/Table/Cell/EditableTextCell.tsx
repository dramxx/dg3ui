import React, { useState } from 'react';
import styled from 'styled-components';

import { getCellValue, getColumnId, getRowId } from '@dg3/utils';
import { withInlineEditableCell } from './InlineEditableCell';

const StyledInput = styled.input`
  margin: 0 -${(props) => props.theme.spacing.small}; // overrides parent padding
  width: calc(100% + 2 * ${(props) => props.theme.spacing.small});
  min-height: 100%;
  padding: 0 calc(${(props) => props.theme.spacing.small} - 1px);
  border: 1px solid ${(props) => props.theme.colors.primary2};
  border-radius: ${(props) => props.theme.radius.small};
  outline: none;
`;

export const EditableTextCell = withInlineEditableCell((props) => {
  const { cell, updateData, stopEditing } = props;
  const [value, setValue] = useState(getCellValue(cell));
  const handleSubmit = () => {
    if (value !== getCellValue(cell)) {
      updateData(getRowId(cell), getColumnId(cell), value, cell.value);
    }
    stopEditing();
  };
  const onKeyDown = (event) => {
    switch (event.keyCode) {
      case 27: // escape
        stopEditing();
        break;
      case 13: // enter
        handleSubmit();
        break;
    }
  };
  return (
    <StyledInput
      type="text"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={handleSubmit}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
});
