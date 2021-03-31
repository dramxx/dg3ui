import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

const StyledDiv = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`;

export default {
  component: Button,
  title: 'Button',
  decorators: [withKnobs],
};

export const ButtonDefault: React.FC = () => (
  <StyledDiv>
    <Button onClick={() => {}}>active</Button>
    <Button onClick={() => {}} disabled={true}>
      disabled
    </Button>
  </StyledDiv>
);

export const PrimaryButtonDefault: React.FC = () => (
  <StyledDiv>
    <PrimaryButton onClick={() => {}}>active</PrimaryButton>
    <PrimaryButton onClick={() => {}} disabled={true}>
      primary disabled
    </PrimaryButton>
  </StyledDiv>
);
export const SecondaryButtonDefault: React.FC = () => (
  <StyledDiv>
    <SecondaryButton onClick={() => {}}>active</SecondaryButton>
    <SecondaryButton onClick={() => {}} disabled={true}>
      secondary disabled
    </SecondaryButton>
  </StyledDiv>
);
