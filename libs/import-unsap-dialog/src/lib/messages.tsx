import { defineMessages } from 'react-intl';

import { Messages } from '@dg3/types';

export const messages: Messages = defineMessages({
  successfulNotSapImport: {
    defaultMessage: 'Data import was successful.',
    id: 'notifications.successfulNotSapImport',
  },
  unsuccessfulNotSapImport: {
    defaultMessage: 'Imported data contains wrong entries.',
    id: 'notifications.unsuccessfulNotSapImport',
  },
});
