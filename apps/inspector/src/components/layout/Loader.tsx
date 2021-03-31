import React from 'react';

import { StyledLinearLoader, StyledLoadingOverlay, StyledSlider } from './styles';

interface Props {
  show: boolean;
}

export default function Loader(props: Props) {
  return (
    <StyledLoadingOverlay show={props.show}>
      <StyledLinearLoader>
        <StyledSlider />
      </StyledLinearLoader>
    </StyledLoadingOverlay>
  );
}
