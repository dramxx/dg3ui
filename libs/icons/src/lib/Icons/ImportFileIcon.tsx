import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .color {
    stroke: ${(props) => (props.color ? props.color : '#F0F0F0')};
  }
`;

export const ImportFileIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 171 171" {...props}>
      <g transform="translate(-449 -251)">
        <g>
          <circle
            cx="85.5"
            cy="85.5"
            r="85.5"
            transform="translate(449 251)"
            fill="#fff"
          />
          <g>
            <g
              transform="translate(493 285)"
              fill="none"
              className="color"
              strokeWidth="5"
            >
              <rect width="84" height="102" rx="3" stroke="none" />
              <rect
                x="2.5"
                y="2.5"
                width="79"
                height="97"
                rx="0.5"
                fill="none"
              />
            </g>
            <path
              d="M0,0V17"
              transform="translate(575 352)"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
            />
            <line
              x1="27.582"
              transform="translate(549.918 360.5)"
              fill="none"
              className="color"
              strokeWidth="8"
            />
            <line
              x1="10"
              y2="10"
              transform="translate(548 350)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="8"
            />
            <line
              x1="10"
              y1="10"
              transform="translate(548 360)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="8"
            />
          </g>
          <g>
            <line
              x2="9"
              transform="translate(503.5 297.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="9"
              transform="translate(503.5 304.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="9"
              transform="translate(503.5 311.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="9"
              transform="translate(503.5 318.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="9"
              transform="translate(503.5 325.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="9"
              transform="translate(503.5 332.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="9"
              transform="translate(503.5 339.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="9"
              transform="translate(503.5 346.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(518.5 297.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(518.5 304.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(518.5 311.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(518.5 318.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(518.5 325.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(518.5 332.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(518.5 339.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(518.5 346.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(545.5 297.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(545.5 304.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(545.5 311.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(545.5 318.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(545.5 325.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(545.5 332.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <line
              x2="21"
              transform="translate(545.5 339.5)"
              fill="none"
              className="color"
              strokeLinecap="round"
              strokeWidth="4"
            />
          </g>
        </g>
      </g>
    </StyledIcon>
  );
};

ImportFileIcon.defaultProps = {
  width: '171px',
  height: '171px',
  active: false,
};
