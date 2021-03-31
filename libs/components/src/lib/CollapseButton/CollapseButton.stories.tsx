import React from 'react';
import { CollapseButton } from './CollapseButton';

export default {
  component: CollapseButton,
  title: 'CollapseButton',
};

export const uncollapsedButton = () => (
  <CollapseButton onCollapse={() => {}} collapsed={false} />
);

export const collapsedButton = () => (
  <CollapseButton onCollapse={() => {}} collapsed={true} />
);
