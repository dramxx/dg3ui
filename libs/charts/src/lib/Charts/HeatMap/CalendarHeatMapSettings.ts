import { getYear, max, min, parseISO } from 'date-fns';
import { groupBy, range } from 'ramda';

import { HeatMapData } from '@dg3/schema';
import { CalendarHeatMapProps } from '@dg3/types';
import { useDayLabels, useMonthLabels, useWeekStartsOn } from '@dg3/utils';

const getValues = (series: HeatMapData): number[] =>
  series.map(({ value }) => value);

const getMaxValue = (series: HeatMapData): number =>
  Math.max(...getValues(series));

const getDates = (series: HeatMapData): Date[] =>
  series.map(({ timestamp }) => parseISO(timestamp));

export const getStartYear = (series: HeatMapData): number =>
  getYear(min(getDates(series)));

export const getEndYear = (series: HeatMapData): number =>
  getYear(max(getDates(series)));

export const getHeatMapSeries = (props: CalendarHeatMapProps) => {
  const startYear = getStartYear(props.data);
  const dataByYears = groupBy(
    ({ timestamp }) => String(getYear(parseISO(timestamp))),
    props.data
  );
  return Object.entries(dataByYears).map(
    ([year, data]: [string, HeatMapData]) => ({
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: parseInt(year) - startYear,
      data: data.map(({ timestamp, value }) => [timestamp, value]),
    })
  );
};

export const useHeatMapSettings = (props: CalendarHeatMapProps) => {
  const firstDay = useWeekStartsOn();
  const dayLabels = useDayLabels('short');
  const monthLabels = useMonthLabels('abbreviated');

  return {
    visualMap: {
      min: 0,
      max: getMaxValue(props.data),
      type: 'piecewise',
      orient: 'horizontal',
      show: props.legendShow,
      left: 'center',
    },
    calendar: range(getStartYear(props.data), getEndYear(props.data) + 1).map(
      (year, index) => ({
        top: index * (7 * props.cellSize + 30) + 30,
        cellSize: props.cellSize,
        range: String(year),
        dayLabel: { firstDay, nameMap: dayLabels },
        monthLabel: { nameMap: monthLabels },
      })
    ),
  };
};
