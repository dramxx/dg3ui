import React from 'react';
import { NtlIcon, EvsIcon, PcdIcon } from '@dg3/icons';
import { AppMenuItemProps, VgaMenuMessages as messages } from '@dg3/types';
import { FormattedMessage } from 'react-intl';

export const AppMenuMockItems: Array<AppMenuItemProps> = [
  {
    title: <FormattedMessage {...messages.NTL} />,
    id: 'NTL',
    icon: NtlIcon,
    path: '/NTL',
    disabled: false,
  },
  {
    title: 'PCD',
    id: 'PCD',
    icon: PcdIcon,
    path: '/PDC',
    disabled: true,
  },
  {
    title: 'EVS',
    id: 'EVS',
    icon: EvsIcon,
    path: '/EVS',
    disabled: true,
  },
];
