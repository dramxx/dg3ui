import * as React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .OverviewIcon1 {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary1 : '#B3B3B3'};
    stroke: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#707070'};
  }
`;

export const OverviewIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon x="0px" y="0px" viewBox="0 0 183 164" {...props}>
      <g transform="translate(0.5 0.5)">
        <path
          d="M173.897 88.7992C172.432 101.391 166.833 121.762 166.833 121.762L181.297 162.125L129.179 148.641C129.179 148.641 126.167 148.453 79.0939 147.999C32.0214 147.545 6.42465 113.381 2.51877 94.9686C-1.38711 76.5556 -3.34798 53.3022 16.88 27.6817C37.1081 2.06129 77.5788 -0.0461957 90.1439 0.000741354C102.709 0.0476784 136.253 4.09382 156.777 26.1617C177.301 48.2293 175.361 76.2069 173.897 88.7992Z"
          className="OverviewIcon1"
          strokeWidth="1"
        />
        <path
          d="M2.85794 13.861C4.76323 15.8616 6.43037 16.8619 7.85934 16.8619C9.47884 16.8619 11.2412 15.8616 13.1465 13.861C15.0518 11.8605 16.0045 10.0504 16.0045 8.43093C16.0045 6.81143 15.0518 5.0014 13.1465 3.00084C11.2412 1.00028 9.47884 0 7.85934 0C6.3351 0 4.64416 1.00028 2.78649 3.00084C0.928831 5.0014 0 6.81143 0 8.43093C0 10.0504 0.95265 11.8605 2.85794 13.861C2.85794 13.861 2.85794 13.861 2.85794 13.861Z"
          transform="translate(79.12976 26.53931)"
          fill="#FFFFFF"
          stroke="none"
        />
        <path
          d="M11.789 64.518C13.3609 66.6615 15.9092 67.7332 19.434 67.7332C21.5298 67.7332 23.8876 66.9711 26.5074 65.4469C29.1272 63.9226 31.6279 61.9221 34.0095 59.4452C34.0095 59.4452 31.5803 56.1586 31.5803 56.1586C29.1986 57.9686 27.0076 58.8736 25.007 58.8736C22.4348 58.8736 21.1488 57.397 21.1488 54.4438C21.1488 54.4438 21.1488 3.85822 21.1488 3.85822C21.1488 2.71504 20.7439 1.78621 19.9341 1.07173C19.1244 0.357243 18.1003 0 16.8619 0C14.4802 0 11.6937 0.714485 8.50238 2.14346C5.31102 3.57243 2.47688 5.43009 0 7.71644C0 7.71644 1.00028 10.8602 1.00028 10.8602L6.85906 10.8602C7.81172 10.8602 8.47856 11.0983 8.85962 11.5747C9.24069 12.051 9.43121 12.8607 9.43121 14.0039C9.43121 14.0039 9.43121 54.0151 9.43121 54.0151C9.43121 58.8736 10.2171 62.3746 11.789 64.518C11.789 64.518 11.789 64.518 11.789 64.518Z"
          transform="translate(71.84204 54.26123)"
          fill="#FFFFFF"
          stroke="none"
        />
      </g>
    </StyledIcon>
  );
};

OverviewIcon.defaultProps = {
  width: '18px',
  height: '18px',
  disabled: false,
};