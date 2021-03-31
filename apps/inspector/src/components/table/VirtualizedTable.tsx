import 'react-virtualized/styles.css';

import produce from 'immer';
import _ from 'lodash';
import React from 'react';
import { AutoSizer, Column, IndexRange, Table, TableCellRenderer } from 'react-virtualized';

import { ColumnConfig } from '../../model';
import { DefaultColumnWidth, OverviewTablePageSize } from '../../model/constants';
import Pagination from './Pagination';

export interface Props {
  data: unknown[];
  initialColumns: ColumnConfig[];
  onLoadMore?: () => void;
  onRowClick: (row: unknown) => void;
}

const VirtualizedTable: React.FC<Props> = (props: Props) => {
  const { data, initialColumns, onLoadMore, onRowClick } = props;

  const [columns, setColumns] = React.useState<ColumnConfig[]>(initialColumns);
  const [page, setPage] = React.useState(0);
  const [scrollToIndex, setScrollToIndex] = React.useState<number>(undefined);

  const pageCount = Math.ceil(data.length / OverviewTablePageSize);

  React.useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  React.useEffect(() => {
    if (page === pageCount - 1) {
      if (onLoadMore) {
        onLoadMore();
      }
    }
  }, [page]);

  const updatePageAndScrollPosition = (newPage: number) => {
    setPage(newPage);
    const newScrollToIndex = newPage * OverviewTablePageSize + 1;
    setScrollToIndex(newScrollToIndex);
  };

  const updatePageByScroll = (info: IndexRange) => {
    const { startIndex: indexOfFirstVisibleRow, stopIndex: indexOfLastVisibleRow } = info;
    const pageOfFirstVisibleRow = Math.floor(indexOfFirstVisibleRow / OverviewTablePageSize);
    const pageOfLastVisibleRow = Math.ceil(indexOfLastVisibleRow / OverviewTablePageSize);

    if (pageOfFirstVisibleRow === pageOfLastVisibleRow) {
      setPage(pageOfFirstVisibleRow);
    } else {
      const numberOfVisiblePages = pageOfLastVisibleRow - pageOfFirstVisibleRow;

      const indexesOfVisiblePages = [...Array(numberOfVisiblePages).keys()].map((x) => x + pageOfFirstVisibleRow);

      const pagesVisibility = indexesOfVisiblePages.reduce((acc, pageIndex) => {
        const indexOfPageStartRow = pageIndex * OverviewTablePageSize;
        const indexOfPageEndRow = indexOfPageStartRow + OverviewTablePageSize - 1;
        const visibleRowsCount =
          Math.min(indexOfPageEndRow, indexOfLastVisibleRow) - Math.max(indexOfPageStartRow, indexOfFirstVisibleRow);
        return { ...acc, [pageIndex]: visibleRowsCount };
      }, {} as Record<number, number>);

      const sortedPagesVisibility = Object.entries(pagesVisibility).sort((x, y) => y[1] - x[1]);

      const mostVisiblePageIndex = Number(sortedPagesVisibility[0][0]);

      setPage(mostVisiblePageIndex);
    }
  };

  const updateColumnVisibility = (key: string, isVisible: boolean) => {
    setColumns(
      produce(columns, (draft) => {
        const index = draft.findIndex((x) => x.key === key);
        draft[index].isActive = isVisible;
      })
    );
  };

  const getCellValue: TableCellRenderer = (cellProps) => {
    const { key, format } = cellProps.columnData as ColumnConfig;
    const value = _.get(cellProps.rowData, key);

    if (value === null || value === undefined) {
      return 'N/A';
    } else if (typeof value === 'string' || typeof value === 'number') {
      return format ? format(value) : value;
    } else {
      return JSON.stringify(value);
    }
  };

  return (
    <div style={{ width: '100%', flex: 1 }}>
      <Pagination
        total={data.length}
        page={page}
        pageSize={OverviewTablePageSize}
        onPageChange={updatePageAndScrollPosition}
      />
      <div style={{ width: '100%', height: '92%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <AutoSizer>
            {({ width, height }) => (
              <Table
                scrollToIndex={scrollToIndex}
                scrollToAlignment={'start'}
                width={width}
                height={height}
                headerHeight={40}
                rowHeight={30}
                rowCount={data.length}
                rowGetter={({ index }) => data[index]}
                onHeaderClick={(e) => updateColumnVisibility(e.dataKey, false)}
                onRowsRendered={updatePageByScroll}
                onRowClick={({ rowData }) => onRowClick(rowData)}
              >
                {columns
                  .filter((x) => x.isActive)
                  .map((column) => (
                    <Column
                      key={column.key}
                      dataKey={column.key}
                      label={column.label}
                      columnData={column}
                      width={column.width || DefaultColumnWidth}
                      cellRenderer={getCellValue}
                    />
                  ))}
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
};

export default VirtualizedTable;
