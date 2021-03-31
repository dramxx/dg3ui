import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';
import { getDefaultIconColor } from '@dg3/utils';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  stroke: ${(props) =>
    props.active
      ? props.theme.colors.primary1
      : getDefaultIconColor(props.color, props.theme)};
  stroke-width: 0;
  stroke-linecap: round;
  stroke-linejoin: round;

  path {
    fill: ${(props) =>
      props.active
        ? props.theme.colors.primary1
        : getDefaultIconColor(props.color, props.theme)};
  }
`;

export const UnfoldMoreIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 10 18" {...props}>
      <g id="Icons" fill="none" fillRule="evenodd">
        <g id="Rounded" transform="translate(-651.000000, -3435.000000)">
          <g id="Navigation" transform="translate(100.000000, 3378.000000)">
            <g
              id="-Round-/-Navigation-/-unfold_more"
              transform="translate(544.000000, 54.000000)"
            >
              <g>
                <polygon id="Path" points="0 0 24 0 24 24 0 24" />
                <path d="M12,5.83 L14.46,8.29 C14.85,8.68 15.48,8.68 15.87,8.29 C16.26,7.9 16.26,7.27 15.87,6.88 L12.7,3.7 C12.31,3.31 11.68,3.31 11.29,3.7 L8.12,6.88 C7.73,7.27 7.73,7.9 8.12,8.29 C8.51,8.68 9.14,8.68 9.53,8.29 L12,5.83 Z M12,18.17 L9.54,15.71 C9.15,15.32 8.52,15.32 8.13,15.71 C7.74,16.1 7.74,16.73 8.13,17.12 L11.3,20.3 C11.69,20.69 12.32,20.69 12.71,20.3 L15.88,17.13 C16.27,16.74 16.27,16.11 15.88,15.72 C15.49,15.33 14.86,15.33 14.47,15.72 L12,18.17 Z" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </StyledIcon>
  );
};

UnfoldMoreIcon.defaultProps = {
  width: '10px',
  height: '18px',
  disabled: false,
};

UnfoldMoreIcon;
