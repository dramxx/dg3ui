import ReactEcharts from 'echarts-for-react';
import { isEmpty, mergeDeepRight } from 'ramda';
import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { BarChartProps } from '@dg3/types';
import { checkValueForIsoDate } from '@dg3/utils';
import { ChartWidget } from '../General/ChartWidget';
import { useDefaultChartSettings } from '../General/DefaultEChartSettings';
import { barChartAxisSettings, getBarSeries } from './BarChartSettings';

export const BarChart: FC<BarChartProps> = (props) => {
  const [dataMenuShow, setDataMenuShow] = React.useState<boolean>(false);
  const { formatDate } = useIntl();

  const axis = barChartAxisSettings(props);
  const defaultSettings = useDefaultChartSettings(props, getBarSeries);

  const handleChartClick = () => {
    setDataMenuShow(!dataMenuShow);
  };

  // TODO: review this in future if check of time value only on id key is enough
  const convData = props.data.map((item) => {
    return {
      ...item,
      id: checkValueForIsoDate(item.id)
        ? formatDate(item.id, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : item.id,
    };
  });

  return (
    <ChartWidget
      noData={isEmpty(convData)}
      chart={
        <ReactEcharts
          option={mergeDeepRight(defaultSettings, {
            ...axis,
            dataset: {
              source: convData,
            },
          })}
          style={{ height: '100%', width: '100%' }}
          className="BarChart"
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
      includedFilters={props.includedFilters}
      title={props.title}
      overviewModule={props.overviewModule}
      showBorder={props.showBorder}
      showFooter={true}
    />
  );
};

BarChart.defaultProps = {
  type: 'BarChart',
  title: '',
  legendShow: false,
  enableLegendHiding: false,
  enableDataSelection: false,
  enableDataLabels: false,
  enableTooltip: false,
  widgetStyle: 'stacked',
  showBorder: true,
  xAxis: {
    label: '',
  },
  yAxis: {
    label: '',
  },
  enableXZoom: false,
  layoutDirection: 'vertical',
};
