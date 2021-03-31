import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .fillColor {
    fill: ${(props) => (props.color ? props.color : '#B3E6FD')};
  }
`;

export const FolderIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 17 12.593" {...props}>
      <g
        transform="translate(0 1.593)"
        stroke="#BABABA"
        strokeWidth="1"
        className="fillColor"
      >
        <rect width="17" height="11" stroke="none" />
        <rect x="0.5" y="0.5" width="16" height="10" fill="none" />
      </g>
      <g className="fillColor">
        <path
          d="M 8.164157867431641 2.018519163131714 L 0.4999978244304657 2.018519163131714 L 0.4999978244304657 0.4999992251396179 L 7.269766330718994 0.4999992251396179 L 8.164157867431641 2.018519163131714 Z"
          stroke="none"
        />
        <path
          d="M 0.9999980926513672 0.9999991655349731 L 0.9999980926513672 1.518519163131714 L 7.289387226104736 1.518519163131714 L 6.98398494720459 0.9999991655349731 L 0.9999980926513672 0.9999991655349731 M -1.9073486328125e-06 -7.152557373046875e-07 L 7.555557727813721 -7.152557373046875e-07 L 9.038937568664551 2.518519163131714 L -1.9073486328125e-06 2.518519163131714 L -1.9073486328125e-06 -7.152557373046875e-07 Z"
          stroke="none"
          fill="#BABABA"
        />
      </g>
    </StyledIcon>
  );
};

FolderIcon.defaultProps = {
  width: '17px',
  height: '12.593px',
  active: false,
};
