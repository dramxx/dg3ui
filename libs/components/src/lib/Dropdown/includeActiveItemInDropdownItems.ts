import { equals } from 'ramda';

import { DropdownMenuItem } from './Dropdown';

export const includeActiveItemsInDropdownItems = (
  originalItems: Array<DropdownMenuItem>,
  activeItem: DropdownMenuItem
): Array<DropdownMenuItem> =>
  originalItems.map((item) => {
    if (equals(item, activeItem)) {
      return { ...item, active: true };
    }
    return item;
  });
