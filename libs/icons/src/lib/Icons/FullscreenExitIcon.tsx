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

export const FullscreenExitIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 26 26" {...props}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <rect className="cls-1" rx="2.05" />
          <path
            className="cls-2"
            d="M10.38,3.5h-.26a.87.87,0,0,0-.87.87V6.59L6,3.32,4.57,4.73,8.34,8.5H5.12a.87.87,0,0,0-.87.87v.26a.87.87,0,0,0,.87.87h5.26a.87.87,0,0,0,.87-.87V4.37A.87.87,0,0,0,10.38,3.5Z"
          />
          <path
            className="cls-2"
            d="M21.38,8.5H18.16l3.77-3.77L20.52,3.32,17.25,6.59V4.37a.87.87,0,0,0-.87-.87h-.26a.87.87,0,0,0-.87.87V9.63a.87.87,0,0,0,.87.87h5.26a.87.87,0,0,0,.87-.87V9.37A.87.87,0,0,0,21.38,8.5Z"
          />
          <path
            className="cls-2"
            d="M21.38,15.5H16.12a.87.87,0,0,0-.87.87v5.26a.87.87,0,0,0,.87.87h.26a.87.87,0,0,0,.87-.87V19.41l3.27,3.27,1.41-1.41L18.16,17.5h3.22a.87.87,0,0,0,.87-.87v-.26A.87.87,0,0,0,21.38,15.5Z"
          />
          <path
            className="cls-2"
            d="M10.38,15.5H5.12a.87.87,0,0,0-.87.87v.26a.87.87,0,0,0,.87.87H7.34L3.57,21.27,5,22.68l4.27-4.27v3.22a.87.87,0,0,0,.87.87h.26a.87.87,0,0,0,.87-.87V16.37A.87.87,0,0,0,10.38,15.5Z"
          />
        </g>
      </g>
    </StyledIcon>
  );
};

FullscreenExitIcon.defaultProps = {
  width: '26px',
  height: '26px',
  disabled: false,
};
