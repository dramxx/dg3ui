import React, { FC } from 'react';
import styled from 'styled-components';

import { DetailJsonWidgetConfig } from '@dg3/schema';

const StyledJsonWidget = styled.div`
  display: flex;
  white-space: pre-wrap;
`;

interface Props {
  config: DetailJsonWidgetConfig;
}

export const JsonWidget: FC<Props> = (props) => (
  <StyledJsonWidget>
    {JSON.stringify(JSON.parse(props.config.data.value), null, 4)}
  </StyledJsonWidget>
);
