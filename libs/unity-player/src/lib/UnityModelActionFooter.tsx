import * as React from 'react';
import styled from 'styled-components';
import { FullscreenIcon } from '@dg3/icons';

const StyledButton = styled.div`
  background-color: white;
  border-radius: 2px;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  margin-top: ${(props) => props.theme.spacing.small};
  margin-left: ${(props) => props.theme.spacing.small};
`;

interface Props {
  onFullscreen: () => void;
}

export const UnityModelActionFooter: React.FC<Props> = (props: Props) => {
  const { onFullscreen } = props;

  return (
    <StyledButton onClick={onFullscreen}>
      <FullscreenIcon />
    </StyledButton>
  );
};
