import ReactEcharts from 'echarts-for-react';
import { isEmpty, mergeDeepRight } from 'ramda';
import React, { FC } from 'react';

import { PieChartProps } from '@dg3/types';
import { ChartWidget } from '../General/ChartWidget';
import { useDefaultChartSettings } from '../General/DefaultEChartSettings';
import { getPieSeries } from './PieChartSettings';

export const PieChart: FC<PieChartProps> = (props) => {
  const [dataMenuShow, setDataMenuShow] = React.useState<boolean>(false);

  const defaultSettings = useDefaultChartSettings(props, getPieSeries);

  const handleChartClick = () => {
    setDataMenuShow(!dataMenuShow);
  };

  const getFormattedTooltip = (obj) => {
    const value = obj.value;
    return `${value.name}：${value.value} (${obj.percent} %)`;
  };

  return (
    <ChartWidget
      noData={isEmpty(props.data)}
      chart={
        <ReactEcharts
          option={mergeDeepRight(defaultSettings, {
            dataset: {
              source: props.data,
            },
            tooltip: {
              padding: 10,
              backgroundColor: '#222',
              borderColor: '#777',
              borderWidth: 1,
              formatter: getFormattedTooltip,
            },
          })}
          style={{ height: '100%', width: '100%' }}
          className="PieChart"
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

PieChart.defaultProps = {
  type: 'PieChart',
  title: '',
  legendShow: false,
  enableLegendHiding: false,
  enableDataSelection: false,
  enableDataLabels: false,
  enableTooltip: false,
  widgetStyle: 'pie',
  showBorder: true,
  enableRadialLabels: false,
};
