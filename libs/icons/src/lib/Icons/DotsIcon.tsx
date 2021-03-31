import * as React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  fill: ${(props) => (props.color ? props.color : props.theme.colors.grey3)};
`;

export const DotsIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 15 3" {...props}>
      <g fillRule="evenodd">
        <circle cx="13.5" cy="1.5" r="1.5"/>
        <circle cx="7.5" cy="1.5" r="1.5"/>
        <circle cx="1.5" cy="1.5" r="1.5"/>
      </g>
    </StyledIcon>
  );
};

DotsIcon.defaultProps = {
  width: '15px',
  height: '15px',
  disabled: false,
};

DotsIcon;
