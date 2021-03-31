import { defineMessages } from 'react-intl';

import { Messages } from './i18n';

export const DcammMenuMessages: Messages = defineMessages({
  PANE: {
    defaultMessage: 'panel',
    id: 'menu.PANE',
  },
  PLAC: {
    defaultMessage: 'places',
    id: 'menu.PLAC',
  },
  DEVI: {
    defaultMessage: 'devices',
    id: 'menu.DEVI',
  },
  READ: {
    defaultMessage: 'readouts',
    id: 'menu.READ',
  },
  MEAS: {
    defaultMessage: 'measurement',
    id: 'menu.MEAS',
  },
  MONI: {
    defaultMessage: 'monitoring',
    id: 'menu.MONI',
  },
  EVEN: {
    defaultMessage: 'events',
    id: 'menu.EVEN',
  },
  LOAD: {
    defaultMessage: 'load control',
    id: 'menu.LOAD',
  },
  appName: {
    defaultMessage: 'DC AMM',
    id: 'appLogo.appName.dcamm',
  },
});

export const WorkbenchMenuMessages: Messages = defineMessages({
  GRAPH: {
    defaultMessage: 'graph',
    id: 'menu.GRAPH',
  },
});

export const VgaMenuMessages: Messages = defineMessages({
  NTL: {
    defaultMessage: 'NTL',
    id: 'menu.NTL',
  },
});
