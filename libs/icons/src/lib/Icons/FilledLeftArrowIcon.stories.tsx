import React from 'react';
import { FilledLeftArrowIcon } from './FilledLeftArrowIcon';
import { boolean, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Icons/FilledLeftArrowIcon',
  component: FilledLeftArrowIcon,
  decorators: [withKnobs],
};

export const Default = () => (
  <FilledLeftArrowIcon active={boolean('active', false)} />
);

export const CustomColor = () => <FilledLeftArrowIcon color="purple" />;
