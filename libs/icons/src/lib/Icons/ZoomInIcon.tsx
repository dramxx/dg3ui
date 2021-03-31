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

export const ZoomInIcon: React.FC<IconProps> = (props: IconProps) => {
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
          transform="translate(-419.000000, -440.000000)"
        >
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path d="M372.45,286.967419 L375.6,286.967419 L375.6,288.972431 L372.45,288.972431 L372.45,291.97995 L370.35,291.97995 L370.35,288.972431 L367.2,288.972431 L367.2,286.967419 L370.35,286.967419 L370.35,283.9599 L372.45,283.9599 L372.45,286.967419 Z M384,298.582456 L382.5153,300 L378.06015,295.746366 L379.54485,294.328822 L384,298.582456 Z M371.4,294.035088 C367.9266,294.035088 365.1,291.337343 365.1,288.02005 C365.1,284.703759 367.9266,282.005013 371.4,282.005013 C374.8734,282.005013 377.7,284.703759 377.7,288.02005 C377.7,291.337343 374.8734,294.035088 371.4,294.035088 L371.4,294.035088 Z M371.4,280 C366.7611,280 363,283.590977 363,288.02005 C363,292.450125 366.7611,296.0401 371.4,296.0401 C376.0389,296.0401 379.8,292.450125 379.8,288.02005 C379.8,283.590977 376.0389,280 371.4,280 L371.4,280 Z" />
          </g>
        </g>
      </g>
    </StyledIcon>
  );
};

ZoomInIcon.defaultProps = {
  width: '16px',
  height: '16px',
  active: false,
};

ZoomInIcon;
