import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  DevicesIcon,
  EventsIcon,
  LoadBalanceIcon,
  MeasurementsIcon,
  MonitoringIcon,
  PanelIcon,
  PlacesIcon,
  ReadoutsIcon,
} from '@dg3/icons';
import { AppMenuItemProps, DcammMenuMessages as messages } from '@dg3/types';

export const AppMenuItems: AppMenuItemProps[] = [
  {
    title: <FormattedMessage {...messages.PANE} />,
    id: 'PANE',
    icon: PanelIcon,
    path: '/',
  },
  {
    title: <FormattedMessage {...messages.PLAC} />,
    id: 'PLAC',
    icon: PlacesIcon,
    path: '/PLAC',
  },
  {
    title: <FormattedMessage {...messages.DEVI} />,
    id: 'DEVI',
    icon: DevicesIcon,
    path: '/DEVI',
  },
  {
    title: <FormattedMessage {...messages.READ} />,
    id: 'READ',
    icon: ReadoutsIcon,
    path: '/READ',
  },
  {
    title: <FormattedMessage {...messages.MEAS} />,
    id: 'MEAS',
    icon: MeasurementsIcon,
    path: '/MEAS',
  },
  {
    title: <FormattedMessage {...messages.EVEN} />,
    id: 'EVEN',
    icon: EventsIcon,
    path: '/EVEN',
  },
  {
    title: <FormattedMessage {...messages.LOAD} />,
    id: 'LOAD',
    icon: LoadBalanceIcon,
    path: '/LOAD',
  },
  {
    title: <FormattedMessage {...messages.MONI} />,
    id: 'MONI',
    icon: MonitoringIcon,
    path: '/MONI',
  },
];
