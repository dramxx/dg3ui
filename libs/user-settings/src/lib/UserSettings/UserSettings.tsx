import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Popover } from '@dg3/components';
import { userVar } from '@dg3/graphql';
import { UserSettingsButton } from './UserSettingsButton';
import { UserSettingsMenu } from './UserSettingsMenu';

const StyledUserSettingsMenu = styled.div`
  margin: ${(props) => props.theme.spacing.normal};
  min-width: 150px;
`;

export const UserSettings: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const handlePopoverToggle = () => {
    setShow(!show);
  };

  const user = useReactiveVar(userVar);

  return (
    <div className={'userSettings'}>
      <Popover
        show={show}
        onToggle={handlePopoverToggle}
        placement={'bottom-end'}
        parent={<UserSettingsButton active={show} />}
      >
        <StyledUserSettingsMenu className={'userSettingsMenu'}>
          <UserSettingsMenu user={user} />
        </StyledUserSettingsMenu>
      </Popover>
    </div>
  );
};
