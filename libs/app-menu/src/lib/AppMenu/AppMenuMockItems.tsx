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
import { AppMenuItemProps } from '@dg3/types';

export const menuItems: Array<AppMenuItemProps> = [
  {
    title: 'panel',
    id: 'home',
    icon: PanelIcon,
    path: '/',
  },
  {
    title: 'places',
    id: 'places',
    icon: PlacesIcon,
    path: '/PLAC',
  },
  {
    title: 'devices',
    id: 'devices',
    icon: DevicesIcon,
    path: '/DEVI',
  },
  {
    title: 'readouts',
    id: 'readouts',
    icon: ReadoutsIcon,
    path: '/READ',
  },
  {
    title: 'measurement',
    id: 'measurement',
    icon: MeasurementsIcon,
    path: '/MEAS',
  },
  {
    title: 'events',
    id: 'events',
    icon: EventsIcon,
    path: '/EVEN',
  },
  {
    title: 'load control',
    id: 'LOAD',
    icon: LoadBalanceIcon,
    path: '/LOAD',
  },
  {
    title: 'monitoring',
    id: 'monitoring',
    icon: MonitoringIcon,
    path: '/MONI',
  },
];
