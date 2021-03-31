import { defineMessages } from 'react-intl';

import { Messages } from '@dg3/types';

export const messages: Messages = defineMessages({
  exportData: {
    defaultMessage: 'export',
    id: 'exportDialog.exportData',
  },
  exportMeasuredData: {
    defaultMessage: 'Measured data export',
    id: 'exportDialog.exportMeasuredData',
  },
  exportSelectedData: {
    defaultMessage: 'export only selected data',
    id: 'exportDialog.exportSelectedData',
  },
  exportBatchData: {
    defaultMessage: 'export data batch according to configuration below',
    id: 'exportDialog.exportBatchData',
  },
  maxItemsLimit: {
    defaultMessage: '(max 15 000 items)',
    id: 'exportDialog.maxItemsLimit',
  },
  maxItemsBatchLimit: {
    defaultMessage:
      'Maximal amount of data in exported csv file is 50 000 items',
    id: 'exportDialog.maxItemsBatchLimit',
  },
  template: {
    defaultMessage: 'template',
    id: 'exportDialog.template',
  },
  interval: {
    defaultMessage: 'time interval',
    id: 'exportDialog.interval',
  },
});
