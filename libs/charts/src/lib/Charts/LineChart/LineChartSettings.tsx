import { clone } from 'ramda';

import { LineChartProps } from '@dg3/types';
import { getDefaultAxisSettings } from '../General/DefaultAxisSettings';

export const getLineSeries = (props: LineChartProps): Array<object> => {
  const seriesSetting = {
    type: 'line',
    stack: props.widgetStyle === 'stacked' ? 'stacked' : '',
    label: {
      normal: {
        show: props.enableDataLabels,
        position: 'top',
      },
    },
    symbolSize: 10,
    areaStyle: props.enableArea ? {} : null,
  };

  // return series
  return props.data.map((item) => {
    return {
      ...seriesSetting,
      name: item.id,
      data: item.data.map((point) => point.y),
    };
  });
};

export const getLineAxisSettings = (
  props: LineChartProps
): { xAxis: object; yAxis: object } => {
  const keys = props?.data[0]?.data.map((item) => item.x) || [];
  const isVerticalDirectionEnabled = props.layoutDirection === 'vertical';

  const axisOptions = getDefaultAxisSettings();

  return {
    xAxis: {
      ...clone(axisOptions.xAxis),
      type: isVerticalDirectionEnabled ? 'category' : 'value',
      name: props.axisXLabel,
      data: keys,
      axisLabel: {
        interval: 'auto',
        rotate: 45,
      },
    },
    yAxis: {
      ...clone(axisOptions.yAxis),
      type: isVerticalDirectionEnabled ? 'value' : 'category',
      name: props.axisYLabel,
    },
  };
};
