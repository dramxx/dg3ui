import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .SortDownArrowIconFillColor {
    fill: ${(props) => props.color || props.theme.colors.primary2};
  }
`;

export const SortDownArrowIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 5 12" {...props}>
      <g
        transform="translate(5 12) rotate(180)"
        className="SortDownArrowIconFillColor"
      >
        <path
          d="M 4.385097503662109 11.5 L 0.6149024963378906 11.5 L 2.5 2.451531887054443 L 4.385097503662109 11.5 Z"
          stroke="none"
        />
        <path
          d="M 2.5 4.903054237365723 L 1.229802846908569 11 L 3.770196914672852 11 L 2.5 4.903054237365723 M 2.5 0 L 5 12 L 0 12 L 2.5 0 Z"
          stroke="none"
          className="SortDownArrowIconFillColor"
        />
      </g>
    </StyledIcon>
  );
};

SortDownArrowIcon.defaultProps = {
  width: '5px',
  height: '12px',
  disabled: false,
};
