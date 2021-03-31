import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  fill: ${(props) => (props.color ? props.color : '#FFFFFF')};
`;

export const TrashIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 21 21.425" {...props}>
      <path
        id="Rectangle-2-Union"
        d="M13.189.952,12.7.151A.314.314,0,0,0,12.68.118a.317.317,0,0,0-.058-.056A.319.319,0,0,0,12.589.04L12.552.023,12.514.01,12.475,0l-.04,0H7.392l-.04,0L7.313.01,7.275.023,7.238.04a.314.314,0,0,0-.115.111l-.486.8H.314l-.031,0-.031,0L.223.966.194.976.166.989.14,1.005l-.025.018-.023.021-.021.023-.018.025-.016.026q-.007.014-.013.028t-.01.029-.007.03q0,.015,0,.031t0,.031V2.63q0,.015,0,.031t0,.03q0,.015.007.03t.01.029.013.028L.053,2.8l.018.025.021.023.023.021.025.018.026.016.028.013.029.01.03.007.031,0,.031,0H19.686l.031,0,.03,0,.03-.007.029-.01.028-.013.026-.016.025-.018.023-.021.021-.023.018-.025.016-.026q.007-.014.013-.028a.3.3,0,0,0,.01-.029q0-.015.007-.03t0-.031q0-.015,0-.031V1.267q0-.015,0-.031t0-.031q0-.015-.007-.03a.3.3,0,0,0-.01-.029q-.006-.014-.013-.028l-.016-.026-.018-.025-.021-.023-.023-.021-.025-.018L19.834.989,19.806.976l-.029-.01-.03-.007-.03,0-.031,0Zm5.773,3.03H.952L2.737,18.97q0,.035.01.07t.013.07q.007.035.016.069t.019.068q.01.034.022.067t.025.066q.013.033.028.065t.031.064q.016.031.034.062t.037.061l.04.059.042.057L3.1,19.8l.047.053.05.051.052.048L3.3,20l.056.044.058.041.06.038.061.036.063.033.064.03.066.027.067.024.068.021.069.018.069.015.07.012.071.008.071.005.071,0,11.48.07h.072l.072,0,.072-.008.071-.011.071-.014.07-.018.069-.021.068-.024L16.4,20.3l.066-.03.064-.033.063-.036.061-.039.059-.042.057-.044.055-.047.053-.049.05-.052.048-.054.045-.056.043-.058.04-.06.037-.062q.018-.031.034-.063t.032-.065q.015-.033.029-.066t.025-.067q.012-.034.022-.069t.019-.07q.009-.035.016-.07t.013-.071q.006-.036.009-.072Z"
        transform="translate(0.5 0.5)"
        stroke="#707070"
        strokeWidth="1"
        fillRule="evenodd"
      />
    </StyledIcon>
  );
};

TrashIcon.defaultProps = {
  width: '21px',
  height: '21.425px',
  active: false,
};
