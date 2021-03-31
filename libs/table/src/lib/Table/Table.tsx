import { isNil } from 'ramda';
import React, { useEffect, useRef, useState } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import {
  Column,
  useFilters,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import styled from 'styled-components';

import { MappingObject } from '@dg3/schema';
import {
  CellUpdateFunction,
  OrderingType,
  PaginationType,
  TableDataObject,
  UNFILTERABLE_CELL,
} from '@dg3/types';
import { noop } from '@dg3/utils';
import { ELASTIC_PAGINATION_ITEM_LIMIT } from '../constants';
import { DefaultCellRender } from './Cell/DefaultCellRender';
import { EditableCellRender } from './Cell/EditableCellRender';
import { LinkCellRender } from './Cell/LinkCellRender';
import { DefaultColumnFilter } from './Filters/DefaultColumnFilter';
import { Pagination } from './Pagination/Pagination';
import { StyledTableHeaderRow } from './TableCommonParts/StyledTableRow';
import { TableHeadCell } from './TableCommonParts/TableHeadCell';
import { TableRow } from './TableCommonParts/TableRow';
import { ItemsCount } from './TableTopBar/ItemsCount';

const PAGINATION_HEIGHT = '24px';
const HEADER_HEIGHT = '40px';

const StyledTableWrapper = styled.div<{
  height: number;
}>`
  width: 100%;
  height: ${(props) => (props.height === 0 ? 'auto' : `${props.height}px`)};
  display: flex;
  flex-direction: column;
`;

const StyledTableFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface StyledTableProps {
  height: number;
  scrollBarWidth: number;
}

const getTableHeight = (props: StyledTableProps): string => {
  if (props.height === 0) {
    return 'auto';
  } else {
    return `calc(${props.height}px - ${PAGINATION_HEIGHT})`;
  }
};

const getBodyHeight = (props: StyledTableProps) => {
  if (props.height === 0) {
    return 'auto';
  } else {
    return `calc(${props.height}px - ${PAGINATION_HEIGHT} - ${HEADER_HEIGHT})`;
  }
};

const StyledTable = styled.table<StyledTableProps>`
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  max-height: ${getTableHeight};
  height: ${getTableHeight};
  margin-bottom: ${(props) => props.theme.spacing.small};

  thead {
    display: table;
    width: calc(100% - ${(props) => props.scrollBarWidth}px);
  }

  & tbody {
    // TODO: review this calculation in context with scroll
    height: ${getBodyHeight};
    display: block;
    overflow: auto;
  }

  & .${UNFILTERABLE_CELL} {
    background-color: ${(props) => props.theme.colors.grey2};
    opacity: 0.62;
    cursor: default;
  }
`;

export interface TableProps {
  columns: Array<Column>;
  data: Array<TableDataObject>;
  dataLength: number;
  rowsInTable?: number;
  onColumnFilter?: (columnId: string, value: MappingObject) => void;
  showExport: boolean;
  allowFilter: boolean;
  allowSelect: boolean;
  allowRowSelect: boolean;
  autoHeight?: boolean;
  ordering?: OrderingType;
  changeOrdering?: (newOrdering: OrderingType) => void;
  pageOffset?: number;
  changePagination?: (newPagination: PaginationType) => void;
  changeSelectedRows?: (selectedRows: Array<string>) => void;
  onCellEdit?: CellUpdateFunction;
}

export const Table: React.FC<TableProps> = (props: TableProps) => {
  const defaultColumn = {
    Filter: DefaultColumnFilter,
    Cell: DefaultCellRender,
    LinkCell: LinkCellRender,
    EditableCell: EditableCellRender,
    width: 'auto',
  };
  const [openedColumnFilterId, setOpenedColumnFilterId] = useState('');
  const {
    data,
    dataLength,
    columns,
    rowsInTable = dataLength,
    onColumnFilter,
    allowSelect,
    allowRowSelect,
    autoHeight = false,
    ordering,
    changeOrdering,
    pageOffset = 0,
    changePagination,
    changeSelectedRows,
    onCellEdit = noop,
  } = props;

  const serverPagination = !isNil(changePagination);
  const enableServerOrdering = serverPagination && !isNil(changeOrdering);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: Math.round(pageOffset / rowsInTable),
        pageSize: rowsInTable,
      },
      pageCount: Math.ceil(
        Math.min(dataLength, ELASTIC_PAGINATION_ITEM_LIMIT) / rowsInTable
      ),
      manualPagination: serverPagination,
      manualSortBy: enableServerOrdering,
      updateData: onCellEdit,
    },
    useFilters,
    useSortBy,
    useRowSelect,
    usePagination
  );

  useEffect(() => {
    if (changePagination) {
      changePagination({
        offset: pageIndex * pageSize,
        size: pageSize,
      });
    }
  }, [changePagination, pageIndex, pageSize]);

  useEffect(() => {
    changeSelectedRows &&
      changeSelectedRows(selectedFlatRows.map((row) => row.original.id.intId));
  }, [changeSelectedRows, selectedFlatRows]);

  // display pagination only for multiple pages
  const enablePagination = pageOptions.length > 1;

  // get scrollbar width (if any) on tbody
  const tBodyRef = useRef(null);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);
  useEffect(() => {
    const requestId = requestAnimationFrame(() => {
      if (!isNil(tBodyRef.current)) {
        setScrollBarWidth(
          tBodyRef.current.offsetWidth -
            tBodyRef.current.clientWidth -
            tBodyRef.current.style.borderLeftWidth -
            tBodyRef.current.style.borderRightWidth
        );
      }
    });
    return () => cancelAnimationFrame(requestId);
  });

  return (
    <ReactResizeDetector handleWidth={false} handleHeight={true}>
      {({ height = 0 }) => (
        <StyledTableWrapper height={autoHeight ? 0 : height}>
          <StyledTable
            {...getTableProps()}
            // TODO: investigate why the height of table must be lower than height of table wrapper
            height={autoHeight ? 0 : height - 1}
            scrollBarWidth={scrollBarWidth}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <StyledTableHeaderRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableHeadCell
                      openedColumnFilterId={openedColumnFilterId}
                      setOpenedColumnFilterId={setOpenedColumnFilterId}
                      column={column}
                      simpleCell={column.simpleCell}
                      // this feature is temporarily blocked by design
                      allowFilter={false}
                      ordering={ordering}
                      changeOrdering={changeOrdering}
                      {...column.getHeaderProps()}
                    />
                  ))}
                </StyledTableHeaderRow>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} ref={tBodyRef}>
              {page.map(
                (row) =>
                  prepareRow(row) || (
                    <TableRow
                      key={row.id}
                      row={row}
                      openedColumnFilterId={openedColumnFilterId}
                      onColumnFilter={onColumnFilter}
                      allowSelect={allowSelect}
                      allowRowSelect={allowRowSelect}
                    />
                  )
              )}
            </tbody>
          </StyledTable>
          <StyledTableFooter>
            <ItemsCount
              totalCount={dataLength}
              selectedCount={selectedFlatRows.length}
            />
            {enablePagination && (
              <Pagination
                gotoPage={gotoPage}
                pageIndex={pageIndex}
                pageOptions={pageOptions}
              />
            )}
          </StyledTableFooter>
        </StyledTableWrapper>
      )}
    </ReactResizeDetector>
  );
};
