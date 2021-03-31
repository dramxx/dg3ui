import React from 'react';
import {FilledUpArrowIcon} from './FilledUpArrowIcon';

export default {
  component: FilledUpArrowIcon,
  title: 'Icons/FilledUpArrowIcon',
};

export const defaultConfiguration = () => <FilledUpArrowIcon />;

export const customSize = () => (
  <FilledUpArrowIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <FilledUpArrowIcon color={'red'} />;

export const activeIcon = () => <FilledUpArrowIcon active={true} />;
