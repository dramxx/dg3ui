import React, { useState } from 'react';
import styled from 'styled-components';
import { FILTERABLE_CELL } from '@dg3/types';

const StyledFilterInput = styled.input<{ minWidth: number }>`
  background-color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => props.theme.fontWeight.normal};
  height: 21px;
  width: inherit;
  min-width: ${(props) => props.minWidth + 'ch'};
`;

export const DefaultColumnFilter = ({
  column: { filterValue, setFilter, Header },
}) => {
  const [value, setValue] = useState(filterValue || '');
  let timeout;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleChange = (event) => {
    const newvalue = event.target.value;
    setValue(newvalue);
    if (timeout) {
      clearTimeout(timeout);
      timeout = setTimeout(setFilter(newvalue), 300);
    } else {
      timeout = setTimeout(setFilter(newvalue), 300);
    }
  };

  return (
    <StyledFilterInput
      className={FILTERABLE_CELL}
      value={value}
      onClick={handleClick}
      onChange={handleChange}
      placeholder={Header}
      minWidth={Header.length}
      autoFocus
    />
  );
};
