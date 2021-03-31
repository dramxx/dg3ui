import * as React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { MeterRangeObject } from '@dg3/types';
import { Circle } from '@dg3/components';

type Props = {
  rangeProps: Array<MeterRangeObject>;
};

const StyledLegendItem = styled.div`
  display: flex;
  flex-direction: row;
  align-item: center;
  min-width: 8rem;
`;

const StyledRangeLegendsWrapper = styled.div<Props>`
  color: ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const StyledLegendLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled.span`
  padding-left: 0.6rem;
`;

const getLegend = (
  rangeProps: Array<MeterRangeObject>,
  defColor: string,
): React.ReactNode => {
  return rangeProps.map((item) => (
    <StyledLegendItem key={item.id}>
      <StyledLegendLabel>
        <Circle
          color={item.color ? item.color : defColor}
          events={{ count: 0, radius: '1.4rem' }}
        />
        <StyledTitle>
          {item.label !== '' ? item.label : `${item.from} - ${item.to}`}
        </StyledTitle>
      </StyledLegendLabel>
    </StyledLegendItem>
  ));
};

export const RangeLegend = (props: Props) => {
  const { rangeProps } = props;
  const theme = React.useContext(ThemeContext);
  const legends = rangeProps && getLegend(rangeProps, theme.colors.black);

  return (
    <React.Fragment>
      <StyledRangeLegendsWrapper {...props}>
        {legends}
      </StyledRangeLegendsWrapper>
    </React.Fragment>
  );
};
