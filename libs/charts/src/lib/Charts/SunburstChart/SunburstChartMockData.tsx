import { SunburstChartSeriesObject } from '@dg3/types';

export const SunburstChartMockColors: Array<string> = [
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

export const SunburstChartMockData: Array<SunburstChartSeriesObject> = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          {
            name: 'Cousin Jack',
            value: 2,
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 2,
              },
            ],
          },
          {
            name: 'Cousin Ben',
            value: 4,
          },
        ],
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5,
          },
          {
            name: 'Brother Peter',
            value: 1,
          },
        ],
      },
    ],
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          {
            name: 'Cousin Betty',
            value: 1,
          },
          {
            name: 'Cousin Jenny',
            value: 2,
          },
        ],
      },
    ],
  },
];

export const SunburstChartMockData1: Array<SunburstChartSeriesObject> = [
  {
    name: 'Grandparent #1',
    children: [
      {
        name: 'parent #1',
        children: [
          {
            name: 'child #1',
            value: 2,
          },
          {
            name: 'child #2',
            children: [
              {
                name: 'grandchild #1',
                value: 2,
              },
            ],
          },
          {
            name: 'child #3',
            value: 4,
          },
        ],
      },
      {
        name: 'parent #2',
        children: [
          {
            name: 'child #4',
            value: 5,
          },
          {
            name: 'child #5',
            value: 1,
          },
        ],
      },
    ],
  },
  {
    name: 'Grandparent #2',
    children: [
      {
        name: 'parent #3',
        children: [
          {
            name: 'child #6',
            value: 1,
          },
          {
            name: 'child #7',
            value: 2,
          },
        ],
      },
    ],
  },
];
