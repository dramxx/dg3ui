export const MockGraphData = {
  nodes: [
    {
      id: '1',
      name: 'MEg202_123',
      dgType: 'device',
    },
    {
      id: '2',
      name: 'OM_1',
      dgType: 'place',
    },
    {
      id: '3',
      name: 'OM_2',
      dgType: 'place',
    },
    {
      id: '4',
      name: 'HK_123',
      dgType: 'place',
    },
  ],
  edges: [
    {
      id: '1',
      source: '1',
      target: '2',
      dgType: 'INSTALLED_AT',
    },
    {
      id: '2',
      source: '2',
      target: '4',
      dgType: 'FEED_FROM',
    },
    {
      id: '3',
      source: '3',
      target: '4',
      dgType: 'FEED_FROM',
    },
  ],
};
