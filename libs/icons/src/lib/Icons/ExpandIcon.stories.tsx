import React from 'react';

import { ExpandIcon } from './ExpandIcon';

export default {
  component: ExpandIcon,
  title: 'Icons/ExpandIcon',
};

export const ExpandIconExpanded = () => <ExpandIcon expanded={true} />;

export const ExpandIconNotExpanded = () => <ExpandIcon expanded={false} />;

export const ExpandIconExpandedColored = () => (
  <ExpandIcon expanded={true} color={'red'} />
);

export const ExpandIconExpandedCustomemSize = () => (
  <ExpandIcon expanded={true} width={'24px'} height={'24px'} />
);
