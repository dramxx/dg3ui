import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  items: {
    defaultMessage:
      '{count, plural, =0 {no items} one {# item} other {# items}}',
    id: 'tableTopBar.items',
  },
  itemsOverflow: {
    defaultMessage: '{count, number} items, displayed first {maxCount, number}',
    id: 'tableTopBar.itemsOverflow',
  },
});
