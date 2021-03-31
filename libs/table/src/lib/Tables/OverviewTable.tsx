import React from 'react';

import { MappingObject } from '@dg3/schema';
import {
  ColumnConf,
  OrderingType,
  PaginationType,
  TableDataObject,
} from '@dg3/types';
import { rowSelection } from '../Table/Selection/rowSelection';
import { Table } from '../Table/Table';

const MIN_TABLE_COLUMNS_DISPLAY_SIZE = 4;

interface Props {
  data: Array<TableDataObject>;
  dataLength: number;
  columnsConf: Array<ColumnConf>;
  rowsInTable?: number;
  onColumnFilter?: (columnId: string, value: MappingObject) => void;
  ordering?: OrderingType;
  changeOrdering?: (newOrdering: OrderingType) => void;
  pageOffset?: number;
  changePagination?: (newPagination: PaginationType) => void;
  changeSelectedRows?: (selectedRows: Array<string>) => void;
  detailActive: boolean;
}

export const OverviewTable: React.FC<Props> = (props: Props) => {
  const {
    dataLength,
    columnsConf,
    rowsInTable,
    onColumnFilter,
    ordering,
    changeOrdering,
    pageOffset,
    changePagination,
    changeSelectedRows,
    detailActive,
    data,
  } = props;

  const columns = React.useMemo(() => {
    const actualColumns = detailActive
      ? columnsConf.slice(
          0,
          Math.max(columnsConf.length / 2, MIN_TABLE_COLUMNS_DISPLAY_SIZE)
        )
      : columnsConf;
    return [...rowSelection, ...actualColumns];
  }, [columnsConf, detailActive]);

  return (
    <Table
      columns={columns}
      data={data}
      dataLength={dataLength}
      rowsInTable={rowsInTable}
      onColumnFilter={onColumnFilter}
      showExport={false}
      allowFilter={false}
      allowSelect={true}
      allowRowSelect={true}
      ordering={ordering}
      changeOrdering={changeOrdering}
      pageOffset={pageOffset}
      changePagination={changePagination}
      changeSelectedRows={changeSelectedRows}
    />
  );
};
