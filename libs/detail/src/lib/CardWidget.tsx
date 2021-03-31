import React, { FC } from 'react';
import styled from 'styled-components';

import { Card } from '@dg3/components';
import { DetailCardWidgetConfig } from '@dg3/schema';

const StyledCardWidget = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  config: DetailCardWidgetConfig;
}

export const CardWidget: FC<Props> = (props) => {
  const data = props.config.data;
  return (
    <StyledCardWidget>
      {data.map((card) => (
        <Card key={card.key} label={card.label} value={card.value} />
      ))}
    </StyledCardWidget>
  );
};
