import React from 'react';
import styled from 'styled-components';

import { NotificationInfoIcon } from '@dg3/icons';

const StyledInfoMessage = styled.div`
  padding: 0 12px;
  white-space: nowrap;
`;

type Props = {
  message: string;
};

export const InfoNotification: React.FC<Props> = (props: Props) => {
  const { message } = props;

  return (
    <React.Fragment>
      <NotificationInfoIcon height={'20px'} width={'20px'} />
      <StyledInfoMessage>{message}</StyledInfoMessage>
    </React.Fragment>
  );
};
