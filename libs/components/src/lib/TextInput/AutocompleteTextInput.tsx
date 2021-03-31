import Autocomplete from '@material-ui/lab/Autocomplete';
import { isNil } from 'ramda';
import React from 'react';
import { useIntl } from 'react-intl';

import { messages } from './messages';
import { TextInput } from './TextInput';

interface Props {
  value: string;
  placeholder?: string;
  onValueChange: (e) => void;
  onSubmit: (value: string) => void;
  hints?: Array<string>;
}

export const AutocompleteTextInput: React.FC<Props> = (props: Props) => {
  const { onValueChange, onSubmit, hints, value, placeholder } = props;
  const intl = useIntl();

  return (
    <Autocomplete
      options={hints}
      popupIcon={null}
      closeIcon={null}
      forcePopupIcon={false}
      clearOnBlur={true}
      autoComplete={true}
      inputValue={value}
      onInputChange={(event, val, reason) => {
        if (reason === 'reset' && isNil(event)) {
          onSubmit(val);
        }
      }}
      noOptionsText={intl.formatMessage(messages.noOptions)}
      renderInput={(params) => (
        <TextInput
          {...params}
          value={value}
          multiline={false}
          onValueChange={onValueChange}
          onSubmit={onSubmit}
          placeholder={placeholder || intl.formatMessage(messages.placeholder)}
        />
      )}
    />
  );
};
