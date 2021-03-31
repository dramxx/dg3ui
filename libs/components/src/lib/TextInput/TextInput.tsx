import TextField from '@material-ui/core/TextField';
import { isEmpty, isNil } from 'ramda';
import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { messages } from './messages';

const StyledTextField = styled(TextField)`
  &&& .MuiInputBase-root {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontSize.small};
    font-weight: ${(props) => props.theme.fontWeight.normal};
    line-height: 1rem;
    background-color: ${(props) => props.theme.colors.white};
  }

  &&& .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  &&& .MuiOutlinedInput-root {
    padding: 4px ${(props) => props.theme.spacing.small};
    border-radius: ${(props) => props.theme.radius.small};
    border: 1px solid ${(props) => props.theme.colors.grey2};
    :focus,
    :focus-within,
    :hover {
      border: 1px solid ${(props) => props.theme.colors.primary2};
    }
  }

  &&& .MuiAutocomplete-input {
    padding: 0;
    :first-child {
      padding: 0;
    }
  }
`;

interface Props {
  value: string;
  placeholder?: string;
  onValueChange: (e) => void;
  onSubmit: (value: string) => void;
  multiline?: boolean;
}

export const TextInput: React.FC<Props> = (props: Props) => {
  const { onValueChange, onSubmit, multiline, placeholder, ...rest } = props;
  const intl = useIntl();

  const value = /\S/.test(props.value) ? props.value : '';

  const handleSubmit = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' || e.type === 'blur') {
      if (!isEmpty(value) && !isNil(value)) {
        onSubmit(value);
      }
    }
  };

  return (
    <StyledTextField
      {...rest}
      value={value}
      multiline={multiline}
      onChange={onValueChange}
      onKeyDown={handleSubmit}
      onBlur={handleSubmit}
      placeholder={placeholder || intl.formatMessage(messages.placeholder)}
      variant="outlined"
    />
  );
};
