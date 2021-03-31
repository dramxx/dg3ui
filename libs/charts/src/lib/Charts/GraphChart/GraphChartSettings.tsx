import { GraphChartNodeObject, GraphChartProps } from '@dg3/types';
import { uniq, pipe, map } from 'ramda';

export const getGraphVisualisationSeries = (
  props: GraphChartProps
): Array<object> => {
  const categories = pipe(
    map((node: GraphChartNodeObject) => node.category),
    uniq,
    map((category) => ({ name: category }))
  )(props.data.nodes);

  const seriesSetting = {
    type: 'graph',
    layout: props.layout,
    data: props.data.nodes,
    links: props.data.links,
    categories: categories,
    roam: props.enableRoam,
    focusNodeAdjacency: true,
    itemStyle: {
      borderColor: '#ffffff',
      borderWidth: 1,
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
    },
    label: {
      position: 'bottom',
      formatter: '{b}',
    },
    lineStyle: {
      color: 'source',
      curveness: 0.2,
    },
    emphasis: {
      edgeLabel: {
        show: true,
        formatter: (params) => params.data.name,
      },
      lineStyle: {
        width: 7,
      },
    },
  };

  // return series
  return [seriesSetting];
};
