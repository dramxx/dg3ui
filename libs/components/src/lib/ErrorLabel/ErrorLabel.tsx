import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
  color: ${(props) => props.theme.colors.red};
`;

interface Props {
  children: ReactNode;
}

export const ErrorLabel: FC<Props> = (props) => {
  return <StyledError>Error: {props.children}</StyledError>;
};
