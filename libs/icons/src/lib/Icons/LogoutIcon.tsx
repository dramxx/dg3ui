import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledLogoutIcon = styled.svg<IconProps>`
  fill: ${(props) => (props.color ? props.color : props.theme.colors.black)};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const LogoutIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledLogoutIcon viewBox="0 0 24 24" {...props}>
      <path
        d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
    </StyledLogoutIcon>
  );
};

LogoutIcon.defaultProps = {
  width: '24px',
  height: '24px',
};

LogoutIcon;
