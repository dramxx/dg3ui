import { PieChartProps } from '@dg3/types';
import { getLegendSize } from '../General/DefaultEChartSettings';

export const getPieSeries = (props: PieChartProps) => {
  const seriesSettings = {
    type: 'pie',
    radius: getRadius(props.widgetStyle),
    center: getCenter(props.widgetStyle),
    startAngle: 180,
    endAngle: 360,
    label: {
      position: props.enableRadialLabels ? 'outside' : 'inside',
      formatter: (data) => data.value.value,
    },
    itemStyle: {
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      },
    },
    avoidLabelOverlap: true,
    bottom: 10 + getLegendSize(props),
  };

  // TODO: maybe this will help with solving of radial labels
  // const data = props.data.map((item) => {
  //   return {
  //     value: item.value,
  //     name: item.name,
  //     label: {
  //       normal: {
  //         formatter: '{c}',
  //         show: props.enableDataLabels || props.enableRadialLabels,
  //         position: props.enableDataLabels ? 'inside' : 'outside',
  //         fontSize: 14,
  //       },
  //     },
  //     labelLine: {
  //       show: props.enableRadialLabels,
  //     },
  //   };
  // });

  return {
    ...seriesSettings,
  };
};

const getRadius = (widgetStyle: string) => {
  switch (widgetStyle) {
    case 'pie':
      return '80%';
    case 'donut':
      return ['65%', '40%'];
    default:
      return '75%';
  }
};

const getCenter = (widgetStyle: string) => {
  switch (widgetStyle) {
    case 'pie':
      return ['50%', '50%'];
    case 'donut':
      return ['50%', '40%'];
    default:
      return ['50%', '50%'];
  }
};
