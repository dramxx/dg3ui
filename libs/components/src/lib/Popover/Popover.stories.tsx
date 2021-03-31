import React from 'react';
import { Popover } from './Popover';
import { LogoutIcon } from '@dg3/icons';

export default {
  component: Popover,
  title: 'Popover',
};

export const PopoverLogic = () => (
  <Popover
    parent={
      <div style={{ padding: '1rem', width: '16rem' }}>
        opened popover
        <LogoutIcon/>
      </div>
    }
    show={true}
    onToggle={() => {
    }}
  >
    <div style={{ padding: '3rem' }}>Test popup content</div>
  </Popover>
);
