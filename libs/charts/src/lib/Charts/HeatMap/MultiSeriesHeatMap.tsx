import ReactEcharts from 'echarts-for-react';
import { isEmpty, mergeDeepRight } from 'ramda';
import React, { FC, useMemo } from 'react';

import { MultiSeriesHeatMapProps } from '@dg3/types';
import { ChartWidget } from '../General/ChartWidget';
import { useDefaultChartSettings } from '../General/DefaultEChartSettings';
import {
  getHeatMapSeries,
  useHeatMapSettings,
} from './MultiSeriesHeatMapSettings';

export const MultiSeriesHeatMap: FC<MultiSeriesHeatMapProps> = (props) => {
  const { data } = props;
  const noData = useMemo(
    () => isEmpty(data) || data.every((series) => isEmpty(series.data)),
    [data]
  );
  const defaultSettings = useDefaultChartSettings(props, getHeatMapSeries);
  const heatMapSettings = useHeatMapSettings(props);

  return (
    <ChartWidget
      noData={noData}
      overviewModule={props.overviewModule}
      enableDataSelection={props.enableDataSelection}
      includedFilters={props.includedFilters}
      showBorder={props.showBorder}
      showFooter={true}
      title={props.title}
      chart={
        <ReactEcharts
          option={mergeDeepRight(defaultSettings, heatMapSettings)}
          style={{ width: '100%', height: '100%' }}
        />
      }
    />
  );
};
