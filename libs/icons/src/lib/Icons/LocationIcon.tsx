import * as React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .LocationIcon2 {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary1 : '#B3B3B3'};
  }
  .LocationIcon1 {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#707070'};
  }
`;

export const LocationIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon x="0px" y="0px" viewBox="0 0 161 190" {...props}>
      <g>
        <path
          d="M8.52274 60.4966C17.2273 76.0606 36.9812 99.9646 36.9812 99.9646C36.9812 99.9646 58.8987 73.6259 66.6504 58.5224C74.4021 43.419 75.8361 34.7012 72.1342 24.7427C68.4322 14.7842 55.714 -0.399211 37.7217 0.00802492C19.7294 0.415262 6.38214 11.3467 2.16161 24.304C-2.05893 37.2612 -0.181806 44.9325 8.52274 60.4966ZM37.2573 14.2139C29.2619 14.2139 22.7803 20.6955 22.7803 28.6909C22.7803 36.6864 29.2619 43.168 37.2573 43.168C45.2528 43.168 51.7344 36.6864 51.7344 28.6909C51.7344 20.6955 45.2528 14.2139 37.2573 14.2139Z"
          className="LocationIcon1"
          fillRule="evenodd"
          stroke="none"
        />
        <path
          d="M92.5654 75.3116L132.706 0.0748658L153.35 0L153.725 109.171L92.5654 75.3116ZM0.374007 153.333L0 43.2863L30.4895 82.9885C30.4895 82.9885 60.2225 42.8608 68.2176 29.6866C76.2127 16.5125 79.8431 0.293836 79.8431 0.293836L102.33 0.065918L19.9211 153.111L0.374007 153.333ZM153.764 153.18L51.1084 153.18L79.752 99.3545L153.764 139.142L153.764 153.18Z"
          transform="translate(6.767822 36.07422)"
          className="LocationIcon2"
          fillRule="evenodd"
          stroke="none"
        />
      </g>
    </StyledIcon>
  );
};

LocationIcon.defaultProps = {
  width: '18px',
  height: '18px',
  disabled: false,
};
