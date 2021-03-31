import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .SortUpArrowIconFillColor {
    fill: ${(props) => props.color || props.theme.colors.primary2};
  }
`;

export const SortUpArrowIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 5 12" {...props}>
      <g
        transform="translate(5 12) rotate(180)"
        className="SortUpArrowIconFillColor"
      >
        <path
          d="M 2.5 9.548467636108398 L 0.6149024963378906 0.5 L 4.385097503662109 0.5 L 2.5 9.548467636108398 Z"
          stroke="none"
        />
        <path
          d="M 2.5 7.096945762634277 L 3.770197153091431 1 L 1.229802966117859 1 L 2.5 7.096945762634277 M 2.5 12 L 0 -8.881784197001252e-16 L 5 -8.881784197001252e-16 L 2.5 12 Z"
          stroke="none"
          className="SortUpArrowIconFillColor"
        />
      </g>
    </StyledIcon>
  );
};

SortUpArrowIcon.defaultProps = {
  width: '5px',
  height: '12px',
  disabled: false,
};
