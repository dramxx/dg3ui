import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';
import { getDefaultIconColor } from '@dg3/utils';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  fill: ${(props) =>
    props.active
      ? props.theme.colors.primary1
      : getDefaultIconColor(props.color, props.theme)};
  fill-rule: evenodd;
`;

export const SortIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 425 425" {...props}>
      <g>
        <polygon points="212.5,0 19.371,192.5 405.629,192.5 	" />
        <polygon points="212.5,425 405.629,232.5 19.371,232.5 	" />
      </g>
    </StyledIcon>
  );
};

SortIcon.defaultProps = {
  width: '8px',
  height: '10px',
};

SortIcon;
