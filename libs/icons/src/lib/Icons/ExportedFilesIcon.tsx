import * as React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';

const StyledPath = styled.path<IconProps>`
  fill: ${(props) => (props.active ? '#d3d3d3' : '#b3b3b3')};
`;

const StyledLine = styled.line<IconProps>`
  stroke: ${(props) => (props.active ? '#d3d3d3' : '#b3b3b3')};
`;

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  :hover {
    ${StyledPath} {
      fill: #d3d3d3;
    }

    ${StyledLine} {
      stroke: #d3d3d3;
    }
  }
`;

export const ExportedFilesIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon {...props} viewBox="0 0 24 24">
      <g transform="translate(0 0)">
        <g transform="translate(-393 -403.784)">
          <StyledPath
            {...props}
            d="M3116,1472.785h-24v-24h18a6.007,6.007,0,0,1,6,6v18Zm-21-13v10h18v-10Zm0-9v5h18v-5Z"
            transform="translate(-2699 -1045.001)"
          />
          <StyledLine
            {...props}
            x1="13.387"
            transform="translate(398.5 417.562)"
            fill="none"
            strokeWidth="1"
          />
          <StyledLine
            {...props}
            x1="13.387"
            transform="translate(398.5 422.284)"
            fill="none"
            strokeWidth="1"
          />
          <StyledLine
            {...props}
            x1="13.387"
            transform="translate(398.5 419.784)"
            fill="none"
            strokeWidth="1"
          />
          <StyledPath
            {...props}
            d="M0,0V3"
            transform="translate(411 407.751)"
            fill="none"
            strokeWidth="1"
          />
        </g>
      </g>
    </StyledIcon>
  );
};

ExportedFilesIcon.defaultProps = {
  width: '24px',
  height: '24px',
  disabled: false,
};
