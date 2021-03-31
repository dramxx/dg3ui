import React from 'react';

import { Dropdown } from './Dropdown';
import { dropdownItemsMock, dropdownNonIconsItemsMock } from './DropdownMockData';

export default {
  component: Dropdown,
  title: 'Dropdown',
};

export const DropdownWithIcons = () => (
  <Dropdown
    items={dropdownItemsMock}
    label={'Dropdown title'}
    onValueChange={(id) => console.log(id)}
  />
);

export const DropdownWithoutIcons = () => (
  <Dropdown
    items={dropdownNonIconsItemsMock}
    label={'Dropdown title'}
    onValueChange={(id) => console.log(id)}
  />
);
