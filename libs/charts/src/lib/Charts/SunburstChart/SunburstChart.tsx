import ReactEcharts from 'echarts-for-react';
import { isEmpty, mergeDeepRight } from 'ramda';
import React from 'react';

import { SunburstChartProps } from '@dg3/types';
import { ChartWidget } from '../General/ChartWidget';
import { useDefaultChartSettings } from '../General/DefaultEChartSettings';
import { getSunburstSeries } from './SunburstChartSettings';

export const SunburstChart: React.FC<SunburstChartProps> = (
  props: SunburstChartProps
) => {
  const [dataMenuShow, setDataMenuShow] = React.useState<boolean>(false);

  const defaultSettings = useDefaultChartSettings(props, getSunburstSeries);

  const handleChartClick = () => {
    setDataMenuShow((menuShow) => !menuShow);
  };

  return (
    <ChartWidget
      noData={isEmpty(props.data)}
      chart={
        <ReactEcharts
          option={mergeDeepRight(defaultSettings, {
            animation: true,
            legend: {
              orient: 'vertical',
              right: 0,
              bottom: '10%',
            },
          })}
          style={{ height: '100%', width: '100%' }}
          className="SunburstChart"
          onEvents={{
            click: (point) => {
              props.enableDataSelection
                ? handleChartClick()
                : console.log(point);
            },
          }}
        />
      }
      enableDataSelection={props.enableDataSelection}
      title={props.title}
      overviewModule={props.overviewModule}
      includedFilters={props.includedFilters}
      showBorder={props.showBorder}
      showFooter={true}
    />
  );
};

SunburstChart.defaultProps = {
  type: 'SunburstChart',
  title: '',
  legendShow: false,
  enableLegendHiding: false,
  enableDataSelection: false,
  enableDataLabels: true,
  enableTooltip: false,
  widgetStyle: '',
  showBorder: true,
  enableLabelRotation: 0,
};
