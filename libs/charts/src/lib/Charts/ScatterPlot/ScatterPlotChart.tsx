import ReactEcharts from 'echarts-for-react';
import { isEmpty } from 'ramda';
import React from 'react';

import { ScatterPlotChartProps } from '@dg3/types';
import { ChartWidget } from '../General/ChartWidget';
import { useDefaultChartSettings } from '../General/DefaultEChartSettings';
import {
  getMax,
  getMin,
  getScatterAxisSettings,
  getScatterSeries,
} from './ScatterPlotChartSettings';

export const ScatterPlotChart = (props: ScatterPlotChartProps) => {
  const [dataMenuShow, setDataMenuShow] = React.useState<boolean>(false);

  const handleChartClick = () => {
    setDataMenuShow(!dataMenuShow);
  };
  const getFormattedTooltip = (obj) => {
    const value = obj.value;
    return `${value[3]}<br>${props.axisXLabel}：${value[0]}<br>${props.axisYLabel}：${value[1]}<br>${props.valueLabel}：${value[2]}<br>`;
  };

  const axis = getScatterAxisSettings(props);
  const defaultSettings = useDefaultChartSettings(props, getScatterSeries);
  const minValue = getMin(props.data);
  const maxValue = getMax(props.data);

  return (
    <ChartWidget
      noData={isEmpty(props.data)}
      chart={
        <ReactEcharts
          option={{
            ...defaultSettings,
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(53,51,51,0.6)',
              shadowOffsetY: 5,
            },
            dataset: {
              source: props.data,
            },
            ...axis,
            tooltip: {
              padding: 10,
              backgroundColor: '#222',
              borderColor: '#777',
              borderWidth: 1,
              formatter: getFormattedTooltip,
            },
            grid: {
              right: 50,
            },
            visualMap: {
              left: 'right',
              bottom: '5%',
              min: minValue,
              max: maxValue,
              dimension: 2,
              inRange: {
                colorLightness: [0.75, 0.2],
              },
              outOfRange: {
                color: ['rgba(255,255,255,.2)'],
              },
              controller: {
                inRange: {
                  color: ['#000000'],
                },
                outOfRange: {
                  color: ['rgba(255,255,255,.2)'],
                },
              },
            },
          }}
          style={{ height: '100%', width: '100%' }}
          className="ScatterPlot"
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
      includedFilters={props.includedFilters}
      overviewModule={props.overviewModule}
      showBorder={props.showBorder}
      showFooter={true}
    />
  );
};

ScatterPlotChart.defaultProps = {
  type: 'ScatterPlot',
  title: '',
  width: 'auto',
  height: 'auto',
  legendShow: false,
  enableLegendHiding: false,
  enableDataSelection: false,
  enableDataLabels: false,
  enableTooltip: false,
  widgetStyle: '',
  showBorder: true,
  showFooter: true,
  enableLineTooltip: false,
  enableXZoom: false,
  minSymbolSize: 5,
  maxSymbolSize: 75,
};
