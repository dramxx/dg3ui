import ReactEcharts from 'echarts-for-react';
import { mergeDeepRight } from 'ramda';
import React, { FC } from 'react';

import { GraphChartProps } from '@dg3/types';
import { ChartWidget } from '../General/ChartWidget';
import { useDefaultChartSettings } from '../General/DefaultEChartSettings';
import { getGraphVisualisationSeries } from './GraphChartSettings';

export const GraphChart: FC<GraphChartProps> = (props) => {
  const [dataMenuShow, setDataMenuShow] = React.useState(false);

  const defaultSettings = useDefaultChartSettings(
    props,
    getGraphVisualisationSeries
  );

  const handleChartClick = () => {
    setDataMenuShow(!dataMenuShow);
  };

  return (
    <ChartWidget
      noData={!props.data}
      chart={
        <ReactEcharts
          option={mergeDeepRight(defaultSettings, {})}
          style={{ height: '100%', width: '100%' }}
          className="GraphVisualisation"
          onEvents={{
            click: (point) => {
              props.enableDataSelection
                ? handleChartClick()
                : console.log(point);
              // TODO: REMOVE console.log and CREATE global filter on click into chart
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

GraphChart.defaultProps = {
  type: 'GraphChart',
  title: '',
  legendShow: true,
  enableLegendHiding: true,
  enableDataSelection: false,
  enableDataLabels: false,
  enableTooltip: true,
  widgetStyle: '',
  showBorder: true,
  enableRoam: true,
  layout: 'none',
};
