import React from 'react';

import { ExportIcon } from './ExportIcon';

export default {
  component: ExportIcon,
  title: 'Icons/ExportIcon',
};

export const ExportIconExpanded = () => <ExportIcon />;

export const ExportIconExpandedColored = () => <ExportIcon color={'red'} />;

export const ExportIconCustomemSize = () => (
  <ExportIcon width={'24px'} height={'24px'} />
);
