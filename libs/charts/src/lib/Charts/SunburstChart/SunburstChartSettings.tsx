import { SunburstChartProps } from '@dg3/types';

export const getSunburstSeries = (props: SunburstChartProps) => {
  const seriesSettings = {
    type: 'sunburst',
    data: props.data,
    center: ['50%', '50%'],
    radius: [0, '100%'],
    label: {
      show: props.enableDataLabels,
      position: 'inside',
      rotate: props.enableLabelRotation,
      textShadowColor: '#FFF',
      textShadowBlur: 10,
    },
    highlightPolicy: 'ancestor',
    nodeClick: false,
    downplay: {
      itemStyle: {
        opacity: 0.7,
      },
    },
  };

  return seriesSettings;
};
