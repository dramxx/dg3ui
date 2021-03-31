import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';
import { getDefaultIconColor } from '@dg3/utils';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  fill: ${(props) =>
    props.active
      ? props.theme.colors.primary2
      : getDefaultIconColor(props.color, props.theme)};
  cursor: ${(props) => (props.onClick && !props.disabled ? 'pointer' : 'auto')};
`;

export const FilledRightArrowIcon: React.FC<IconProps> = (props) => (
  <StyledIcon viewBox="6 6 12 12" {...props}>
    <polygon points="9,18 15,12 9,6" />
  </StyledIcon>
);

FilledRightArrowIcon.defaultProps = {
  height: '12px',
  width: '12px',
  disabled: false,
};
