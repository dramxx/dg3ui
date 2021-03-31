import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledCloseIcon = styled.svg<IconProps>`
  stroke: ${(props) =>
  props.color ? props.color : props.theme.colors.grey3};
  fill: ${(props) => (props.color ? props.color : props.theme.colors.grey3)};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const CloseIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledCloseIcon viewBox="0 0 18 18" {...props}>
      <g>
        <path
          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
      </g>
    </StyledCloseIcon>
  );
};

CloseIcon.defaultProps = {
  width: '12px',
  height: '12px',
};

CloseIcon;
