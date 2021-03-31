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

export const FilledLeftArrowIcon: React.FC<IconProps> = (props) => (
  <StyledIcon viewBox="6 6 12 12" {...props}>
    <polygon points="15,18 9,12 15,6" />
  </StyledIcon>
);

FilledLeftArrowIcon.defaultProps = {
  disabled: false,
  width: '12px',
  height: '12px',
};
