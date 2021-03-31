import { MeterChartDataObject } from '@dg3/types';

export const MeterChartMockData: MeterChartDataObject = {
  id: '01',
  value: 81,
  range: {
    from: 0,
    to: 100,
  },
  rangeProps: [
    {
      id: '01',
      from: 0,
      to: 49,
      color: 'red',
      label: 'wrong',
    },
    {
      id: '02',
      from: 50,
      to: 79,
      color: 'orange',
      label: 'good',
    },
    {
      id: '03',
      from: 80,
      to: 100,
      color: 'green',
      label: 'very good',
    },
  ],
};
