import React from 'react';
import styled from 'styled-components';
import { IconProps } from '@dg3/types';

const StyledProfileIcon = styled.svg<IconProps>`
  stroke: ${(props) =>
    props.color ? props.color : props.theme.colors.white};
  fill: none;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  stroke-linejoin: round;
`;

export const ProfileIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <StyledProfileIcon viewBox="0 0 17 18" {...props}>
      <g fillRule="evenodd" transform="translate(1.5 0.5)" {...props}>
        <path d="M0 13.765c0-.646.38-1.23.971-1.49.758-.332 1.793-.788 2.487-1.095.626-.277.76-.444 1.393-.728 0 0 .066-.33.042-.527h.494s.113.067 0-.708c0 0-.603-.163-.63-1.398 0 0-.452.155-.48-.594-.02-.507-.405-.948.15-1.311l-.282-.776s-.565-3.13 1.058-2.671C4.52 1.634 9.083.8 9.381 3.443c0 0 .211 1.427 0 2.404 0 0 .666-.079.22 1.225 0 0-.244.939-.62.728 0 0 .06 1.187-.532 1.388 0 0 .042.632.042.675l.565.087s-.085.517.014.574c0 0 .81.42 1.467.675.775.299 1.583.652 2.186.925.583.263.956.843.955 1.483 0 .276 0 .53.003.653.008.4-.284.74-.684.74H.685A.685.685 0 0 1 0 14.315v-.55z" />
      </g>
    </StyledProfileIcon>
  );
};

ProfileIcon.defaultProps = {
  width: '17px',
  height: '17px',
};

ProfileIcon;
