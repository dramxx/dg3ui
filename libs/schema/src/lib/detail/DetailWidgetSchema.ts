import { Static, Union } from 'runtypes';

import {
  AttributeTableWidgetSchema,
  JspAttributeTableWidgetSchema,
} from './AttributeTableWidgetSchema';
import {
  DetailCardWidgetSchema,
  JspDetailCardWidgetSchema,
} from './DetailCardWidgetSchema';
import {
  DetailJsonWidgetSchema,
  JspDetailJsonWidgetSchema,
} from './DetailJsonWidgetSchema';
import {
  DetailTableWidgetSchema,
  JspDetailTableWidgetSchema,
} from './DetailTableWidgetSchema';
import { JqDetailWidgetSchema } from './JqDetailWidgetSchema';

export const JspDetailWidgetSchema = Union(
  JspDetailTableWidgetSchema,
  JspDetailCardWidgetSchema,
  JspAttributeTableWidgetSchema,
  JspDetailJsonWidgetSchema
);

export type JspDetailWidgetConfig = Static<typeof JspDetailWidgetSchema>;

export const DetailWidgetConfigSchema = Union(
  JspDetailWidgetSchema,
  JqDetailWidgetSchema
);

export type DetailWidgetConfig = Static<typeof DetailWidgetConfigSchema>;

export const OutputDetailWidgetSchema = Union(
  DetailTableWidgetSchema,
  AttributeTableWidgetSchema,
  DetailCardWidgetSchema,
  DetailJsonWidgetSchema
);

export type OutputDetailWidgetConfig = Static<typeof OutputDetailWidgetSchema>;
