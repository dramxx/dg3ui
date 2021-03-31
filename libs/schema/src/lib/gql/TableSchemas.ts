import { Array, Boolean, Dictionary, Record, Static, String } from 'runtypes';

import { AnyObject, ObjectType, PositiveInt } from '../runtypes';
import { CellValue } from '../runtypes/CellValue';
import { Optional } from '../runtypes/Optional';
import { MutationSchema } from './Mutation';

export const TableColumnSchema = ObjectType(
  {
    Header: String,
    accessor: String,
  },
  {
    detailLink: Boolean,
    width: PositiveInt,
    disableSorting: Boolean,
    disableColumnFilter: Boolean,
    sortingKey: String,
  }
);

export type TableColumn = Static<typeof TableColumnSchema>;

export const TableEditableSchema = Record({
  mutation: MutationSchema,
  refetchQueries: Array(String),
  successMessage: String,
});

export type TableEditable = Static<typeof TableEditableSchema>;

export const SimpleTableDataSchema = Array(
  AnyObject.And(Record({ id: String }))
);

export const TableValueSchema = Record({
  keyId: Optional(String),
  intId: Optional(String),
  valueId: Optional(CellValue),
  value: Optional(CellValue),
});

export type TableValue = Static<typeof TableValueSchema>;

export const OverviewTableDataSchema = Array(
  Dictionary(TableValueSchema).And(Record({ id: TableValueSchema }))
);

export type OverviewTableData = Static<typeof OverviewTableDataSchema>;
