import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  fill: ${(props) => (props.color ? props.color : props.theme.colors.white)};

  .exportIconBottomPart {
    fill: none;
    stroke: ${(props) => props.theme.colors.grey3};
  }

  .exportIconArrowPart {
    fill: none;
    stroke: ${(props) => props.theme.colors.grey3};
  }
`;

export const ExportIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon width="17" height="12.207" viewBox="0 0 17 12.207" {...props}>
      <g id="export" transform="translate(0.5 0.707)">
        <g className={'exportIconBottomPart'} data-name="Group 1957">
          <line
            data-name="Line 234"
            y2="6"
            transform="translate(16 5)"
            strokeLinecap="round"
            strokeWidth="1"
          />
          <line
            data-name="Line 235"
            x2="16"
            transform="translate(0 11)"
            strokeLinecap="round"
            strokeWidth="1"
          />
          <line
            data-name="Line 236"
            y2="6"
            transform="translate(0 5)"
            strokeLinecap="round"
            strokeWidth="1"
          />
        </g>
        <g className="exportIconArrowPart" data-name="Group 1956">
          <line
            data-name="Line 237"
            y1="8"
            transform="translate(8)"
            strokeLinecap="round"
            strokeWidth="1"
          />
          <line
            data-name="Line 238"
            y1="3"
            x2="3"
            transform="translate(5)"
            strokeLinecap="round"
            strokeWidth="1"
          />
          <line
            data-name="Line 239"
            x1="3"
            y1="3"
            transform="translate(8)"
            strokeLinecap="round"
            strokeWidth="1"
          />
        </g>
      </g>
    </StyledIcon>
  );
};

ExportIcon.defaultProps = {
  width: '17px',
  height: '16px',
  active: false,
};
