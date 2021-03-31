import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TabMenuItem } from './TabMenuItem';
import { TabMenuMockItems } from './TabMenuMockItems';

storiesOf('TabMenu/TabMenuItem', module)
  .add('Tab Menu Item Active', () => (
    <TabMenuItem
      {...TabMenuMockItems[0]}
      active={true}
      onClick={() => console.log('clicked')}
    />
  ))
  .add('Tab Menu Item', () => (
    <TabMenuItem
      {...TabMenuMockItems[0]}
      onClick={() => console.log('clicked')}
    />
  ));
