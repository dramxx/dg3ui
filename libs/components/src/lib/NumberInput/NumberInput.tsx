import { isEmpty } from 'ramda';
import React from 'react';
import styled from 'styled-components';

const StyledNumberInput = styled.input<{ height?: string }>`
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
  padding: 0 5px;
  min-width: fit-content;
  height: ${(props) => (props.height ? props.height : 'inherit')};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.radius.small};
  :focus,
  :hover {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.primary2};
  }
`;

interface Props {
  value?: number;
  disabled?: boolean;
  onChange: (number) => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  minimum?: number;
  maximum?: number;
  height?: string;
}

export const NumberInput: React.FC<Props> = (props: Props) => {
  const {
    minimum,
    maximum,
    onChange,
    value,
    disabled,
    onBlur,
    onKeyDown,
    height,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = parseInt(event.currentTarget.value);

    if (isEmpty(event.currentTarget.value)) {
      onChange('');
    }
    if (isNaN(inputNumber)) {
      return;
    }
    if (inputNumber < minimum) {
      onChange(minimum);
      return;
    }
    onChange(inputNumber > maximum ? maximum : inputNumber);
  };

  return (
    <StyledNumberInput
      value={value}
      onChange={handleChange}
      type={'number'}
      disabled={disabled}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      min={minimum}
      max={maximum}
      height={height}
    />
  );
};
