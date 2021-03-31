import React, { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { AppMenu } from '@dg3/app-menu';
import { Backdrop, NotificationsBar } from '@dg3/components';
import { PUBLIC_PATH } from '@dg3/endpoints';
import { TopBar } from '@dg3/top-bar';
import { DgTheme } from '@dg3/types';
import { getAppModuleFromUrl } from '@dg3/utils';
import { useLoadExportedFiles } from '../api/loadExportedFiles';
import { useLoadReports } from '../api/loadReports';
import { useLoadSavedFilters } from '../api/loadSavedFilters';
import { FilterBox } from './FilterBox';
import { AppMenuItems } from './menu';
import { Router } from './router';

interface CollapsibleProps {
  collapsed: boolean;
}

const getMenuWidth = (props: CollapsibleProps & { theme: DgTheme }) =>
  props.collapsed
    ? props.theme.sizes.menuCollapsedWidth
    : props.theme.sizes.menuWidth;

const StyledWorkbench = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize.normal};
  font-weight: ${(props) => props.theme.fontWeight.normal};
  height: 100vh;
`;

const StyledTopBar = styled.div`
  position: fixed;
  width: 100%;
  height: ${(props) => props.theme.sizes.topBarHeight};
  max-height: ${(props) => props.theme.sizes.topBarHeight};
  z-index: ${(props) => props.theme.zIndex.modalContent};
`;

const StyledMenuBox = styled.div<CollapsibleProps>`
  position: fixed;
  top: ${(props) => props.theme.sizes.topBarHeight};
  width: ${getMenuWidth};
  height: calc(100% - ${(props) => props.theme.sizes.topBarHeight});
  z-index: 3;
`;

const StyledContentBox = styled.div<CollapsibleProps>`
  position: fixed;
  top: calc(${(props) => props.theme.sizes.topBarHeight});
  left: ${getMenuWidth};
  width: calc(100% - ${getMenuWidth});
  height: calc(100% - ${(props) => props.theme.sizes.topBarHeight});
  padding-top: calc(${(props) => props.theme.sizes.filterBoxHeight});
`;

const StyledFilter = styled.div<CollapsibleProps>`
  position: fixed;
  top: ${(props) => props.theme.sizes.topBarHeight};
  left: ${(props) =>
    props.collapsed
      ? props.theme.sizes.menuCollapsedWidth
      : props.theme.sizes.menuWidth};
  width: calc(
    100% -
      ${(props) =>
        props.collapsed
          ? props.theme.sizes.menuCollapsedWidth
          : props.theme.sizes.menuWidth}
  );
  height: ${(props) => props.theme.sizes.filterBoxHeight};
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadows.shadow2};
  z-index: 2;
`;

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.normal};
`;

// filtering out non-standard props
const StyledLink = styled(({ collapsed, ...props }) => <Link {...props} />)<{
  collapsed: boolean;
}>`
  width: ${(props) => (props.collapsed ? '60%' : '35%')};
`;
const StyledLogoImage = styled.img`
  width: 100%;
  height: auto;
`;

export const App: FC = () => {
  useLoadReports();
  useLoadSavedFilters();
  useLoadExportedFiles();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { pathname } = useLocation();
  const module = getAppModuleFromUrl(pathname);

  const appLogo = (
    <StyledLogo>
      <StyledLink to={'/'} collapsed={collapsed}>
        <StyledLogoImage
          src={
            collapsed
              ? `${PUBLIC_PATH}static/images/Polygon_logo_no_text.png`
              : `${PUBLIC_PATH}static/images/Polygon_logo.png`
          }
          alt={'Polygon logo'}
        />
      </StyledLink>
    </StyledLogo>
  );

  return (
    <StyledWorkbench>
      <Backdrop />
      <StyledTopBar>
        <TopBar logoText={''} />
        <NotificationsBar />
      </StyledTopBar>
      <StyledMenuBox collapsed={collapsed}>
        <AppMenu
          collapsed={collapsed}
          onMenuCollapse={setCollapsed}
          activeMenuItem={module}
          menuItems={AppMenuItems}
          appLogo={appLogo}
        />
      </StyledMenuBox>
      <StyledContentBox collapsed={collapsed}>
        <StyledFilter collapsed={collapsed}>
          <FilterBox />
        </StyledFilter>
        <Router />
      </StyledContentBox>
    </StyledWorkbench>
  );
};
