import * as React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .st0 {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary1 : '#b3b4b4'};
  }
  .st1 {
    fill: none;
    stroke: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#666766'};
    stroke-width: 0.75;
  }
  .st2 {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#666766'};
  }
  .st3 {
    fill: none;
    stroke: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#666766'};
    stroke-width: 1.5;
  }
  .st4 {
    fill: #ffffff;
  }
  .st5 {
    clip-path: url(#SVGID_2_);
    fill: none;
    stroke: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#666766'};
    stroke-width: 1.5;
  }
`;

export const MonitoringIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon x="0px" y="0px" viewBox="0 0 20 20" {...props}>
      <g id="Group_757" transform="translate(0 0.391)">
        <g id="Group_749">
          <g id="Rectangle_618" transform="translate(0 -0.391)">
            <path
              className="st0"
              d="M0.99,0h18c0.55,0,1,0.45,1,1v12c0,0.55-0.45,1-1,1h-18c-0.55,0-1-0.45-1-1V1C-0.01,0.45,0.44,0,0.99,0z"
            />
            <path
              className="st1"
              d="M0.99,0.38h18c0.35,0,0.62,0.28,0.62,0.62v12c0,0.35-0.28,0.62-0.62,0.62h-18c-0.35,0-0.62-0.28-0.62-0.62V1
				C0.37,0.65,0.65,0.38,0.99,0.38z"
            />
          </g>
          <g id="Rectangle_619" transform="translate(8 13.609)">
            <rect x="-0.01" y="0" className="st2" width="4" height="5" />
            <rect x="0.74" y="0.75" className="st3" width="2.5" height="3.5" />
          </g>
          <g id="Rectangle_620" transform="translate(0 18.609)">
            <rect
              id="fill"
              x="-0.01"
              y="0"
              className="st4"
              width="20"
              height="1"
            />
            <g>
              <defs>
                <rect id="SVGID_1_" x="-0.01" y="0" width="20" height="1" />
              </defs>
              <clipPath id="SVGID_2_">
                <use xlinkHref="#SVGID_1_" />
              </clipPath>
              <path
                className="st5"
                d="M-0.01,0.25h20 M19.24,0v1 M19.99,0.75h-20 M0.74,1V0"
              />
            </g>
          </g>
        </g>
      </g>
    </StyledIcon>
  );
};

MonitoringIcon.defaultProps = {
  width: '20px',
  height: '20px',
  disabled: false,
};
