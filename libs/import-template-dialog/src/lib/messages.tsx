import { defineMessages } from 'react-intl';

import { Messages } from '@dg3/types';

export const messages: Messages = defineMessages({
  successfulTemplateImport: {
    defaultMessage: 'Template import was successful',
    id: 'notifications.successfulTemplateImport',
  },
  unsuccessfulTemplateImport: {
    defaultMessage: 'Imported template is not valid!',
    id: 'notifications.unsuccessfulTemplateImport',
  },
  missingTemplateSuffix: {
    defaultMessage: 'Missing template suffix ".template.json"',
    id: 'importTemplate.missingTemplateSuffix',
  },
});
