import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  .NotificationWarningIconFillColor {
    fill: ${(props) => (props.color ? props.color : '#ea9648')};
  }

  .NotificationWarningIconStrokeColor {
    stroke: ${(props) => (props.color ? props.color : '#ea9648')};
  }
`;

export const NotificationWarningIcon: React.FC<IconProps> = (
  props: IconProps
) => {
  return (
    <StyledIcon viewBox="0 0 22 22" {...props}>
      <g fill="none" strokeLinejoin="round">
        <path
          d="M9.211,3.578a2,2,0,0,1,3.578,0l7.764,15.528A2,2,0,0,1,18.764,22H3.236a2,2,0,0,1-1.789-2.894Z"
          stroke="none"
        />
        <path
          d="M 10.99999046325684 4.472126007080078 L 10.99999523162842 4.472135543823242 C 10.99999332427979 4.472135543823242 10.99999141693115 4.472135543823242 10.99999046325684 4.472135543823242 L 3.236064910888672 19.99999618530273 C 3.236066818237305 19.99999618530273 3.236068725585938 19.99999618530273 3.23607063293457 19.99999618530273 L 18.76392936706543 19.99999618530273 C 18.76393127441406 19.99999618530273 18.7639331817627 19.99999618530273 18.76394081115723 20.0000057220459 L 10.99999046325684 4.472126007080078 M 10.99999904632568 2.472137451171875 C 11.71016502380371 2.472137451171875 12.42033004760742 2.840660095214844 12.78884983062744 3.577705383300781 L 20.55278968811035 19.10557556152344 C 21.21768951416016 20.43537521362305 20.25069999694824 21.99999618530273 18.76392936706543 21.99999618530273 L 3.23607063293457 21.99999618530273 C 1.749300003051758 21.99999618530273 0.7823104858398438 20.43537521362305 1.447210311889648 19.10557556152344 L 9.211139678955078 3.577705383300781 C 9.579665184020996 2.840660095214844 10.28983211517334 2.472137451171875 10.99999904632568 2.472137451171875 Z"
          stroke="none"
          className="NotificationWarningIconFillColor"
        />
      </g>
      <line
        y2="3"
        transform="translate(11 11)"
        fill="none"
        strokeLinecap="round"
        strokeWidth="3"
        className="NotificationWarningIconStrokeColor"
      />
      <line
        transform="translate(11 18)"
        fill="none"
        strokeLinecap="round"
        strokeWidth="3"
        className="NotificationWarningIconStrokeColor"
      />
    </StyledIcon>
  );
};

NotificationWarningIcon.defaultProps = {
  width: '20px',
  height: '20px',
  active: false,
};
