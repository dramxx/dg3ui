import { Array, Boolean, Literal, Record, String } from 'runtypes';

import { TableEditableSchema } from '../gql/TableSchemas';
import { AnyObject, ObjectType, PositiveZeroInt } from '../runtypes';
import { CommonVisualizationWidgetSchema } from './CommonVisualizationWidgetSchema';
import { JqVisualisationWidgetSchema } from './JqVisualisationWidgetSchema';
import { JspVisualisationWidgetSchema } from './JspVisualisationWidgetSchema';

export const TableWidgetPropsSchema = ObjectType(
  {
    title: String,
    rowsInTable: PositiveZeroInt,
    showExport: Boolean,
    showPageSize: Boolean,
    showPagination: Boolean,
    showBorder: Boolean,
  },
  {
    rangeOfRows: Array(PositiveZeroInt), // TODO deprecated
    enableImport: Boolean,
    editable: TableEditableSchema,
  }
);

export const TableWidgetSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('TableWidget'),
    chartProps: TableWidgetPropsSchema,
  })
);

export const JspTableWidgetSchema = JspVisualisationWidgetSchema.And(
  TableWidgetSchema
);

export const JqTableWidgetSchema = JqVisualisationWidgetSchema.And(
  TableWidgetSchema
);

export const TableVisualisationWidgetSchema = TableWidgetSchema.And(
  Record({
    data: Array(AnyObject),
  })
);
