import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .CalendarIcon1 {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#E2E2E2'};
  }
  :hover {
    .CalendarIcon1 {
      fill: ${(props) => props.theme.colors.primary2};
    }
  }
`;

export const TimeFilterCalendarIcon: React.FC<IconProps> = (
  props: IconProps
) => {
  return (
    <StyledIcon viewBox="0 0 21 21" {...props}>
      <g transform="translate(0.5 0.5)">
        <path
          d="M2.22222 0L17.7778 0C19.0051 0 20 0.994921 20 2.22222L20 17.7778C20 19.0051 19.0051 20 17.7778 20L2.22222 20C0.994921 20 0 19.0051 0 17.7778L0 2.22222C0 0.994921 0.994921 0 2.22222 0L2.22222 0Z"
          className="CalendarIcon1"
          stroke="none"
        />
        <path
          d="M11.5 0L10.5 0L10.5 1L11.5 1L11.5 0ZM14 0L15 0L15 1L14 1L14 0ZM0 3.5L1 3.5L1 4.5L0 4.5L0 3.5ZM4.5 3.5L3.5 3.5L3.5 4.5L4.5 4.5L4.5 3.5ZM7 3.5L8 3.5L8 4.5L7 4.5L7 3.5ZM11.5 3.5L10.5 3.5L10.5 4.5L11.5 4.5L11.5 3.5ZM15 3.5L14 3.5L14 4.5L15 4.5L15 3.5ZM1 7L0 7L0 8L1 8L1 7ZM3.5 7L4.5 7L4.5 8L3.5 8L3.5 7ZM8 7L7 7L7 8L8 8L8 7ZM10.5 7L11.5 7L11.5 8L10.5 8L10.5 7ZM14 7L15 7L15 8L14 8L14 7ZM0 10.5L1 10.5L1 11.5L0 11.5L0 10.5ZM4.5 10.5L3.5 10.5L3.5 11.5L4.5 11.5L4.5 10.5ZM7 10.5L8 10.5L8 11.5L7 11.5L7 10.5ZM11.5 10.5L10.5 10.5L10.5 11.5L11.5 11.5L11.5 10.5ZM15 10.5L14 10.5L14 11.5L15 11.5L15 10.5ZM0 14L1 14L1 15L0 15L0 14ZM4.5 14L3.5 14L3.5 15L4.5 15L4.5 14ZM7 14L8 14L8 15L7 15L7 14Z"
          transform="translate(2.5 2.5)"
          fill="none"
          fillRule="evenodd"
          stroke="#EEEEEE"
          strokeWidth="1"
        />
      </g>
    </StyledIcon>
  );
};

TimeFilterCalendarIcon.defaultProps = {
  width: '20px',
  height: '20px',
  disabled: false,
};
