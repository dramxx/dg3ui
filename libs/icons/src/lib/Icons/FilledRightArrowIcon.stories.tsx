import React from 'react';
import { FilledRightArrowIcon } from './FilledRightArrowIcon';
import { boolean, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Icons/FilledRightArrowIcon',
  component: FilledRightArrowIcon,
  decorators: [withKnobs],
};

export const Default = () => (
  <FilledRightArrowIcon active={boolean('active', false)} />
);

export const CustomColor = () => <FilledRightArrowIcon color="limegreen" />;
