import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .SaveIcon1 {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary2 : props.theme.colors.grey2};
  }
  .SaveIcon2 {
    fill: ${(props) => props.theme.colors.white};
  }
  .SaveIcon3 {
    stroke: ${(props) =>
      props.active ? props.theme.colors.primary1 : props.theme.colors.grey2};
  }
  :hover {
    .SaveIcon1 {
      fill: ${(props) =>
        !props.disabled
          ? props.theme.colors.primary2
          : props.theme.colors.grey2};
    }
    .SaveIcon2 {
      fill: ${(props) => props.theme.colors.white};
    }
    .SaveIcon3 {
      stroke: ${(props) =>
        !props.disabled
          ? props.theme.colors.primary2
          : props.theme.colors.grey2};
    }
  }
`;

export const SaveIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 21 21" {...props}>
      <g transform="translate(0.25 0.25)">
        <g>
          <path
            d="M0 0L15 0C17.7614 0 20 2.23858 20 5L20 20L0 20L0 0L0 0Z"
            className="SaveIcon1"
            stroke="none"
          />
        </g>
        <path
          d="M13 0L0 0L0 6L16 6L16 3C16 1.34315 14.6569 0 13 0ZM16 10L0 10L0 18L16 18L16 10Z"
          transform="translate(2 1)"
          className="SaveIcon2"
          fillRule="evenodd"
          stroke="none"
        />
        <path
          d="M11 9.92114L0 9.92114M11 14.6431L0 14.6431M11 12.1431L0 12.1431M10.5 0L10.5 4"
          transform="translate(4.5 2.856934)"
          className="SaveIcon3"
          fill="none"
          strokeWidth="0.5"
        />
      </g>
    </StyledIcon>
  );
};

SaveIcon.defaultProps = {
  width: '20px',
  height: '20px',
  disabled: false,
};
