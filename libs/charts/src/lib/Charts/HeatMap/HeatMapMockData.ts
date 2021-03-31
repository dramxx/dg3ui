import { eachDayOfInterval, formatISO, parse } from 'date-fns';

import { HeatMapData, HeatMapSeries } from '@dg3/schema';

export const generateSeries = (start: Date, end: Date): HeatMapData =>
  eachDayOfInterval({ start, end }).map((date) => ({
    timestamp: formatISO(date),
    value: Math.random(),
  }));

export const generateMultipleSeries = (
  ids: string[],
  start: Date,
  end: Date
): HeatMapSeries =>
  ids.map((id) => ({ id, label: id, data: generateSeries(start, end) }));

export const parseDate = (date: string): Date =>
  parse(date, 'yyyy-MM-dd', new Date());

export const COLORS = [
  '#FD845D',
  '#A56813',
  '#FFD665',
  '#F8925C',
  '#FEAE5D',
  '#AC772D',
  '#FFE972',
  '#D9A051',
  '#FFF2AD',
];
