import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppMenu } from './AppMenu';
import { menuItems } from './AppMenuMockItems';

storiesOf('AppMenu', module).add('AppMenu', () => {
  return (
    <BrowserRouter basename={'/'}>
      <AppMenu
        collapsed={false}
        menuItems={menuItems}
        onMenuCollapse={() => undefined}
        activeMenuItem={menuItems[0].id}
      />
    </BrowserRouter>
  );
});
