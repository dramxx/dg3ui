import React from 'react';
import { DropdownButton } from './DropdownButton';

export default {
  component: DropdownButton,
  title: 'Dropdown/DropdownButton',
};

export const DropdownButtonClosed = () => (
  <DropdownButton
    type={'primary'}
    isPopoverOpen={false}
    label={'test'}
    onClick={() => console.log('test')}
  />
);

export const DropdownButtonOpen = () => (
  <DropdownButton
    type={'primary'}
    isPopoverOpen={true}
    label={'test'}
    onClick={() => console.log('test')}
  />
);
