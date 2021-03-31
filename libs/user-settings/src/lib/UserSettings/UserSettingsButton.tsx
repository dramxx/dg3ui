import React from 'react';
import styled from 'styled-components';

import { ProfileIcon } from '@dg3/icons';

interface Props {
  active: boolean;
}

const StyledUserButton = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 26px;
  height: 26px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.grey4 : props.theme.colors.grey3};
  border-radius: 50%;

  :hover {
    background-color: ${(props) => props.theme.colors.grey4};

    > svg {
      stroke: ${(props) => props.theme.colors.white};
    }
  }
`;

export const UserSettingsButton: React.FC<Props> = (props: Props) => {
  return (
    <StyledUserButton className={'userSettingsButton'} {...props}>
      <ProfileIcon width={'22px'} height={'22px'} />
    </StyledUserButton>
  );
};
