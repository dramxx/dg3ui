import React from 'react';
import { ExportedFilesIcon } from './ExportedFilesIcon';

export default {
  component: ExportedFilesIcon,
  title: 'Icons/ExportedFilesIcon',
};

export const defaultConfiguration = () => <ExportedFilesIcon />;

export const customSize = () => <ExportedFilesIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <ExportedFilesIcon active={true} />;
