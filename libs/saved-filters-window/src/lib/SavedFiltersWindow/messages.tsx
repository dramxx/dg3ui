import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  savedFilter: {
    defaultMessage: 'saved filter',
    id: 'savedFilters.savedFilter',
  },
  author: {
    defaultMessage: 'author',
    id: 'savedFilters.author',
  },
  emptySavedFilters: {
    defaultMessage: 'No saved filters accessible.',
    id: 'savedFilters.emptySavedFilters',
  },
  filterDeleted: {
    defaultMessage: 'Filter was successfully deleted.',
    id: 'notifications.filterDeleted',
  },
  errorFilterDeleted: {
    defaultMessage: 'Filter could not be deleted.',
    id: 'notifications.errorFilterDeleted',
  },
});
