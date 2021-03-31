import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .color {
    stroke: ${(props) => (props.color ? props.color : '#4141FF')};
  }
`;

export const PlusIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 70 70" {...props}>
      <g transform="translate(-40 -47.5)">
        <line
          className="color"
          y2="60"
          transform="translate(75.5 52.5)"
          fill="none"
          strokeLinecap="round"
          strokeWidth="10"
        />
        <line
          className="color"
          y2="60"
          transform="translate(105 82) rotate(90)"
          fill="none"
          strokeLinecap="round"
          strokeWidth="10"
        />
      </g>
    </StyledIcon>
  );
};

PlusIcon.defaultProps = {
  width: '70px',
  height: '70px',
  active: false,
};
