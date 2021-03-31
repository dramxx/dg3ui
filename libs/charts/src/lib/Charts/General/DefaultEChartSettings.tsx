import React from 'react';
import { ThemeContext } from 'styled-components';

import { ChartProps } from '@dg3/types';

export const getLegendSize = (props: ChartProps) =>
  props.legendShow ? props.legendSize ?? 20 : 0;

export const useDefaultChartSettings = (
  // TODO sort this out by chart type or something
  props: ChartProps & { data?: any },
  getSeries: (props) => {}
) => {
  const dgTheme = React.useContext(ThemeContext);
  return {
    // TODO: Investigate if this property should by disabled by default
    animation: false,
    // TODO: how to aproach to color system
    color: props.colors,
    textStyle: {
      color: dgTheme.colors.black,
    },
    grid: {
      left: 35,
      top: 30,
      right: 10,
      bottom: 10 + getLegendSize(props),
      containLabel: true,
    },
    legend: {
      type: 'plain',
      orientation: 'horizontal',
      icon: 'square',
      show: props.legendShow,
      selectedMode: props.enableLegendHiding,
      textStyle: {
        color: dgTheme.colors.black,
        fontSize: dgTheme.fontSize.small,
        fontFamily: dgTheme.fontFamily,
        fontWeight: dgTheme.fontWeight,
      },
      tooltip: {
        show: true,
      },
      padding: 10,
      bottom: 0,
    },
    tooltip: {
      confine: true,
      show: props.enableTooltip,
    },
    series: getSeries(props),
  };
};

// TODO: disabled operations - keep this solved props for future
// toolbox: {
//   feature: {
//     dataZoom: {
//       show: props.enableXZoom,
//       yAxisIndex: false,
//       title: {
//         zoom: 'Zoom data',
//         back: 'Revert zoom',
//       },
//     },
//     restore: {
//       show: true,
//       title: 'Reset data..',
//     },
//   },
// },
