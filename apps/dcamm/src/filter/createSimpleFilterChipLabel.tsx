import React from 'react';
import { IntlShape } from 'react-intl';

import { FILTER_CONDITIONS_SIGN, SimpleFilter } from '@dg3/types';
import { messages } from './messages';

export const createSimpleFilterChipLabel = (
  value: SimpleFilter,
  intl: IntlShape
): string => {
  const message = messages[value.attributeSelection]
    ? intl.formatMessage(messages[value.attributeSelection])
    : value.attributeSelection;

  const numberOfFilterValues = value.values.length;

  const valueName =
    numberOfFilterValues === 1
      ? value.values[0].name
      : `Σ${numberOfFilterValues}`;

  return `${message} ${
    FILTER_CONDITIONS_SIGN[value.relationalOperator]
  } ${valueName}`;
};
