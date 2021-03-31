import React from 'react';
import styled from 'styled-components';

import { NotificationWarningIcon } from '@dg3/icons';

const StyledWarningMessage = styled.div`
  padding: 0 12px;
  white-space: nowrap;
`;

type Props = {
  message: string;
};

export const WarningNotification: React.FC<Props> = (props: Props) => {
  const { message } = props;

  return (
    <React.Fragment>
      <NotificationWarningIcon height={'20px'} width={'20px'} />
      <StyledWarningMessage>{message}</StyledWarningMessage>
    </React.Fragment>
  );
};
