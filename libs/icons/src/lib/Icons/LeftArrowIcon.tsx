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

export const LeftArrowIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 24 24" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </StyledIcon>
  );
};

LeftArrowIcon.defaultProps = {
  width: '24px',
  height: '24px',
  disabled: false,
};

LeftArrowIcon;
