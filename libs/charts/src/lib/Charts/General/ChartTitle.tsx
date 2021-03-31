import * as React from 'react';
import styled, { css } from 'styled-components';

import { JUSTIFY_CONTENT_TYPE, JustifyContent } from '@dg3/types';

const StyledChartTitle = styled.div<{ justifyContent: string }>`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.normal};
  width: 100%;

  ${(props) =>
    props.justifyContent
      ? css`
          justify-content: ${props.justifyContent};
          text-align: ${props.justifyContent};
        `
      : css`
          justify-content: flex-start;
        `}
`;

interface Props {
  title: React.ReactNode;
  justifyContent?: JustifyContent;
}

export const ChartTitle: React.FC<Props> = (props) => {
  const { title } = props;
  const justifyContent = JUSTIFY_CONTENT_TYPE[props.justifyContent];

  return (
    <StyledChartTitle justifyContent={justifyContent}>{title}</StyledChartTitle>
  );
};
