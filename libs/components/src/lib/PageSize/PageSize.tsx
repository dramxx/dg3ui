import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Dropdown, DropdownMenuItem } from '../Dropdown/Dropdown';
import { messages } from './messages';

const StyledPageSize = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 ${(props) => props.theme.spacing.small};
  color: ${(props) => props.theme.colors.black};

  .dropdownButton {
    background-color: ${(props) => props.theme.colors.white};
  }
`;

const StyledLabel = styled.div`
  padding-right: ${(props) => props.theme.spacing.small};
`;

const PAGE_SIZE_OPTIONS = [
  {
    id: '35',
    label: 35,
  },
  {
    id: '50',
    label: 50,
  },
  {
    id: '100',
    label: 100,
  },
];

interface PageSizeProps {
  setPageSize: (pageSize: number) => void;
  pageSize: number;
}

export const PageSize = (props: PageSizeProps) => {
  const { setPageSize, pageSize } = props;

  const handlePageSize = (id: string) => {
    const value = PAGE_SIZE_OPTIONS.find((item) => item.id === id);
    setPageSize(value.label);
  };

  const items: DropdownMenuItem[] = PAGE_SIZE_OPTIONS.map((item) => ({
    ...item,
    active: item.label === pageSize,
  }));

  return (
    <StyledPageSize>
      <StyledLabel>
        <FormattedMessage {...messages.itemsPerPage} />
      </StyledLabel>
      <Dropdown onValueChange={handlePageSize} label={pageSize} items={items} />
    </StyledPageSize>
  );
};
