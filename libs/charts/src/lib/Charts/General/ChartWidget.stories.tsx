import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ChartWidget } from './ChartWidget';

storiesOf('ChartWidget', module)
  .add('empty-chart', () => {
    return (
      <BrowserRouter basename={'/'}>
        <ChartWidget
          noData={false}
          chart={<div>Test</div>}
          title={'Empty chart'}
          enableDataSelection={true}
          showBorder={true}
          showFooter={true}
          overviewModule={'DEVI'}
        />
      </BrowserRouter>
    );
  })
  .add('empty-title', () => {
    return (
      <BrowserRouter basename={'/'}>
        <ChartWidget
          noData={false}
          chart={<div>Test</div>}
          title={''}
          enableDataSelection={true}
          showBorder={true}
          showFooter={true}
          overviewModule={'DEVI'}
        />
      </BrowserRouter>
    );
  });
