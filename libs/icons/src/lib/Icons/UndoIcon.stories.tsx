import React from 'react';
import {UndoIcon} from './UndoIcon';

export default {
  component: UndoIcon,
  title: 'Icons/UndoIcon',
};

export const defaultConfiguration = () => <UndoIcon />;

export const customSize = () => <UndoIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <UndoIcon color={'red'} />;
