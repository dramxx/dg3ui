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

export const FilterIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon x="0px" y="0px" viewBox="0 0 22 24" {...props}>
      <g id="filter">
        <path
          d="M13.4204 11.875L13.4204 19.9799Q13.4204 20.1004 13.3918 20.2174Q13.3631 20.3344 13.3075 20.4412Q13.2519 20.5481 13.1724 20.6387Q13.093 20.7292 12.9943 20.7983L8.42041 24L8.42041 11.875L0.218864 1.62307Q0.130699 1.51287 0.0765136 1.38255Q0.0223282 1.25223 0.00636402 1.112Q-0.00960015 0.971777 0.0139065 0.832615Q0.0374131 0.693452 0.0985506 0.566248Q0.159688 0.439044 0.253671 0.333754Q0.347654 0.228465 0.467126 0.153331Q0.586599 0.078197 0.722209 0.0391Q0.857819 2.92578e-06 0.998953 2.86102e-06L20.8419 0Q20.983 0 21.1186 0.039097Q21.2542 0.0781939 21.3737 0.153328Q21.4932 0.228461 21.5871 0.333751Q21.6811 0.439041 21.7423 0.566245Q21.8034 0.693449 21.8269 0.832611Q21.8504 0.971774 21.8345 1.112Q21.8185 1.25223 21.7643 1.38255Q21.7101 1.51286 21.622 1.62307L13.4204 11.875Z"
          fillRule="evenodd"
          stroke="none"
        />
      </g>
    </StyledIcon>
  );
};

FilterIcon.defaultProps = {
  width: '24px',
  height: '24px',
  disabled: false,
};
