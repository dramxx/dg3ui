import { Array, Boolean, Number, String } from 'runtypes';

import { ObjectType } from '../runtypes';

export const CommonChartSchema = ObjectType(
  {
    colors: Array(String),
    legendShow: Boolean,
    enableLegendHiding: Boolean,
    enableDataSelection: Boolean,
    enableDataLabels: Boolean,
    enableTooltip: Boolean,
    showBorder: Boolean,
    widgetStyle: String,
  },
  {
    title: String,
    legendSize: Number,
  }
);
