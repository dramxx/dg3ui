import * as React from 'react';
import { IconProps } from './iconProps';

export type AppMenuItemProps = {
  title: React.ReactFragment;
  id: string;
  icon: React.ComponentType<IconProps>;
  path: string;
  disabled?: boolean;
};
