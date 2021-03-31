import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { TableWidget } from './TableWidget';
import { TableWidgetMockData, jsonColumnsConf } from './TableWidgetMockData';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('TableWidget', () => {
    const title = text('Title', 'TableWidgetProps');

    return (
      <BrowserRouter basename={'/'}>
        <TableWidget
          title={title}
          height={'400px'}
          overviewModule={'DEVI'}
          overviewId={''}
          showBorder={true}
          data={TableWidgetMockData}
          rowsInTable={12}
          columnsConf={jsonColumnsConf}
          showExport={false}
          showPageSize={false}
          showPagination={false}
        />
      </BrowserRouter>
    );
  });
