import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';
import { getDefaultIconColor } from '@dg3/utils';

const StyledIcon = styled.svg<IconProps>`
  stroke: ${(props) =>
    props.active
      ? props.theme.colors.primary1
      : getDefaultIconColor(props.color, props.theme)};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const UpArrowIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 8 5" version="1.1" {...props}>
      <g
        id="Dashboard"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          id="UI"
          transform="translate(-651.000000, -2506.000000)"
          strokeWidth="1.33"
        >
          <g id="BOXED-MENU" transform="translate(96.000000, 2321.000000)">
            <g id="MENUs" transform="translate(4.000000, 109.000000)">
              <g id="Boxed-:open" transform="translate(330.000000, 0.000000)">
                <g
                  id="Arrow-:icon"
                  transform="translate(222.000000, 77.000000)"
                >
                  <polyline
                    id="Stroke-5"
                    points="6.24334381 2.93124992 3.1216719 0 0 2.93124992"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </StyledIcon>
  );
};

UpArrowIcon.defaultProps = {
  width: '8px',
  height: '5px',
  active: false,
};

UpArrowIcon;
