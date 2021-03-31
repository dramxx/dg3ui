import { ColumnConf, TableDataObject } from '@dg3/types';

export const editableTableColumns: ColumnConf[] = [
  { accessor: 'name', Header: 'název úlohy', editable: { type: 'text' } },
  { accessor: 'type', Header: 'typ úlohy' },
  { accessor: 'period', Header: 'perioda' },
  {
    accessor: 'state',
    Header: 'state',
    editable: {
      type: 'boolean',
      trueLabel: 'aktivní',
      falseLabel: 'pozastavena',
    },
  },
];

export const editableTableData: TableDataObject[] = [
  {
    id: { key: 'id', value: 'test_RS' },
    name: { value: 'test RS' },
    type: { value: 'vyčtení SN' },
    period: { value: '5m' },
    state: { value: true },
  },
  {
    id: { key: 'id', value: 'test_JR' },
    name: { value: 'test JR' },
    type: { value: 'vyčtení SN' },
    period: { value: '20m' },
    state: { value: false },
  },
  {
    id: { key: 'id', value: 'concentrators' },
    name: { value: 'koncentrátory' },
    type: { value: 'ping' },
    period: { value: '1h' },
    state: { value: true },
  },
];
