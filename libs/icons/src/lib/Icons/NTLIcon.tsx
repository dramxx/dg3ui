import * as React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  .NtlIcon {
    stroke-width: 1;
    stroke: ${(props) =>
      props.active ? props.theme.colors.primary2 : '#707070'};
    fill: ${(props) =>
      props.active ? props.theme.colors.primary1 : '#b3b3b3'};
  }
`;

export const NtlIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon x="0px" y="0px" viewBox="0 0 20.865 21.043" {...props}>
      <path
        className="NtlIcon"
        d="M51.668,61.531a4.252,4.252,0,0,0-1.757-1.746s-1.2-.5-1.7.237a1.5,1.5,0,0,0,.032,1.555,17.184,17.184,0,0,0,1.606,1.492,18.271,18.271,0,0,1,1.825,1.33,14.549,14.549,0,0,1,2.215,2.294c2.3,2.534,3.874,2.871,3.874,2.871a5.3,5.3,0,0,0,3.221.274,3.57,3.57,0,0,0,1.273-.639,3.635,3.635,0,0,0,1.04-1.3,5.816,5.816,0,0,0,.539-1.826c.219-1.162.276-2.365.569-3.672a8.087,8.087,0,0,1,2.516-3.678,2.171,2.171,0,0,0,.854-1.082,1.177,1.177,0,0,0-.41-1.152,1.057,1.057,0,0,0-1.221.219,10.826,10.826,0,0,0-1.654,2.6s-.749,1.165-1.517,1.117-.81-.673-.839-1.318,1.327-2.831,1.951-3.932a4.839,4.839,0,0,0,.453-1.084,2.853,2.853,0,0,0,.259-1.088,1,1,0,0,0-.6-.946,1.3,1.3,0,0,0-1,.143,3.33,3.33,0,0,0-.631,1.146c-.126.758-.151.689-.217,1.262a5.692,5.692,0,0,1-.275,1.427c-.625,1.864-.179,1.322-.928,2.436a1.018,1.018,0,0,1-.662.413.686.686,0,0,1-.733-.336s-.274-.242-.261-1.135c.28-1.876.275-2.633.615-4.547.642-3.611-1.65-2.794-1.65-2.794a1.72,1.72,0,0,0-.559,1.519c.057.45.13,1.571.26,2.659.149,1.248.351,2.448.351,2.448s.343,1.726-.681,1.9a1.808,1.808,0,0,1-1.666-.8,5.818,5.818,0,0,1-.7-2.679c-.085-1.721-.271-2.94-.271-2.94s-.282-.762-.913-.745a1.39,1.39,0,0,0-.651.133.946.946,0,0,0-.474.7c.005.291-.248.685.531,2.23A13.842,13.842,0,0,1,54.746,57.2a8.266,8.266,0,0,1,.7,2.333,4.569,4.569,0,0,1-.675,2.815,2.142,2.142,0,0,1-1.5.956,1.974,1.974,0,0,1-1.21-.9A6.554,6.554,0,0,1,51.668,61.531Z"
        transform="translate(-47.465 -49.485)"
      />
    </StyledIcon>
  );
};

NtlIcon.defaultProps = {
  width: '20px',
  height: '20px',
  disabled: false,
};
