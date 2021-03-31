import React from 'react';

import { OverviewTable } from '../Tables/OverviewTable';
import {
  editableTableColumns,
  editableTableData,
} from './EditableTableMockData';
import { Table } from './Table';
import { TableMockData, jsonColumnsConf } from './TableMockData';

export default {
  component: OverviewTable,
  title: 'Table',
};

export const OverviewTableDefault = () => (
  <OverviewTable
    data={TableMockData}
    dataLength={TableMockData.length}
    columnsConf={jsonColumnsConf}
    detailActive={false}
  />
);

export const EditableTable = () => (
  <Table
    columns={editableTableColumns}
    data={editableTableData}
    dataLength={editableTableData.length}
    showExport={false}
    allowFilter={false}
    allowSelect={false}
    allowRowSelect={false}
    autoHeight={true}
  />
);
