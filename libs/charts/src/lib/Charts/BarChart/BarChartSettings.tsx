import { isEmpty } from 'ramda';

import { BarChartProps } from '@dg3/types';
import { isNumber, roundFloat } from '@dg3/utils';
import { getDefaultAxisSettings } from '../General/DefaultAxisSettings';

export const getBarSeries = (props: BarChartProps): Array<object> => {
  const seriesSetting = {
    type: 'bar',
    stack: props.widgetStyle === 'stacked' ? 'stacked' : '',
    label: {
      normal: {
        show: props.enableDataLabels,
        position: 'inside',
      },
    },
    tooltip: {
      formatter: ({ name, value, seriesName }) => {
        const convertedValue = isNumber(value[seriesName])
          ? roundFloat(value[seriesName], 2)
          : value[seriesName];
        return `${name}: ${convertedValue}`;
      },
    },
  };

  if (isEmpty(props.data)) {
    return [];
  }

  // return series
  return Object.keys(props.data[0]).reduce((acc, cur) => {
    if (cur !== 'id') {
      acc.push({ ...seriesSetting });
    }
    return acc;
  }, []);
};

export const barChartAxisSettings = (
  props: BarChartProps
): { xAxis: object; yAxis: object } => {
  const isVerticalDirectionEnabled = props.layoutDirection === 'vertical';
  const axisOptions = getDefaultAxisSettings();

  return {
    xAxis: {
      ...axisOptions.xAxis,
      type: isVerticalDirectionEnabled ? 'category' : 'value',
      name: props.xAxis.label,
      splitLine: { show: false },
      min: props.xAxis.min,
      max: props.xAxis.max,
      minInterval: props.xAxis.minInterval,
      maxInterval: props.xAxis.maxInterval,
      axisLabel: {
        interval: 'auto',
        rotate: 45,
      },
    },
    yAxis: {
      type: isVerticalDirectionEnabled ? 'value' : 'category',
      name: props.yAxis.label,
      ...axisOptions.yAxis,
      // TODO: we need to put this into configurable props (could be specified for each chart differently)
      min: props.yAxis.min,
      max: props.yAxis.max,
      minInterval: props.yAxis.minInterval,
      maxInterval: props.yAxis.maxInterval,
      splitLine: { show: false },
    },
  };
};
