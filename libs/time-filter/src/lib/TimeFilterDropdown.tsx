import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { Dropdown, DropdownMenuItem } from '@dg3/components';
import { TimeFilterPreset } from '@dg3/types';
import { messages } from './messages';
import { TimeFilterPresetItem, TimeFilterPresets } from './TimeFilterPresets';

interface Props {
  onPresetSelect: (newValue?: TimeFilterPreset) => void;
  preset: TimeFilterPreset;
}

export const TimeFilterDropdown: FC<Props> = (props) => {
  const { formatMessage } = useIntl();

  const createOption = (preset: TimeFilterPresetItem): DropdownMenuItem => ({
    id: preset.id,
    label: formatMessage(preset.optionMsg),
    active: preset.id === props.preset,
  });
  const customOption = {
    id: null,
    label: formatMessage(messages.customPresetOption),
    active: false,
  };
  const items = Object.values(TimeFilterPresets)
    .map(createOption)
    .concat([customOption]);

  const label = props.preset
    ? formatMessage(TimeFilterPresets[props.preset].msg)
    : formatMessage(messages.customPreset);

  return (
    <Dropdown
      onValueChange={props.onPresetSelect}
      label={label}
      items={items}
      type="secondary"
    />
  );
};
