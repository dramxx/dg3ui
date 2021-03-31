import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .RefreshIcon1 {
    fill: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#E2E2E2'};
  }
  :hover {
    .RefreshIcon1 {
      fill: ${(props) => props.theme.colors.primary2};
    }
  }
`;

export const TimeFilterRefreshIcon: React.FC<IconProps> = (
  props: IconProps
) => {
  return (
    <StyledIcon viewBox="0 0 20 20" {...props}>
      <g transform="matrix(7.54979E-08 1 -1 7.54979E-08 20 0)">
        <path
          d="M1.999 0L18.001 0Q18.0992 0 18.1969 0.00962573Q18.2947 0.0192515 18.391 0.0384102Q18.4873 0.057569 18.5813 0.0860763Q18.6753 0.114584 18.766 0.152165Q18.8567 0.189746 18.9433 0.236039Q19.0299 0.282333 19.1116 0.336892Q19.1932 0.391452 19.2692 0.453752Q19.3451 0.516052 19.4145 0.585494Q19.4839 0.654935 19.5462 0.730848Q19.6085 0.806761 19.6631 0.888415Q19.7177 0.970069 19.764 1.05668Q19.8103 1.14329 19.8478 1.23402Q19.8854 1.32474 19.9139 1.41872Q19.9424 1.5127 19.9616 1.60901Q19.9807 1.70533 19.9904 1.80306Q20 1.9008 20 1.999L20 18.001Q20 18.0992 19.9904 18.1969Q19.9807 18.2947 19.9616 18.391Q19.9424 18.4873 19.9139 18.5813Q19.8854 18.6753 19.8478 18.766Q19.8103 18.8567 19.764 18.9433Q19.7177 19.0299 19.6631 19.1116Q19.6085 19.1932 19.5462 19.2692Q19.4839 19.3451 19.4145 19.4145Q19.3451 19.4839 19.2692 19.5462Q19.1932 19.6085 19.1116 19.6631Q19.0299 19.7177 18.9433 19.764Q18.8567 19.8103 18.766 19.8478Q18.6753 19.8854 18.5813 19.9139Q18.4873 19.9424 18.391 19.9616Q18.2947 19.9807 18.1969 19.9904Q18.0992 20 18.001 20L1.999 20Q1.9008 20 1.80306 19.9904Q1.70533 19.9807 1.60901 19.9616Q1.5127 19.9424 1.41872 19.9139Q1.32474 19.8854 1.23402 19.8478Q1.14329 19.8103 1.05668 19.764Q0.970069 19.7177 0.888415 19.6631Q0.806761 19.6085 0.730848 19.5462Q0.654935 19.4839 0.585494 19.4145Q0.516052 19.3451 0.453752 19.2692Q0.391452 19.1932 0.336892 19.1116Q0.282333 19.0299 0.236039 18.9433Q0.189746 18.8567 0.152165 18.766Q0.114584 18.6753 0.0860763 18.5813Q0.057569 18.4873 0.0384102 18.391Q0.0192515 18.2947 0.00962573 18.1969Q0 18.0992 0 18.001L0 1.999Q0 1.9008 0.00962573 1.80306Q0.0192515 1.70533 0.0384102 1.60901Q0.057569 1.5127 0.0860763 1.41872Q0.114584 1.32474 0.152165 1.23402Q0.189746 1.14329 0.236039 1.05668Q0.282333 0.970069 0.336892 0.888415Q0.391452 0.806761 0.453752 0.730848Q0.516052 0.654935 0.585494 0.585494Q0.654935 0.516052 0.730848 0.453752Q0.806761 0.391452 0.888415 0.336892Q0.970069 0.282333 1.05668 0.236039Q1.14329 0.189746 1.23402 0.152165Q1.32474 0.114584 1.41872 0.0860763Q1.5127 0.057569 1.60901 0.0384102Q1.70533 0.0192515 1.80306 0.00962573Q1.9008 0 1.999 0L1.999 0Z"
          className="RefreshIcon1"
          stroke="none"
        />
        <path
          d="M4.99941 5.55556L9.44385 2.77778L4.99941 0L4.99941 1.94334C2.1108 2.78446 0 5.45158 0 8.61171C0 12.447 3.10913 15.5562 6.94444 15.5562C10.7798 15.5562 13.8889 12.447 13.8889 8.61171C13.8889 7.13624 13.4287 5.76824 12.7022 4.68618L11.2364 6.10955C11.6509 6.84539 11.8889 7.72203 11.8889 8.61171C11.8889 11.3381 9.67081 13.5562 6.94444 13.5562C4.21807 13.5562 2 11.3381 2 8.61171C2 6.5755 3.23723 4.82282 4.99941 4.06595L4.99941 5.55556Z"
          transform="translate(3.062988 1.978027)"
          fill="#EEEEEE"
          fillRule="evenodd"
          stroke="none"
        />
      </g>
    </StyledIcon>
  );
};

TimeFilterRefreshIcon.defaultProps = {
  width: '20px',
  height: '20px',
  disabled: false,
};