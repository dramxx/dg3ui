import React from 'react';
import { FolderIcon } from './FolderIcon';

export default {
  component: FolderIcon,
  title: 'Icons/FolderIcon',
};

export const defaultConfiguration = () => <FolderIcon />;

export const customSize = () => <FolderIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <FolderIcon color={'red'} />;
