import { findIndex, propEq, uniq } from 'ramda';

import { GraphChartDataObject, VgaStaticData } from '@dg3/types';

export const createVgaStaticData = (
  graphData: GraphChartDataObject
): VgaStaticData => {
  const categories = uniq(graphData.nodes.map((node) => node.category)).map(
    (category) => {
      return {
        name: category,
      };
    }
  );

  return {
    timeline: {},
    series: [
      {
        categories: categories,
        data: graphData.nodes.map((node) => {
          return {
            ...node,
            category: findIndex(propEq('name', node.category), categories),
            symbolSize: -1,
          };
        }),
        links: graphData.links,
      },
    ],
  };
};
