import React from 'react';

import { KpiChartProps } from '@dg3/types';
import { ChartWidget } from '../General/ChartWidget';
import { KpiText } from './KpiText';

export const KpiChart = (props: KpiChartProps) => {
  return (
    <ChartWidget
      noData={!props.data || props.data.value == null}
      disableExport={true}
      chart={<KpiText {...props} />}
      enableDataSelection={false}
      title={props.title}
      justifyContent={'center'}
      overviewModule={props.overviewModule}
      includedFilters={props.includedFilters}
      showBorder={props.showBorder}
      showFooter={false}
    />
  );
};

KpiChart.defaultProps = {
  type: 'KpiChart',
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

export default KpiChart;
