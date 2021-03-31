import ReactEcharts from 'echarts-for-react';
import { isEmpty, mergeDeepRight } from 'ramda';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { LineChartProps } from '@dg3/types';
import { checkValueForFloatAndRound, checkValueForIsoDate } from '@dg3/utils';
import { ChartWidget } from '../General/ChartWidget';
import { useDefaultChartSettings } from '../General/DefaultEChartSettings';
import { getLineAxisSettings, getLineSeries } from './LineChartSettings';

export const LineChart: FC<LineChartProps> = (props) => {
  const [dataMenuShow, setDataMenuShow] = React.useState<boolean>(false);
  const { formatDate } = useIntl();

  // // TODO: review this in future if check of time value only on id key is enough
  const convData = props.data.map((item) => {
    return {
      ...item,
      data:
        item != null
          ? item.data.map((coords) => {
              return {
                y: checkValueForFloatAndRound(coords.y),
                x: checkValueForIsoDate(coords.x)
                  ? formatDate(coords.x, {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : coords.x,
              };
            })
          : [],
    };
  });

  const axis = getLineAxisSettings({ ...props, data: convData });
  const defaultSettings = useDefaultChartSettings(
    { ...props, data: convData },
    getLineSeries
  );

  const handleChartClick = () => {
    setDataMenuShow(!dataMenuShow);
  };

  return (
    <ChartWidget
      noData={isEmpty(convData)}
      chart={
        <ReactEcharts
          option={mergeDeepRight(defaultSettings, {
            ...axis,
            axisLabel: {
              rotate: 45,
            },
            tooltip: {
              trigger: props.enableLineTooltip ? 'axis' : 'item',
            },
            dataset: {
              source: convData,
            },
          })}
          style={{ height: '100%', width: '100%' }}
          className="LineChart"
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

LineChart.defaultProps = {
  type: 'LineChart',
  title: '',
  legendShow: false,
  enableLegendHiding: false,
  enableDataSelection: false,
  enableDataLabels: false,
  enableTooltip: false,
  widgetStyle: 'stacked',
  showBorder: true,
  enableLineTooltip: false,
  enableArea: false,
  axisXLabel: '',
  axisYLabel: '',
  enableXZoom: false,
  layoutDirection: 'vertical',
};
