import { MeterChartDataObject } from '@dg3/types';

export const getPercentages = (data: MeterChartDataObject): number => {
  const sumOfRange = data.range.to - data.range.from;
  const currValue = data.value - data.range.from;
  return Number.parseFloat(Number((currValue / sumOfRange) * 100).toFixed(2));
};
