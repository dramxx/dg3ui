import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  .NotificationErrorIconFillColor {
    fill: ${(props) => (props.color ? props.color : '#ff342a')};
  }

  .NotificationErrorIconStrokeColor {
    stroke: ${(props) => (props.color ? props.color : '#ff342a')};
  }
`;

export const NotificationErrorIcon: React.FC<IconProps> = (
  props: IconProps
) => {
  return (
    <StyledIcon viewBox="0 0 20 20" {...props}>
      <g fill="none">
        <path d="M10,0A10,10,0,1,1,0,10,10,10,0,0,1,10,0Z" stroke="none" />
        <path
          className="NotificationErrorIconFillColor"
          d="M 10 2 C 5.588789939880371 2 2 5.588789939880371 2 10 C 2 14.41121006011963 5.588789939880371 18 10 18 C 14.41121006011963 18 18 14.41121006011963 18 10 C 18 5.588789939880371 14.41121006011963 2 10 2 M 10 0 C 15.52285003662109 0 20 4.477149963378906 20 10 C 20 15.52285003662109 15.52285003662109 20 10 20 C 4.477149963378906 20 0 15.52285003662109 0 10 C 0 4.477149963378906 4.477149963378906 0 10 0 Z"
          stroke="none"
        />
      </g>
      <g transform="translate(-1034 -951)">
        <g transform="translate(1042 957.634)">
          <path
            className="NotificationErrorIconStrokeColor"
            d="M4.441,1.774-2.652,8.02"
            transform="translate(1.074 -1.5)"
            fill="none"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </g>
        <g transform="translate(1040.423 957.908)">
          <path
            className="NotificationErrorIconStrokeColor"
            d="M-2.652,1.774,4.441,8.02"
            transform="translate(2.652 -1.774)"
            fill="none"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </g>
      </g>
    </StyledIcon>
  );
};

NotificationErrorIcon.defaultProps = {
  width: '20px',
  height: '20px',
  active: false,
};
