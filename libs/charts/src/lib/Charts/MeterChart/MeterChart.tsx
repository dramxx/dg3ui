import { filter } from 'ramda';
import React from 'react';

import { MeterChartProps } from '@dg3/types';
import { ChartWidget } from '../General/ChartWidget';
import { GaugeChart } from './GaugeChart';
import { getPercentages } from './MeterChartSettings';
import { MetricChart } from './MetricChart';
import { ProgressChart } from './ProgressChart';

const getChart = (props: MeterChartProps): React.ReactNode => {
  const { data, prefix, suffix, kpiFormat } = props;
  const percentages = getPercentages(data);
  const rangeColors = data.rangeProps.map((item) => item.color);

  const getValueRange = (range) =>
    data.value >= range.from && data.value <= range.to;

  const currRange = filter(getValueRange, data.rangeProps);
  const calculatedTextColor = currRange[0].color;

  switch (props.widgetStyle) {
    case 'arc':
      return (
        <GaugeChart
          colors={rangeColors}
          data={data}
          prefix={prefix}
          suffix={suffix}
          kpiFormat={kpiFormat}
          percentages={percentages}
          textColor={calculatedTextColor}
        />
      );
    case 'progress':
      return (
        <ProgressChart
          data={data}
          prefix={prefix}
          suffix={suffix}
          kpiFormat={kpiFormat}
          percentages={percentages}
          colors={rangeColors}
          textColor={calculatedTextColor}
        />
      );
    case 'metric':
      return (
        <MetricChart
          data={data}
          prefix={prefix}
          suffix={suffix}
          kpiFormat={kpiFormat}
          percentages={percentages}
          textColor={calculatedTextColor}
        />
      );
    default:
      break;
  }
};

export const MeterChart = (props: MeterChartProps) => {
  return (
    <ChartWidget
      noData={!props.data}
      chart={getChart(props)}
      enableDataSelection={false}
      title={props.title}
      overviewModule={props.overviewModule}
      includedFilters={props.includedFilters}
      showBorder={props.showBorder}
      showFooter={true}
    />
  );
};

MeterChart.defaultProps = {
  type: 'MeterChart',
  title: '',
  widgetStyle: 'number',
  prefix: '',
  suffix: '',
  format: {
    digits: -1,
    timeZone: 'UTC',
    timeFormat: 'YYYY-MM-DD HH:mm:ss.ms',
    durationFormat: 'long',
  },
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  showBorder: true,
};
