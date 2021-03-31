import { ClickAwayListener, Popper } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { getColumnId, getRowId } from '@dg3/utils';
import { withInlineEditableCell } from './InlineEditableCell';

const StyledParent = styled.div`
  margin: 0 -${(props) => props.theme.spacing.small}; // overrides parent padding
  width: calc(100% + 2 * ${(props) => props.theme.spacing.small});
  min-height: 100%;
  padding: 0 calc(${(props) => props.theme.spacing.small} - 1px);
  border: 1px solid ${(props) => props.theme.colors.primary2};
  border-radius: ${(props) => props.theme.radius.small};
  outline: none;
`;

const StyledDropdown = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grey2};
  border-radius: ${(props) => props.theme.radius.small};
  box-shadow: ${(props) => props.theme.shadows.shadow3};
  background-color: ${(props) => props.theme.colors.white};
`;

const StyledItem = styled.div<{ active: boolean }>`
  padding: 0 ${(props) => props.theme.spacing.small};
  background-color: ${(props) =>
    props.active ? props.theme.colors.grey2 : props.theme.colors.white};
  color: ${(props) =>
    props.active ? props.theme.colors.primary2 : props.theme.colors.black};
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.colors.primary2};
    background-color: ${(props) =>
      props.active ? props.theme.colors.grey2 : props.theme.colors.grey1};
  }
`;

export const EditableEnumCell = withInlineEditableCell((props) => {
  const { cell, stopEditing, updateData } = props;
  // normally, ref would be used, state is necessary for correct placement (forces redraw)
  const [parent, setParent] = useState<HTMLDivElement>();
  const theme = useContext(ThemeContext);
  const value = cell.value.value;
  const valueId = cell.value.valueId;
  const items = cell.value.enumValues;

  const handleChange = (id: string) => {
    if (id !== valueId) {
      updateData(getRowId(cell), getColumnId(cell), id, cell.value);
    }
    stopEditing();
  };

  return (
    <>
      <StyledParent ref={(el) => setParent(el)}>{value}</StyledParent>
      {parent && (
        <Popper
          open={true}
          anchorEl={parent}
          placement="bottom"
          style={{ zIndex: theme.zIndex.modalContent }}
        >
          <ClickAwayListener onClickAway={stopEditing}>
            <StyledDropdown>
              {items.map(({ id, name }) => (
                <StyledItem
                  key={id}
                  active={id === valueId}
                  onClick={() => handleChange(id)}
                >
                  {name}
                </StyledItem>
              ))}
            </StyledDropdown>
          </ClickAwayListener>
        </Popper>
      )}
    </>
  );
});
