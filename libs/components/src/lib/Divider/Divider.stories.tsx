import React from 'react';
import { Divider } from './Divider';

export default {
  component: Divider,
  title: 'Divider',
};

export const DividerNotCollapsed = () => <Divider collapsed={false} />;

export const DividerCollapsed = () => <Divider collapsed={true} />;
