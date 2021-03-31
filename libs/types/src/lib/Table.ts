import { Cell } from 'react-table';

import { TableValue } from '@dg3/schema';

export type TableDataObject = {
  id: TableValue;
  [key: string]: TableValue;
};

interface ColumnEditable {
  body: string;
}

interface EditableText extends ColumnEditable {
  type: 'text';
}

export interface EditableBoolean extends ColumnEditable {
  type: 'boolean';
  trueLabel: string;
  falseLabel: string;
}

export type ColumnConf = {
  id?: string;
  Cell?: (ref: string) => void;
  Header: string;
  accessor: string;
  sortType?: string;
  width?: number;
  disableSorting?: boolean;
  disableColumnFilter?: boolean;
  sortingKey?: string | null;
  editable?: EditableText | EditableBoolean;
};

export type PaginationType = { size: number; offset: number };

export type OrderDirectionType = 'ASCENDING' | 'DESCENDING';

// using never makes it possible not to use type assertions
// Our GraphQL schema requires order direction and EITHER attr (string) when sorting by attributes OR id (null) when sorting by id, never both attributes
export type OrderingItemType =
  | {
      attr: string;
      id?: never;
      order: OrderDirectionType;
    }
  | {
      id: null;
      attr?: never;
      order: OrderDirectionType;
    };

export type CellUpdateFunction = (
  rowId: string,
  columnId: string,
  newValue: unknown,
  value: TableValue
) => void;

export interface InlineEditorProps {
  cell: Cell;
  updateData: CellUpdateFunction;
  stopEditing: () => void;
}

export type OrderingType = Array<OrderingItemType>;

export type DioOrderingType = { byField: string; order: OrderDirectionType };

/**
 *  filterableCells are tested by string contains method so unfilterable
 *  can't contain root of word filterableCell (i removed cell, from end)
 *  **/
export const FILTERABLE_CELL = 'filterableCell';
export const UNFILTERABLE_CELL = 'unfilterable';
