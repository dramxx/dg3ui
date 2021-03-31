import { isEmpty } from 'ramda';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Report } from '@dg3/report';
import { PageConfig } from '@dg3/types';
import { OverviewPage } from '../general/OverviewPage';
import { messages } from './messages';
import { ModuleTabMenuItem } from './ModuleTabMenuItem';
import { ModuleTabMenuLink } from './ModuleTabMenuLink';

const StyledReportTabMenu = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
`;

const StyledNoData = styled.div`
  padding: ${(props) => props.theme.spacing.normal};
`;

const HEADER_HEIGHT = 42;

const StyledTabContent = styled.div`
  border-radius: ${(props) => props.theme.radius.small};
  box-shadow: ${(props) => props.theme.shadows.shadow1};
  height: calc(100% - ${HEADER_HEIGHT}px);
  width: 100%;
`;

const StyledHeader = styled.div`
  height: ${HEADER_HEIGHT}px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  background: ${(props) => props.theme.colors.white};
`;

const renderTabContent = (activeItem: PageConfig) => {
  switch (activeItem.type) {
    case 'REPORT':
      return (
        <Report id={activeItem.id} config={JSON.parse(activeItem.config)} />
      );
    case 'OVERVIEW':
      // Add key to force new mount of component for each tab when module contains multiple overview components
      // This is required because of included filter definition, and other overview configurations could be slightly different
      return <OverviewPage key={activeItem.id} page={activeItem} />;
  }
};

interface Props {
  menuItems: Array<PageConfig>;
  activeItemId: string;
}

export const ModuleTabMenu: React.FC<Props> = (props: Props) => {
  const { menuItems } = props;

  const activeItemId = props.activeItemId
    ? props.activeItemId
    : menuItems[0].id;
  const activeItem = menuItems.find((item) => item.id === activeItemId);

  // TODO: handle missing data
  if (!activeItem) {
    return <div>Fetch request failed.</div>;
  }

  return (
    <StyledReportTabMenu>
      {!isEmpty(menuItems) ? (
        <React.Fragment>
          <StyledHeader>
            {menuItems.map((item) => (
              <ModuleTabMenuLink
                key={item.id}
                to={`/${item.module}/${item.type.toLowerCase()}/${item.id}`}
                active={item.id === activeItemId}
              >
                <ModuleTabMenuItem
                  key={item.id}
                  id={item.id}
                  active={item.id === activeItemId}
                  name={item.name}
                />
              </ModuleTabMenuLink>
            ))}
          </StyledHeader>
          <StyledTabContent>{renderTabContent(activeItem)}</StyledTabContent>
        </React.Fragment>
      ) : (
        <StyledNoData>
          <FormattedMessage {...messages.noData} />
        </StyledNoData>
      )}
    </StyledReportTabMenu>
  );
};
