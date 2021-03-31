import React from 'react';
import { FormattedMessage } from 'react-intl';

import { DropdownMenuItem } from '@dg3/components';
import { CoreElementKey, SimpleFilterDefinition } from '@dg3/types';
import { DEVICE_SIMPLE_FILTER } from './DeviceFilterDefinitions';
import { INFORMATION_SIMPLE_FILTER } from './InformationFilterDefinition';
import { messages } from './messages';
import { PLACE_SIMPLE_FILTER } from './PlaceFilterDefinitions';
import { TASK_SIMPLE_FILTER } from './TaskFilterDefinitions';

export const getFilterDefinitionByCoreEl = (
  coreEl: CoreElementKey
): SimpleFilterDefinition => {
  switch (coreEl) {
    case 'DEVICE':
      return DEVICE_SIMPLE_FILTER;
    case 'PLACE':
      return PLACE_SIMPLE_FILTER;
    case 'TASK':
      return TASK_SIMPLE_FILTER;
    case 'INFORMATION':
      return INFORMATION_SIMPLE_FILTER;
  }
};

export const getFilterEntitiesDropdownItems = (
  coreEl: CoreElementKey
): Array<DropdownMenuItem> =>
  Object.keys(getFilterDefinitionByCoreEl(coreEl)).map((key) => {
    return {
      id: key,
      label: messages[key] ? <FormattedMessage {...messages[key]} /> : key,
      active: false,
    };
  });

export const getFilterEntityAttr = (
  coreEl: CoreElementKey,
  categoryId: string
): Array<DropdownMenuItem> => {
  const filterDefinition = getFilterDefinitionByCoreEl(coreEl);

  return filterDefinition[categoryId].attrs.map((item) => {
    return {
      id: item.id,
      label: messages[item.id] ? (
        <FormattedMessage {...messages[item.id]} />
      ) : (
        item.id
      ),
      active: false,
    };
  });
};
