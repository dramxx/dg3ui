import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';
import { getDefaultIconColor } from '@dg3/utils';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  stroke: ${(props) =>
    props.active
      ? props.theme.colors.primary1
      : getDefaultIconColor(props.color, props.theme)};
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  polyline {
    fill: none;
  }
`;

export const LeftDoubleArrowIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 24 24" {...props}>
      <polyline points="11 17 6 12 11 7" />
      <polyline points="18 17 13 12 18 7" />
    </StyledIcon>
  );
};

LeftDoubleArrowIcon.defaultProps = {
  width: '24px',
  height: '24px',
  disabled: false,
};

LeftDoubleArrowIcon;
