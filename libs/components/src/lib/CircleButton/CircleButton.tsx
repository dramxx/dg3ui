import React from 'react';
import { Button, ButtonProps } from '../Button/Button';
import styled from 'styled-components';

type Props = ButtonProps & CircleButtonProps;

export interface CircleButtonProps {
  radius: string;
}

const StyledCircleButton = styled(Button)<Props>`
  border-radius: 50%;
  padding: inherit;
  height: ${(props) => props.radius};
  width: ${(props) => props.radius};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CircleButton: React.FC<Props> = (props: Props) => {
  return <StyledCircleButton {...props} />;
};
