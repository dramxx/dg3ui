import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';
import { getDefaultIconColor } from '@dg3/utils';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  & path {
    fill: ${(props) =>
      props.active
        ? props.theme.colors.white
        : getDefaultIconColor(props.color, props.theme)};
  }
`;

export const SelectionIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 14 14" {...props}>
      <g
        id="Icons"
        stroke="none"
        strokeWidth="0"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Rounded" transform="translate(-139.000000, -3481.000000)">
          <g id="Navigation" transform="translate(100.000000, 3378.000000)">
            <g
              id="-Round-/-Navigation-/-fullscreen"
              transform="translate(34.000000, 98.000000)"
            >
              <g>
                <polygon id="Path" points="0 0 24 0 24 24 0 24" />
                <path
                  d="M6,14 C5.45,14 5,14.45 5,15 L5,18 C5,18.55 5.45,19 6,19 L9,19 C9.55,19 10,18.55 10,18 C10,17.45 9.55,17 9,17 L7,17 L7,15 C7,14.45 6.55,14 6,14 Z M6,10 C6.55,10 7,9.55 7,9 L7,7 L9,7 C9.55,7 10,6.55 10,6 C10,5.45 9.55,5 9,5 L6,5 C5.45,5 5,5.45 5,6 L5,9 C5,9.55 5.45,10 6,10 Z M17,17 L15,17 C14.45,17 14,17.45 14,18 C14,18.55 14.45,19 15,19 L18,19 C18.55,19 19,18.55 19,18 L19,15 C19,14.45 18.55,14 18,14 C17.45,14 17,14.45 17,15 L17,17 Z M14,6 C14,6.55 14.45,7 15,7 L17,7 L17,9 C17,9.55 17.45,10 18,10 C18.55,10 19,9.55 19,9 L19,6 C19,5.45 18.55,5 18,5 L15,5 C14.45,5 14,5.45 14,6 Z"
                  id="🔹-Icon-Color"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </StyledIcon>
  );
};

SelectionIcon.defaultProps = {
  width: '16px',
  height: '16px',
  active: false,
};

SelectionIcon;
