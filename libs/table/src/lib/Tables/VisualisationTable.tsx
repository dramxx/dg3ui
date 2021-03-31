import { isNil } from 'ramda';
import React from 'react';

import { MappingObject, TableEditable } from '@dg3/schema';
import { ColumnConf, TableDataObject } from '@dg3/types';
import { rowSelection } from '../Table/Selection/rowSelection';
import { Table } from '../Table/Table';
import { EditableVisualizationTable } from './EditableVisualisationTable';

interface Props {
  data: Array<TableDataObject>;
  dataLength: number;
  columnsConf: Array<ColumnConf>;
  rowsInTable?: number;
  onColumnFilter?: (columnId: string, value: MappingObject) => void;
  showExport: boolean;
  allowFilter: boolean;
  allowSelect: boolean;
  allowRowSelect: boolean;
  autoHeight?: boolean;
  editable?: TableEditable;
}

export const VisualisationTable: React.FC<Props> = (props: Props) => {
  const { columnsConf, allowSelect, editable } = props;

  const columns = React.useMemo(
    () => (allowSelect ? [...rowSelection, ...columnsConf] : columnsConf),
    []
  );
  const data = React.useMemo(() => props.data, []);

  return isNil(editable) ? (
    <Table {...props} columns={columns} data={data} />
  ) : (
    <EditableVisualizationTable
      {...props}
      columns={columns}
      data={data}
      editable={editable}
    />
  );
};
