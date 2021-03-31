import { eachDayOfInterval, isSameDay, max, min, parseISO } from 'date-fns';
import { isEmpty } from 'ramda';
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { ThemeContext } from 'styled-components';

import { MultiSeriesHeatMapProps } from '@dg3/types';
import { roundFloat } from '@dg3/utils';

const flatten1 = <T>(array: T[][]): T[] => [].concat(...array);

// pretty much useless
export const getHeatMapSeries = (props: MultiSeriesHeatMapProps) => [];

export const useHeatMapSettings = (props: MultiSeriesHeatMapProps) => {
  const { formatDate } = useIntl();
  const theme = useContext(ThemeContext);

  const allDates: Date[] = flatten1(
    props.data.map((series) =>
      series.data.map((dataPoint) => parseISO(dataPoint.timestamp))
    )
  );
  const dates = !isEmpty(allDates)
    ? eachDayOfInterval({ start: min(allDates), end: max(allDates) })
    : [];
  const getDateIndex = (date: Date) =>
    dates.findIndex((day) => isSameDay(date, day));

  const data = flatten1(
    props.data.map((series, seriesIndex) =>
      series.data.map((dataPoint) => [
        getDateIndex(parseISO(dataPoint.timestamp)),
        seriesIndex,
        dataPoint.value,
      ])
    )
  );

  return {
    grid: {
      containLabel: true,
      top: 20,
      left: 0,
      right: 0,
    },
    xAxis: {
      type: 'category',
      data: dates.map((date) =>
        formatDate(date, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      ),
      splitArea: {
        show: true,
      },
      axisLabel: {
        interval: 'auto',
        rotate: 45,
      },
    },
    yAxis: {
      type: 'category',
      name: props.xAxisLabel,
      nameTextStyle: {
        align: 'right',
      },
      nameGap: 5,
      data: props.data.map((series) => series.label),
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: Math.max(...data.map(([, , value]) => value)),
      type: 'piecewise',
      orient: 'horizontal',
      bottom: 0,
      left: 'center',
      show: props.legendShow,
      formatter: (value1, value2) =>
        `${roundFloat(value1 * 100, 0)}%\u2013${roundFloat(value2 * 100, 0)}%`,
      inRange: {
        color: props.colors,
      },
    },
    tooltip: {
      formatter: ({ name, value }) =>
        `${name}: ${roundFloat(value[2] * 100, 0)}%`,
    },
    legend: {
      show: false,
    },
    series: [
      {
        type: 'heatmap',
        data: data,
        itemStyle: {
          borderColor: theme.colors.white,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
};
