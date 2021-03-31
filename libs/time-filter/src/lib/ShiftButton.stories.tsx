import React from 'react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { ShiftButton } from './ShiftButton';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  height: 32px;
  display: flex;
`;

export default {
  title: 'TimeFilter|ShiftButton',
  component: ShiftButton,
  decorators: [withKnobs],
};

export const Left = () => (
  <StyledWrapper>
    <ShiftButton
      direction="left"
      onClick={() => {}}
      disabled={boolean('disabled', false)}
    />
  </StyledWrapper>
);

export const Right = () => (
  <StyledWrapper>
    <ShiftButton
      direction="right"
      onClick={() => {}}
      disabled={boolean('disabled', false)}
    />
  </StyledWrapper>
);
