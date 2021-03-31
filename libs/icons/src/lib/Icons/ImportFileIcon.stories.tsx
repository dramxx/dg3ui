import React from 'react';
import { ImportFileIcon } from './ImportFileIcon';

export default {
  component: ImportFileIcon,
  title: 'Icons/ImportFileIcon',
};

export const defaultConfiguration = () => <ImportFileIcon />;

export const customSize = () => <ImportFileIcon width={'2rem'} height={'2rem'} />;

export const customColor = () => <ImportFileIcon color={'red'} />;
