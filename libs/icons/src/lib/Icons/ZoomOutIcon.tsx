import * as React from 'react';
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

export const ZoomOutIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 22 22" {...props}>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="0"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Dribbble-Light-Preview"
          transform="translate(-99.000000, -480.000000)"
        >
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path
              d="M47.3254377,328.972431 L55.9763131,328.972431 L55.9763131,326.967419 L47.3254377,326.967419 L47.3254377,328.972431 Z M64,338.582456 L62.4698764,340 L57.8827497,335.746366 L59.411792,334.328822 L64,338.582456 Z M51.6508754,334.035088 C48.0726571,334.035088 45.1627188,331.337343 45.1627188,328.02005 C45.1627188,324.703759 48.0726571,322.005013 51.6508754,322.005013 C55.2280124,322.005013 58.1390319,324.703759 58.1390319,328.02005 C58.1390319,331.337343 55.2280124,334.035088 51.6508754,334.035088 L51.6508754,334.035088 Z M51.6508754,320 C46.8723481,320 43,323.590977 43,328.02005 C43,332.449123 46.8723481,336.0401 51.6508754,336.0401 C56.4283213,336.0401 60.3017508,332.449123 60.3017508,328.02005 C60.3017508,323.590977 56.4283213,320 51.6508754,320 L51.6508754,320 Z"
              id="zoom_out-[#1459]"
            />
          </g>
        </g>
      </g>
    </StyledIcon>
  );
};

ZoomOutIcon.defaultProps = {
  width: '16px',
  height: '16px',
  active: false,
};

ZoomOutIcon;
