import { defineMessages } from 'react-intl';

import { Messages } from '@dg3/types';

export const messages: Messages = defineMessages({
  successfulAdhocTask: {
    defaultMessage: 'one-time task execution was successful.',
    id: 'notifications.successfulAdhocTask',
  },
  oneTimeTaskRun: {
    defaultMessage: 'one-time task',
    id: 'adhocTaskDialog.oneTimeTaskRun',
  },
  runAdhocTask: {
    defaultMessage: 'run',
    id: 'adhocTaskDialog.runAdhocTask',
  },
  usedFilters: {
    defaultMessage: 'used filters',
    id: 'adhocTaskDialog.usedFilters',
  },
});
