import React from 'react';
import styled from 'styled-components';

import { NotificationConfirmationIcon } from '@dg3/icons';

const StyledSuccessMessage = styled.div`
  padding: 0 12px;
  white-space: nowrap;
`;

type Props = {
  message: string;
};

export const SuccessNotification: React.FC<Props> = (props: Props) => {
  const { message } = props;

  return (
    <React.Fragment>
      <NotificationConfirmationIcon height={'20px'} width={'20px'} />
      <StyledSuccessMessage>{message}</StyledSuccessMessage>
    </React.Fragment>
  );
};
