import { GraphChartNodeObject, GraphChartLinkObject } from '@dg3/types';

export const GraphChartMockColors: Array<string> = [
  'hsl(2, 59%, 54%)',
  'hsl(206, 33%, 33%)',
  '#FFD38D',
  '#79313D',
  '#D9752D',
  '#F49A21',
  '#EA873D',
  '#BF5533',
  '#B1423D',
  '#923545',
  '#FFC452',
];

export const GraphChartMockNodes: Array<GraphChartNodeObject> = [
  {
    id: '0',
    name: 'node1',
    x: 10,
    y: 10,
    value: 10,
    symbolSize: 10,
    category: 'category 0',
  },
  {
    id: '1',
    name: 'node2',
    x: 100,
    y: 100,
    value: 20,
    symbolSize: 15,
    category: 'category 0',
  },
  {
    id: '2',
    name: 'node3',
    x: 30,
    y: 100,
    value: 40,
    symbolSize: 7,
    category: 'category 1',
  },
  {
    id: '3',
    name: 'node4',
    x: 120,
    y: 30,
    value: 42,
    symbolSize: 50,
    category: 'category 0',
  },
];

export const GraphChartMockLinks: Array<GraphChartLinkObject> = [
  {
    id: '0',
    name: 'Link 1',
    source: '0',
    target: '1',
  },
  {
    id: '1',
    name: 'Link 2',
    source: '1',
    target: '2',
  },
  {
    id: '2',
    name: 'Link name',
    source: '2',
    target: '0',
  },
  {
    id: '3',
    name: 'Link name',
    source: '3',
    target: '2',
  },
  {
    id: '4',
    name: 'Link 1',
    source: '3',
    target: '1',
  },
];
