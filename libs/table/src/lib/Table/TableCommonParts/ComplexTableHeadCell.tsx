import { isEmpty, isNil } from 'ramda';
import * as React from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import { Column } from 'react-table';
import styled, { ThemeContext } from 'styled-components';

import { Popover } from '@dg3/components';
import { FilledDownArrowIcon } from '@dg3/icons';
import {
  FILTERABLE_CELL,
  OrderDirectionType,
  OrderingItemType,
  OrderingType,
} from '@dg3/types';
import { getSortingIcon } from '../Sorting/getSortingIcon';
import { SortingButtons } from '../Sorting/SortingButtons';

const StyledTableHead = styled.div<{ disableSorting?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props?.disableSorting ? 'initial' : 'pointer')};
`;

const StyledColumnName = styled.div<{ width: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  input {
    outline: none;
    max-width: ${(props) => props.width}px;
  }
`;

interface Props {
  column: Column;
  openedColumnFilterId: string;
  setOpenedColumnFilterId: (id: string) => void;
  allowFilter: boolean;
  ordering?: OrderingType;
  changeOrdering?: (newOrdering: OrderingType) => void;
}

export const ComplexTableHeadCell: React.FC<Props> = (props: Props) => {
  const theme = useContext(ThemeContext);
  const {
    column,
    setOpenedColumnFilterId,
    openedColumnFilterId,
    allowFilter,
    ordering,
    changeOrdering,
  } = props;
  const headerRef = useRef();

  const show = openedColumnFilterId === column.id;

  // @ts-ignore
  const width = headerRef?.current?.offsetWidth;

  const getSortingOrder = (column): OrderDirectionType | undefined => {
    if (
      !isNil(ordering) &&
      !isEmpty(ordering) &&
      !isNil(ordering[0]) &&
      !isEmpty(ordering[0]) &&
      !column.disableSorting &&
      (ordering[0].attr === column.sortingKey ||
        ordering[0].id === column.sortingKey)
    ) {
      return ordering[0].order;
    }
    return undefined;
  };
  const sortingOrder = getSortingOrder(column);

  const getNewOrdering = (): OrderingItemType | undefined => {
    if (column.disableSorting) {
      return undefined;
    }
    const sortingKeyItem: { id: null } | { attr: string } =
      column.sortingKey === null ? { id: null } : { attr: column.sortingKey };
    if (sortingOrder === 'ASCENDING') {
      return { order: 'DESCENDING', ...sortingKeyItem };
    }
    if (sortingOrder === 'DESCENDING') {
      return undefined;
    }
    return { order: 'ASCENDING', ...sortingKeyItem };
  };

  const handleToggle = () => {
    if (!show) {
      setOpenedColumnFilterId(column.id);
    } else {
      setOpenedColumnFilterId('');
    }
  };

  const handleClickAway = (event) => {
    if (event?.target?.className.includes(FILTERABLE_CELL)) {
      return false;
    }

    setOpenedColumnFilterId('');
    return true;
  };

  const handleSort = () => {
    if (!column.disableSorting) {
      const newOrdering = getNewOrdering();
      column.toggleSortBy();

      !!changeOrdering && changeOrdering(newOrdering ? [newOrdering] : []);
    }
  };

  return allowFilter ? (
    <Popover
      show={show}
      onToggle={handleToggle}
      placement={'top-start'}
      clickAwayDisabled={false}
      onClickAway={handleClickAway}
      parent={
        <StyledTableHead ref={headerRef}>
          <StyledColumnName width={width}>
            {show ? column.render('Filter') : column.render('Header')}
          </StyledColumnName>
          {getSortingIcon(sortingOrder)}
          {show || (
            <FilledDownArrowIcon
              color={theme.colors.primary1}
              height={'13px'}
              width={'13px'}
            />
          )}
        </StyledTableHead>
      }
    >
      <SortingButtons theme={theme} column={column} />
    </Popover>
  ) : (
    <StyledTableHead
      onClick={handleSort}
      disableSorting={column.disableSorting}
    >
      <StyledColumnName width={width}>
        {column.render('Header')}
      </StyledColumnName>
      {getSortingIcon(sortingOrder)}
    </StyledTableHead>
  );
};
