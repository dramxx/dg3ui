import * as React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  .cls-1 {
    fill: #fff;
  }

  .cls-2 {
    fill: #4141ff;
  }

  .PanelIcon {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary1 : '#B3B3B3'};
    stroke: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#707070'};
  }
`;

export const FullscreenIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 26 26" {...props}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <rect className="cls-1" rx="2.05" />
          <path
            className="cls-2"
            d="M20.5,11a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1h-5a1,1,0,0,0,0,2h2.65l-5.28,5.65L7.7,6h2.8a1,1,0,0,0,0-2h-5a1,1,0,0,0-1,1v5a1,1,0,0,0,2,0V7.66l5,5.46-5,5.35V16a1,1,0,0,0-2,0v5a1,1,0,0,0,1,1h5a1,1,0,0,0,0-2H7.81l5-5.4L17.79,20H15.5a1,1,0,0,0,0,2h5a1,1,0,0,0,1-1V16a1,1,0,0,0-2,0v2.91l-5.28-5.78L19.5,7.48V10A1,1,0,0,0,20.5,11Z"
          />
          <rect className="cls-1" x="9.25" y="9.5" width="7" height="7" />
        </g>
      </g>
    </StyledIcon>
  );
};

FullscreenIcon.defaultProps = {
  width: '26px',
  height: '26px',
  disabled: false,
};
