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

export const UnfoldLessIcon: React.FC<IconProps> = (props: IconProps) => {
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
                <path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </StyledIcon>
  );
};

UnfoldLessIcon.defaultProps = {
  width: '10px',
  height: '18px',
  disabled: false,
};

UnfoldLessIcon;
