import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  save: {
    defaultMessage: 'save',
    id: 'saveContentFilter.save',
  },
  name: {
    defaultMessage: 'name',
    id: 'saveContentFilter.name',
  },
  saveError: {
    defaultMessage: 'Filter saved with this name already exists.',
    id: 'saveContentFilter.saveError',
  },
  filterSaved: {
    defaultMessage: 'Filter was succesfully saved',
    id: 'notifications.filterSaved',
  },
  errorFilterSave: {
    defaultMessage: 'Filter could not be saved.',
    id: 'notifications.errorFilterSave',
  },
});
