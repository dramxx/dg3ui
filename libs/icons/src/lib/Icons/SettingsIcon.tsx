import * as React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  fill: ${(props) => (props.active ? '#d3d3d3' : '#b3b3b3')};
  :hover {
    fill: #d3d3d3;
  }
`;

export const SettingsIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon x="0px" y="0px" viewBox="0 0 24 24" {...props}>
      <g>
        <path
          d="M7.589 4.57901L4.579 2.50601L2.667 4.46603L4.587 7.37503L3.642 9.84702L0.2 10.356L0 13.3L3.5 13.923L4.579 16.269L2.428 19.076L4.579 21.32L7.462 19.325L9.84 20.206L10.121 23.89L13.233 24L13.846 20.428L16.214 19.326L19.052 21.626L21.61 19.466L19.264 16.676L20.08 14.064L23.856 13.6L23.998 10.36L20.384 10.067L19.466 7.379L21.439 4.57901L19.466 2.50601L16.212 4.57901L14.019 3.48401L13.453 0L10.564 0L9.84 3.48401L7.589 4.57901ZM12.0931 7.15894C9.56083 7.15894 7.50806 9.21171 7.50806 11.7439C7.50806 14.2762 9.56083 16.3289 12.0931 16.3289C14.6253 16.3289 16.6781 14.2762 16.6781 11.7439C16.6781 9.21171 14.6253 7.15894 12.0931 7.15894Z"
          fillRule="evenodd"
          stroke="none"
        />
      </g>
    </StyledIcon>
  );
};

SettingsIcon.defaultProps = {
  width: '24px',
  height: '24px',
  disabled: false,
};
