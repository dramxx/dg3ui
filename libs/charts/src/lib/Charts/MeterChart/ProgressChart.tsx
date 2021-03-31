import React from 'react';
import styled from 'styled-components';
import { KpiDataFormatProps, MeterChartDataObject } from '@dg3/types';
import { KpiText } from '../KpiChart/KpiText';
import { ProgressBar } from '@dg3/components';
import { RangeLegend } from './RangeLegend';

type ProgressChartProps = {
  data: MeterChartDataObject;
  prefix: string;
  suffix: string;
  kpiFormat: KpiDataFormatProps;
  colors: Array<string>;
  percentages: number;
  textColor: string;
};

const StyledProgressChart = styled.div`
  margin-top: 1rem;
`;

const StyledProgressText = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProgressChart = (props: ProgressChartProps) => {
  const { data, prefix, suffix, kpiFormat, percentages, textColor } = props;

  return (
    <StyledProgressChart {...props}>
      <ProgressBar percentages={percentages} color={textColor} height={1}/>
      <StyledProgressText {...props}>
        <KpiText
          data={data}
          height={100}
          width={100}
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
        <KpiText
          data={{ id: 'progressChart', value: percentages }}
          height={100}
          width={100}
          textColor={'gray'}
          widgetStyle={'number'}
          prefix={prefix}
          suffix={'%'}
          format={kpiFormat}
          margin={{
            top: 10,
            right: 30,
            bottom: 10,
            left: 0,
          }}
        />
      </StyledProgressText>
      <RangeLegend rangeProps={data.rangeProps}/>
    </StyledProgressChart>
  );
};

ProgressChart.defaultProps = {
  format: {
    digits: 2,
    timeZone: '',
    timeFormat: '',
    durationFormat: 'short',
  },
  percentages: null,
  rangeProps: [],
};
