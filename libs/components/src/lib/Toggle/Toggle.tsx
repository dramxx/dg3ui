import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import ReactSwitch from 'react-switch';

/* eslint-disable-next-line */
export interface ToggleProps {
  label?: React.ReactNode;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  width?: number;
  height?: number;
}

const StyledLabel = styled.div`
  padding-left: 1rem;
`;

const StyledToggle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Toggle = (props: ToggleProps) => {
  const theme = useContext(ThemeContext);

  return (
    <StyledToggle>
      <ReactSwitch
        checked={props.checked}
        onChange={props.onToggle}
        checkedIcon={false}
        uncheckedIcon={false}
        height={props.height ? props.height : 24}
        width={props.width ? props.width : 44}
        onColor={theme.colors.primary1}
        offColor={theme.colors.grey2}
      />
      {props.label && <StyledLabel>{props.label}</StyledLabel>}
    </StyledToggle>
  );
};
