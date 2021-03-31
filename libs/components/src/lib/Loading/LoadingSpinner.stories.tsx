import { select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import styled from 'styled-components';

import { LoadingSpinner } from './LoadingSpinner';

const StyledWrapper = styled.div`
  border: 1px solid red;
`;

export default {
  component: LoadingSpinner,
  title: 'Loading Spinner',
  decorators: [withKnobs],
};

const sizes = {
  Small: 75,
  Right: 175,
  Large: 350,
};

export const Default = () => (
  <StyledWrapper
    style={{
      width: select('width', sizes, sizes.Right),
      height: select('height', sizes, sizes.Right),
    }}
  >
    <LoadingSpinner />
  </StyledWrapper>
);
