import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TabMenu } from './TabMenu';
import { TabMenuMockItems } from './TabMenuMockItems';

storiesOf("TabMenu", module).add("TabMenu", () => (
  <TabMenu
    menuItems={TabMenuMockItems}
    activeItemId={"qui"}
    onActiveChange={(id: "test") => {}}
  />
));
