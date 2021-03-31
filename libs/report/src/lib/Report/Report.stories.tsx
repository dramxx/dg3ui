import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Report } from './Report';
import { deviReport } from '../mock/testReportDevi';
import { BrowserRouter } from 'react-router-dom';

storiesOf('Report', module).add('Report', () => {
  return (
    // report widget positioning is broken inside storybook
    <BrowserRouter basename={'/'}>
      <Report config={deviReport} />
    </BrowserRouter>
  );
});
