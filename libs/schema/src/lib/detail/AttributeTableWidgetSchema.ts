import { Array, Literal, Record, Static, String, Union } from 'runtypes';

import { GqlVisualisationSettingsSchema } from '../gql/GqlVisualisationSettingsSchema';
import { MutationSchema } from '../gql/Mutation';
import { TableColumnSchema } from '../gql/TableSchemas';
import { AnyObject, ObjectType } from '../runtypes';
import { CommonDetailWidgetSchema } from './CommonDetailWidgetSchema';

export const EditableCellSchema = Record({
  rowId: String,
  columnId: String,
  command: String,
  type: Union(Literal('string'), Literal('enum')),
});

export type EditableCellConfig = Static<typeof EditableCellSchema>;

const BaseAttributeTableWidgetSchema = CommonDetailWidgetSchema.And(
  ObjectType(
    {
      type: Literal('Attributes'),
      columns: Array(TableColumnSchema),
      editable: Array(EditableCellSchema),
      refetchQueries: Array(String),
      sortColumn: String,
    },
    {
      mutation: MutationSchema,
    }
  )
);

export const JspAttributeTableWidgetSchema = BaseAttributeTableWidgetSchema.And(
  Record({
    gql: GqlVisualisationSettingsSchema,
    language: Literal('jsonpath'),
  })
);

export type JspAttributeTableWidgetConfig = Static<
  typeof JspAttributeTableWidgetSchema
>;

const AttributeTableDataSchema = Array(AnyObject.And(Record({ id: String })));

export const AttributeTableWidgetSchema = BaseAttributeTableWidgetSchema.And(
  Record({
    data: AttributeTableDataSchema,
  })
);

export type AttributeTableWidgetConfig = Static<
  typeof AttributeTableWidgetSchema
>;
