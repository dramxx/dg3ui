import React from 'react';
import styled from 'styled-components';

interface Props {
  collapsed: boolean;
}

const StyledDivider = styled.div<Props>`
	height: 0.1rem;
	margin: ${(props) => (props.collapsed ? '1rem 1.3rem' : '1rem 1.2rem')};
	background-color: ${(props) => props.theme.colors.grey2};};
`;

export const Divider = (props: Props) => {
  return <StyledDivider {...props} />;
};

Divider.defaultProps = {
  collapsed: false,
};
