import React from 'react';
import styled from 'styled-components';

import { KpiDataFormat, KpiDataFormatProps, MarginProps, MeterChartDataObject } from '@dg3/types';

import { KpiText } from '../KpiChart/KpiText';
import { RangeLegend } from './RangeLegend';

interface MetricChartProps {
  data: MeterChartDataObject;
  prefix: string;
  suffix: string;
  kpiFormat: KpiDataFormatProps;
  widgetDataFormat?: KpiDataFormat;
  percentages: number;
  textColor?: string;
  margin?: MarginProps;
}

const StyledMeterChart = styled.div`
  margin-top: 1rem;
`;

export const MetricChart = (props: MetricChartProps) => {
  const { data, prefix, suffix, kpiFormat, percentages, textColor } = props;

  return (
    <StyledMeterChart>
      <KpiText
        data={data}
        height={100}
        width={100}
        widgetStyle={'number'}
        prefix={prefix}
        suffix={suffix}
        format={kpiFormat}
        textColor={textColor}
        margin={props.margin}
      />
      <KpiText
        data={{ id: 'kpiChart', value: percentages }}
        height={100}
        width={100}
        widgetStyle={'number'}
        prefix={prefix}
        suffix={'%'}
        format={kpiFormat}
        textColor={'gray'}
        margin={props.margin}
      />
      <RangeLegend rangeProps={data.rangeProps}/>
    </StyledMeterChart>
  );
};

MetricChart.defaultProps = {
  kpiFormat: {
    digits: 2,
    timeZone: '',
    timeFormat: '',
    durationFormat: 'short',
  },
  percentages: null,
  rangeProps: [],
};
