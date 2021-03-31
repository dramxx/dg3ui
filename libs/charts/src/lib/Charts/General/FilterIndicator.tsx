import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { MessageDescriptor } from '@dg3/types';

const StyledIndicator = styled.span<{ active: boolean }>`
  color: ${(props) =>
    props.active ? props.theme.colors.primary2 : props.theme.colors.grey3};
`;

interface Props {
  msg: MessageDescriptor;
  active: boolean;
}

export const FilterIndicator: FC<Props> = (props: Props) => {
  return (
    <StyledIndicator active={props.active}>
      <FormattedMessage {...props.msg} />
    </StyledIndicator>
  );
};
