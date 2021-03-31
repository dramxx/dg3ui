import * as React from 'react';
import styled from 'styled-components';

import { SortDownArrowIcon, SortUpArrowIcon } from '@dg3/icons';
import { OrderDirectionType } from '@dg3/types';

const StyledSortingIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;

  svg {
    margin-left: ${(props) => props.theme.spacing.small};
    margin-right: 0;
  }
`;

export const getSortingIcon = (
  sortingOrder: OrderDirectionType | undefined
) => {
  return (
    sortingOrder && (
      <StyledSortingIcon className={'sortIcon'}>
        {sortingOrder === 'DESCENDING' ? (
          <SortDownArrowIcon />
        ) : (
          <SortUpArrowIcon />
        )}
      </StyledSortingIcon>
    )
  );
};
