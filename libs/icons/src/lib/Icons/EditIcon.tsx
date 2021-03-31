import React from 'react';
import styled from 'styled-components';

import { IconProps } from '@dg3/types';
import { getDefaultIconColor } from '@dg3/utils';

const StyledIcon = styled.svg<IconProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  fill: ${(props) =>
    props.active
      ? props.theme.colors.primary1
      : getDefaultIconColor(props.color, props.theme)};
`;

export const EditIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledIcon viewBox="0 0 13.998 14" {...props}>
      <path
        id="New-shape-Union"
        d="M13.959,1.593,12.41.042A.409.409,0,0,0,12.21,0a.77.77,0,0,0-.238.071L4.354,7.711l-.918,2.617a.357.357,0,0,0,.052.219.3.3,0,0,0,.2.068l2.648-.98,7.592-7.627A.684.684,0,0,0,14,1.787.408.408,0,0,0,13.959,1.593ZM5.021,3.788a.68.68,0,0,1-.426.286l-2.531.02a1.2,1.2,0,0,0-.6.219.88.88,0,0,0-.229.528l-.014,6.923a1.272,1.272,0,0,0,.168.672,1.017,1.017,0,0,0,.534.328l7.046.04a1.5,1.5,0,0,0,.711-.179.8.8,0,0,0,.275-.528l.01-2.571s.042-.447.281-.532a.786.786,0,0,1,.609-.021c.28.077.316.5.316.5l-.01,2.681a1.631,1.631,0,0,1-.264.867,2.133,2.133,0,0,1-.735.735,1.8,1.8,0,0,1-.825.232L1.9,14a1.654,1.654,0,0,1-.829-.221A1.769,1.769,0,0,1,.3,13.043a2.447,2.447,0,0,1-.3-.985L0,4.712a2.69,2.69,0,0,1,.309-.887,1.548,1.548,0,0,1,.638-.658,2.479,2.479,0,0,1,.807-.339l2.84.03a.7.7,0,0,1,.426.3A.62.62,0,0,1,5.021,3.788Z"
        fillRule="evenodd"
      />
    </StyledIcon>
  );
};

EditIcon.defaultProps = {
  width: '13.998px',
  height: '14px',
  active: false,
};
