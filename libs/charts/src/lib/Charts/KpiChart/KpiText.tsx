import { isNil } from 'ramda';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { KpiChartObject } from '@dg3/schema';
import { KpiDataFormatProps, MarginProps } from '@dg3/types';
import { messages } from '../General/messages';
import { getKpi } from './KpiChartSettings';

const StyledKpiText = styled.div<KpiTextProps>`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: center;
  line-height: 1;
  width: 100%;
  height: 100%;
  color: ${(props) =>
    isNil(props.textColor) ? props.theme.colors.black : props.textColor};
  margin: ${(props) => props.margin && calculateMargin(props.margin)};
  font-size: ${(props) => props.theme.fontSize.extraLarge};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

interface KpiTextProps {
  data: KpiChartObject;
  prefix: string;
  suffix: string;
  format: KpiDataFormatProps;
  margin?: MarginProps;
  textColor?: string;
  height: number;
  width: number;
  widgetStyle: 'number' | 'datetime' | 'duration';
}

const calculateMargin = (margin: MarginProps): string => {
  const { top, right, left, bottom } = margin;
  return `${top}px ${right}px ${bottom}px ${left}px`;
};

export const KpiText: React.FC<KpiTextProps> = (props: KpiTextProps) => {
  const { data, prefix, suffix, widgetStyle, format } = props;
  const kpi = getKpi(data, prefix, suffix, widgetStyle, format);
  return (
    <StyledKpiText {...props}>
      {kpi === '' ? <FormattedMessage {...messages.noData} /> : kpi}
    </StyledKpiText>
  );
};

KpiText.defaultProps = {
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
};
