import ReactEcharts from 'echarts-for-react';
import React from 'react';
import styled, { ThemeContext } from 'styled-components';

import {
  DgTheme,
  KpiDataFormatProps,
  MarginProps,
  MeterChartDataObject,
} from '@dg3/types';
import { KpiText } from '../KpiChart/KpiText';
import { RangeLegend } from './RangeLegend';

const ChartWrapper = styled.div`
  position: relative;
`;

const getOption = (props: GaugeChartProps, dgTheme: DgTheme): object => {
  return {
    animation: false,
    color: props.colors,
    textStyle: {
      color: dgTheme.colors.black,
    },
    grid: {
      top: '10%',
      bottom: '15%',
    },
    series: getSeries(props, dgTheme),
    dataset: {
      source: props.data,
    },
  };
};

const getSeries = (props: GaugeChartProps, dgTheme: DgTheme): Array<object> => {
  return [
    {
      name: 'gauge chart',
      type: 'gauge',
      center: ['50%', '55%'],
      radius: '90%',
      min: props.data.range.from,
      max: props.data.range.to,
      startAngle: 180,
      endAngle: 0,
      axisLine: {
        lineStyle: {
          color: getColors(props.data),
          width: 50,
        },
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      pointer: {
        width: 4,
        length: '65%',
      },
      title: {
        offsetCenter: [0, '-20%'],
        textStyle: {
          color: dgTheme.colors.black,
          fontSize: 36,
          fontFamily: 'Source Sans Pro',
          fontWeight: '500',
        },
      },
      detail: {
        offsetCenter: [0, '-20%'],
        fontWeight: 'bolder',
        show: false,
      },
      data: [
        {
          value: props.data.value,
          name: `${props.percentages}%`,
        },
      ],
    },
  ];
};

const getColors = (data): Array<string> => {
  let colors = [];

  data.rangeProps.map((item) =>
    colors.push([item.to / data.range.to, item.color])
  );

  return colors;
};

interface GaugeChartProps {
  colors: Array<string>;
  data: MeterChartDataObject;
  prefix: string;
  suffix: string;
  kpiFormat: KpiDataFormatProps;
  percentages: number;
  textColor?: string;
  margin?: MarginProps;
}

export const GaugeChart = (props: GaugeChartProps) => {
  const dgTheme = React.useContext(ThemeContext);
  const { data, prefix, suffix, kpiFormat, textColor } = props;
  const options = getOption(props, dgTheme);

  return (
    <ChartWrapper>
      <ReactEcharts option={options} className="GaugeChart" />
      <KpiText
        data={data}
        height={50}
        width={50}
        textColor={textColor}
        widgetStyle={'number'}
        prefix={prefix}
        suffix={suffix}
        format={kpiFormat}
        margin={{
          top: 10,
          right: 30,
          bottom: 10,
          left: 0,
        }}
      />
      <RangeLegend rangeProps={data.rangeProps} />
    </ChartWrapper>
  );
};

GaugeChart.defaultProps = {
  title: '',
  width: 'auto',
  height: 'auto',
  showFooter: false,
  showBorder: false,
};
