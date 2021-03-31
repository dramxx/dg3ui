import * as React from 'react';
import styled from 'styled-components';

import { ClearFilterButton } from '@dg3/clear-filter-button';
import { SaveFilterButton } from '@dg3/saved-filters-window';
import { TimeFilter } from '@dg3/time-filter';
import { AmmContentFilter } from '../filter/AmmContentFilter';

const StyledFilterBox = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.theme.sizes.filterBoxHeight};
  padding-left: ${(props) => props.theme.spacing.normal};
  padding-right: ${(props) => props.theme.spacing.normal};
  width: 100%;
  > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing.small};
  }
`;

export const FilterBox: React.FC = () => {
  return (
    <StyledFilterBox>
      <AmmContentFilter />
      <ClearFilterButton />
      <TimeFilter />
      <SaveFilterButton />
    </StyledFilterBox>
  );
};
