import fns_format from 'date-fns/format';
import { isNil } from 'ramda';

import { KpiChartObject } from '@dg3/schema';
import { EMPTY_VALUE, KpiDataFormat, KpiDataFormatProps } from '@dg3/types';
import { getFormattedDuration } from './Duration';

const mergeValueParts = (
  prefix: string,
  value: number | string,
  suffix: string
): string => {
  if (isNil(value)) {
    return EMPTY_VALUE;
  }
  return `${prefix} ${value} ${suffix}`;
};

export const getKpi = (
  data: KpiChartObject,
  prefix: string,
  suffix: string,
  widgetStyle: KpiDataFormat,
  format: KpiDataFormatProps
): string => {
  const { value } = data;

  switch (widgetStyle) {
    case 'number':
      const formattedValue =
        format.digits > -1 ? value.toFixed(format.digits) : value;
      return mergeValueParts(prefix, formattedValue, suffix);

    case 'datetime':
      const formattedDate = fns_format(new Date(value), format.timeFormat);
      return mergeValueParts(prefix, formattedDate, suffix);

    case 'duration':
      const formattedDuration = getFormattedDuration(
        value,
        format.durationFormat
      );
      return mergeValueParts(prefix, formattedDuration, suffix);

    default:
      return '';
  }
};
