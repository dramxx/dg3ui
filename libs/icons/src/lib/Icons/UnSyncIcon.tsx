import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  fill: ${(props) => (props.color ? props.color : props.theme.colors.primary1)};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  opacity: 1;
  mix-blend-mode: normal;
  pointer-events: all;
  path {
    stroke: none;
  }
`;

export const UnSyncIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 24 24" {...props}>
      <g>
        <path d="M10 6.35V4.26c-.8.21-1.55.54-2.23.96l1.46 1.46c.25-.12.5-.24.77-.33zm-7.14-.94l2.36 2.36C4.45 8.99 4 10.44 4 12c0 2.21.91 4.2 2.36 5.64L4 20h6v-6l-2.24 2.24C6.68 15.15 6 13.66 6 12c0-1 .25-1.94.68-2.77l8.08 8.08c-.25.13-.5.25-.77.34v2.09c.8-.21 1.55-.54 2.23-.96l2.36 2.36 1.27-1.27L4.14 4.14 2.86 5.41zM20 4h-6v6l2.24-2.24C17.32 8.85 18 10.34 18 12c0 1-.25 1.94-.68 2.77l1.46 1.46C19.55 15.01 20 13.56 20 12c0-2.21-.91-4.2-2.36-5.64L20 4z" />
      </g>
    </StyledIcon>
  );
};

UnSyncIcon.defaultProps = {
  width: '43px',
  height: '43px',
};

UnSyncIcon;
