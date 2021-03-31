import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Column } from 'react-table';
import styled from 'styled-components';

import { SortDownArrowIcon, SortUpArrowIcon } from '@dg3/icons';
import { DgTheme } from '@dg3/types';
import { messages } from '../TableCommonParts/messages';

const StyledSortButton = styled.div<{ active: boolean }>`
  min-height: 24px;
  padding: 0 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey3};
  cursor: pointer;
  background-color: ${(props) => props.active && props.theme.colors.grey1};

  :last-child {
    border-bottom: 0;
  }

  :hover {
    background-color: ${(props) => props.theme.colors.grey1};
  }

  svg {
    margin-right: 6px;
  }
`;

interface Props {
  column: Column;
  theme: DgTheme;
}

export const SortingButtons: React.FC<Props> = (props: Props) => {
  const { column, theme } = props;

  const handleSorting = (
    { isSorted, isSortedDesc, clearSortBy, toggleSortBy } = column,
    sortDescending: boolean
  ) => {
    isSorted && isSortedDesc === sortDescending
      ? clearSortBy()
      : toggleSortBy(sortDescending);
  };

  return (
    <React.Fragment>
      <StyledSortButton
        active={column.isSortedDesc === false}
        onClick={() => handleSorting(column, false)}
      >
        <SortUpArrowIcon color={theme.colors.black} />
        <FormattedMessage {...messages.sortAscending} />
      </StyledSortButton>
      <StyledSortButton
        active={column.isSortedDesc}
        onClick={() => handleSorting(column, true)}
      >
        <SortDownArrowIcon color={theme.colors.black} />
        <FormattedMessage {...messages.sortDescending} />
      </StyledSortButton>
    </React.Fragment>
  );
};
