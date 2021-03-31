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
`;

export const FilledUpArrowIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 386.257 386.257" {...props}>
      <g>
        <polygon points="193.129,96.879 0,289.379 386.257,289.379 " />
      </g>
    </StyledIcon>
  );
};

FilledUpArrowIcon.defaultProps = {
  width: '16px',
  height: '20px',
  active: false,
};

FilledUpArrowIcon;
