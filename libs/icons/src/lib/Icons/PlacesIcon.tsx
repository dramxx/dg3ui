import * as React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .st0 {
    fill: #ffffff;
  }
  .st1 {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#666766'};
  }
  .st2 {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary1 : '#b3b4b4'};
  }
`;

export const PlacesIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon x="0px" y="0px" viewBox="0 0 20 20" {...props}>
      <g id="Path_275" transform="translate(0 0.749)">
        <path
          className="st0"
          d="M19.41,18.88H0.63l5.39-9.7h8.88L19.41,18.88z"
        />
        <path
          className="st1"
          d="M6.25,9.55L1.27,18.5h17.55l-4.15-8.95H6.25 M5.81,8.8h9.34l4.85,10.45h-20L5.81,8.8z"
        />
      </g>
      <g id="Group_1461" transform="translate(5.435)">
        <g id="Union_1">
          <path
            className="st2"
            d="M4.84,14.27L1.02,6.24L1.01,6.21L0.99,6.19C0.58,5.59,0.37,4.92,0.37,4.22c0-2.12,2.01-3.85,4.47-3.85
			S9.32,2.1,9.32,4.22c0,0.69-0.22,1.37-0.63,1.96L8.67,6.21L8.66,6.24L4.84,14.27z"
          />
          <path
            className="st1"
            d="M4.84,0.75c-2.26,0-4.1,1.56-4.1,3.47c0,0.62,0.19,1.22,0.56,1.75l0.03,0.05l0.03,0.05l3.48,7.32l3.48-7.32
			l0.03-0.05l0.03-0.05c0.37-0.53,0.56-1.13,0.56-1.75C8.94,2.31,7.1,0.75,4.84,0.75 M4.84,0c2.68,0,4.85,1.89,4.85,4.22
			c0,0.8-0.25,1.54-0.69,2.18l-4.16,8.75L0.69,6.4C0.25,5.76-0.01,5.02-0.01,4.22C-0.01,1.89,2.16,0,4.84,0z"
          />
        </g>
        <g id="Path_236" transform="translate(2.52 2.273)">
          <path
            className="st0"
            d="M2.49,4.62c-1.17,0-2.12-0.95-2.12-2.13s0.95-2.12,2.12-2.12S4.62,1.33,4.62,2.5S3.66,4.62,2.49,4.62z"
          />
          <path
            className="st1"
            d="M2.49,0.75c-0.96,0-1.75,0.79-1.75,1.75s0.79,1.75,1.75,1.75S4.24,3.46,4.24,2.5S3.46,0.75,2.49,0.75 M2.49,0
			c1.38,0,2.5,1.12,2.5,2.5S3.87,5,2.49,5s-2.5-1.12-2.5-2.5S1.11,0,2.49,0z"
          />
        </g>
      </g>
    </StyledIcon>
  );
};

PlacesIcon.defaultProps = {
  width: '20px',
  height: '20px',
  disabled: false,
};
