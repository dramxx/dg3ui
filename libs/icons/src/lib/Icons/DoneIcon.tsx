import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  & g {
    fill: ${(props) => (props.color ? props.color : props.theme.colors.white)}
     stroke: ${(props) =>
       props.color ? props.color : props.theme.colors.white}
`;

export const DoneIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 24 24" {...props}>
      <g>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
      </g>
    </StyledIcon>
  );
};

DoneIcon.defaultProps = {
  width: '14px',
  height: '14px',
};

DoneIcon;
