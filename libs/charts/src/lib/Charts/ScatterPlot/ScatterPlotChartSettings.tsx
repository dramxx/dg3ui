import { ScatterPlotChartProps, ScatterPlotSeriesObject } from '@dg3/types';
import { clone } from 'ramda';
import { getDefaultAxisSettings } from '../General/DefaultAxisSettings';
import { mapNumberToRange } from '@dg3/utils';

// get min value from all series
export const getMin = (data: ScatterPlotSeriesObject[]) =>
  Math.min(
    ...data.map((series) => Math.min(...series.data.map((item) => item[2])))
  );
// get max value from all series
export const getMax = (data: ScatterPlotSeriesObject[]) =>
  Math.max(
    ...data.map((series) => Math.max(...series.data.map((item) => item[2])))
  );

export const getScatterSeries = (
  props: ScatterPlotChartProps
): Array<object> => {
  const minValue = getMin(props.data);
  const maxValue = getMax(props.data);
  const minDivider = minValue / (props.minSymbolSize * props.minSymbolSize);
  const maxDivider = maxValue / (props.maxSymbolSize * props.maxSymbolSize);

  const seriesSetting = {
    type: 'scatter',
    symbolSize: (data) => {
      return Math.sqrt(
        data[2] /
          mapNumberToRange(data[2], minValue, maxValue, minDivider, maxDivider)
      );
    },
    emphasis: {
      label: {
        show: true,
        formatter: function(param) {
          return param.data[3];
        },
        position: 'top',
      },
    },
  };

  // return series
  return props.data.map((item) => {
    return {
      ...seriesSetting,
      name: item.id,
      data: item.data,
    };
  });
};

export const getScatterAxisSettings = (
  props: ScatterPlotChartProps
): { xAxis: object; yAxis: object } => {
  const axisOptions = getDefaultAxisSettings();

  return {
    xAxis: {
      ...clone(axisOptions.xAxis),
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      name: props.axisXLabel,
    },
    yAxis: {
      ...clone(axisOptions.yAxis),
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      name: props.axisYLabel,
      scale: true,
    },
  };
};
