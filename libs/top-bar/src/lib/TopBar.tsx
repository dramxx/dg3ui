import React from 'react';
import styled from 'styled-components';

import { AppLogo } from '@dg3/app-logo';
import { ExportedFilesWindow } from '@dg3/exported-files-window';
import { ReportsWindow } from '@dg3/reports-window';
import { SavedFilterList, SavedFiltersWindow } from '@dg3/saved-filters-window';
import { UserSettings } from '@dg3/user-settings';

type Props = {
  logoText: string;
  // setActiveMenuItem: (activeMenuItem: string) => void;
};

const StyledTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 3px 20px;
  background: ${(props) => props.theme.colors.black};
  height: inherit;
`;

const StyledButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  min-width: 100px;
  > * {
    margin: 0 ${(props) => props.theme.spacing.small};
    display: flex;
    align-items: flex-end;
  }
`;

export const TopBar = (props: Props) => {
  return (
    <StyledTopBar>
      <AppLogo text={props.logoText} />
      <StyledButtons>
        <ExportedFilesWindow />
        <SavedFiltersWindow savedFilterList={SavedFilterList} />
        <ReportsWindow />
        <UserSettings />
      </StyledButtons>
    </StyledTopBar>
  );
};
