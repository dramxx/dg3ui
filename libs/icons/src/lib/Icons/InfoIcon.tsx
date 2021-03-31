import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  .text_i {
    fill: ${(props) =>
      props.active
        ? props.theme.colors.primary1
        : props.theme.colors.grey3};
    stroke: none;
  }

  .Ellipse_59 {
    stroke: ${(props) =>
      props.active
        ? props.theme.colors.primary1
        : props.theme.colors.grey3};
  }
`;

export const InfoIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon
      width="21.789"
      height="21.789"
      viewBox="0 0 21.789 21.789"
      {...props}
    >
      <g
        id="sbalování_menu"
        data-name="sbalování menu"
        transform="translate(0)"
      >
        <text
          className="text_i"
          transform="translate(8.827 15.645)"
          fontSize="15"
          fontFamily="HelveticaNeue-Bold, Helvetica Neue"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            i
          </tspan>
        </text>
        <g
          className="Ellipse_59"
          data-name="Ellipse 59"
          transform="matrix(0.342, 0.94, -0.94, 0.342, 15.975, 0)"
          fill="none"
          strokeWidth="1"
          strokeDasharray="32"
        >
          <circle cx="8.5" cy="8.5" r="8.5" stroke="none" />
          <circle cx="8.5" cy="8.5" r="8" fill="none" />
        </g>
      </g>
    </StyledIcon>
  );
};

InfoIcon.defaultProps = {
  width: '21.789px',
  height: '21.789px',
  active: false,
};
