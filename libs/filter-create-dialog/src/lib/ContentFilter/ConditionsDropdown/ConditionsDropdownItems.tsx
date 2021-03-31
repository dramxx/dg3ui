import { FilterConditionsStrings } from '@dg3/types';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import React from 'react';

export const ConditionsDropdownItems = Object.keys(FilterConditionsStrings).map(
  (key) => {
    return {
      id: key,
      label: <FormattedMessage {...messages[FilterConditionsStrings[key]]} />,
      active: false,
    };
  }
);
