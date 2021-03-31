import { defineMessages } from 'react-intl';

import { Messages } from '@dg3/types';

export const messages: Messages = defineMessages({
  lastUpdate: {
    defaultMessage: 'last update {date} in {time}',
    id: 'chartWidget.lastUpdate',
  },
  noData: {
    defaultMessage: 'No data available.',
    id: 'chartWidget.noData',
  },
  includeFilters: {
    defaultMessage: 'include filters',
    id: 'chartWidget.includeFilters',
  },
  includeFilterPlace: {
    defaultMessage: 'p',
    id: 'chartWidget.includeFilters.place',
  },
  includeFilterDevice: {
    defaultMessage: 'd',
    id: 'chartWidget.includeFilters.device',
  },
  includeFilterTask: {
    defaultMessage: 'ta',
    id: 'chartWidget.includeFilters.task',
  },
  includeFilterInfo: {
    defaultMessage: 'i',
    id: 'chartWidget.includeFilters.info',
  },
  includeFilterTime: {
    defaultMessage: 'ti',
    id: 'chartWidget.includeFilters.time',
  },
  exportStarted: {
    defaultMessage: 'Starting to download data for export.',
    id: 'chartWidget.started',
  },
});
