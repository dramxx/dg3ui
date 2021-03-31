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
    fill: #ffffff;
  }
`;

export const DevicesIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon x="0px" y="0px" viewBox="0 0 20 20" {...props}>
      <g id="Group_1446" transform="translate(0 0.266)">
        <g id="Rectangle_609" transform="translate(0 -0.266)">
          <path
            className="st0"
            d="M4.96,0h10c2.76,0,5,2.24,5,5v10c0,2.76-2.24,5-5,5h-10c-2.76,0-5-2.24-5-5V5C-0.04,2.24,2.2,0,4.96,0z"
          />
          <path
            className="st1"
            d="M4.96,0.38h10c2.55,0,4.62,2.07,4.62,4.62v10c0,2.55-2.07,4.62-4.62,4.62h-10c-2.55,0-4.62-2.07-4.62-4.62V5
			C0.33,2.45,2.41,0.38,4.96,0.38z"
          />
        </g>
        <path
          id="Union_3"
          className="st2"
          d="M8.58,10.61H5.46l5.81-7.73v5.74h3.13l-5.81,7.73V10.61z"
        />
      </g>
    </StyledIcon>
  );
};

DevicesIcon.defaultProps = {
  width: '20px',
  height: '20px',
  disabled: false,
};
