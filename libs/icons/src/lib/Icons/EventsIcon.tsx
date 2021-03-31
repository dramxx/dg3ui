import * as React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .eventsIcon {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary1 : '#B3B3B3'};
    stroke: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#707070'};
  }
`;

export const EventsIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon x="0px" y="0px" viewBox="0 0 185 153" {...props}>
      <g transform="translate(0.5 0.5)">
        <g>
          <path
            d="M1.77421 137.671L82.5091 5.30718C82.5091 5.30718 85.9682 -0.0349229 91.7325 0.000172164C97.4968 0.0352672 100.29 5.06022 100.29 5.06022L183.269 139.652C183.269 139.652 184.565 145.332 182.528 148.296C180.49 151.259 175.119 151.506 175.119 151.506L11.1376 152C11.1376 152 2.99683 151.38 0.780241 147.86C-1.43635 144.34 1.77421 137.671 1.77421 137.671L1.77421 137.671Z"
            className="eventsIcon"
            strokeWidth="1"
          />
          <path
            d="M1.75254 55.9739L0 10.1889C0 10.1889 0.648022 3.46871 4.1257 1.41496C7.60336 -0.638787 10.7251 -0.442988 14.0658 1.91197C17.4066 4.26694 17.6348 10.5176 17.6348 10.5176L15.8054 56.5827C15.8054 56.5827 14.8113 62.7332 12.0778 64.7833C9.34427 66.8335 8.35503 66.9468 5.61672 64.7833C2.87839 62.6198 1.75254 55.9739 1.75254 55.9739L1.75254 55.9739Z"
            transform="translate(82.88519 35.61206)"
            fill="#FFFFFF"
            stroke="none"
          />
          <path
            d="M0 10.9341C0 4.89538 4.89538 0 10.9341 0C16.9729 0 21.8683 4.89538 21.8683 10.9341C21.8683 16.9729 16.9729 21.8683 10.9341 21.8683C4.89538 21.8683 0 16.9729 0 10.9341L0 10.9341Z"
            transform="translate(80.54974 111.5781)"
            fill="#FFFFFF"
            stroke="none"
          />
        </g>
      </g>
    </StyledIcon>
  );
};

EventsIcon.defaultProps = {
  width: '20px',
  height: '20px',
  disabled: false,
};
