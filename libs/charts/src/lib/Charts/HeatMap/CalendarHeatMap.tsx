import ReactEcharts from 'echarts-for-react';
import { isEmpty, mergeDeepRight } from 'ramda';
import React, { FC } from 'react';

import { CalendarHeatMapProps } from '@dg3/types';
import { ChartWidget } from '../General/ChartWidget';
import { useDefaultChartSettings } from '../General/DefaultEChartSettings';
import {
  getHeatMapSeries,
  useHeatMapSettings,
} from './CalendarHeatMapSettings';

export const CalendarHeatMap: FC<CalendarHeatMapProps> = (props) => {
  const defaultSettings = useDefaultChartSettings(props, getHeatMapSeries);
  const heatMapSettings = useHeatMapSettings(props);
  return (
    <ChartWidget
      noData={isEmpty(props.data)}
      chart={
        <ReactEcharts
          option={mergeDeepRight(defaultSettings, heatMapSettings)}
          style={{ width: '100%', height: '100%' }}
        />
      }
      overviewModule={props.overviewModule}
      includedFilters={props.includedFilters}
      enableDataSelection={props.enableDataSelection}
      showBorder={props.showBorder}
      showFooter={true}
      title={props.title}
    />
  );
};

CalendarHeatMap.defaultProps = {
  type: 'CalendarHeatMap',
};
