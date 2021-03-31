import React from 'react';
import { DropdownMenuItem } from './Dropdown';
import { UpArrowIcon } from '@dg3/icons';

export const dropdownItemsMock: Array<DropdownMenuItem> = [
  {
    id: '1',
    label: 'item1',
    active: false,
    Icon: UpArrowIcon,
  },
  {
    id: '2',
    label: 'item2',
    active: true,
    Icon: UpArrowIcon,
  },
  {
    id: '3',
    label: 'item3',
    active: false,
    Icon: UpArrowIcon,
  },
];

export const dropdownNonIconsItemsMock = [
  {
    id: '1',
    label: 'item1',
    active: false,
  },
  {
    id: '2',
    label: 'item2',
    active: true,
  },
  {
    id: '3',
    label: 'item3',
    active: false,
  },
];
