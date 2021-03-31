import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PanelIcon } from '@dg3/icons';
import { AppMenuItemProps, WorkbenchMenuMessages as messages } from '@dg3/types';

export const AppMenuMockItems: Array<AppMenuItemProps> = [
  {
    title: <FormattedMessage {...messages.GRAPH} />,
    id: 'GRAPH',
    icon: PanelIcon,
    path: '/GRAPH',
  },
  {
    title: 'Playground',
    id: 'PLAY',
    icon: PanelIcon,
    path: '/PLAY',
  },
  {
    title: 'GraphQL',
    id: 'GRAPHQL',
    icon: PanelIcon,
    path: '/GRAPHQL',
  },
];
