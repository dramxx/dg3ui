import { PieChartSeriesObject } from '@dg3/schema';

export const PieChartMockColors: Array<string> = [
  '#79313D',
  '#FFD38D',
  '#B1423D',
  '#FFC452',
  '#F49A21',
  '#EA873D',
  '#D9752D',
  '#BF5533',
  '#B1423D',
  '#923545',
  '#79313D',
];

export const PieChartMockData: Array<PieChartSeriesObject> = [
  {
    id: 'rust',
    name: 'rust',
    value: 576,
    color: 'hsl(167, 70%, 50%)',
  },
  {
    id: 'javascript',
    name: 'javascript',
    value: 129,
    color: 'hsl(119, 70%, 50%)',
  },
  {
    id: 'java',
    name: 'java',
    value: 422,
    color: 'hsl(20, 70%, 50%)',
  },
  {
    id: 'hack',
    name: 'hack',
    value: 71,
    color: 'hsl(307, 70%, 50%)',
  },
  {
    id: 'erlang',
    name: 'erlang',
    value: 354,
    color: 'hsl(187, 70%, 50%)',
  },
];
