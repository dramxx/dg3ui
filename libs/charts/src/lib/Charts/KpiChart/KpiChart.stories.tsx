import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StyledChartStoryWrapper } from '../General/StyledChartStoryWrapper';
import KpiChart from './KpiChart';
import { KpiChartMockData } from './KpiChartMockData';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('Kpi', () => {
    const title = text('Title:', 'Kpi Chart');
    const height = number('Height:', 200);
    const width = number('Width:', 0);
    const prefix = text('Prefix:', '');
    const suffix = text('Suffix:', '');

    const widgetDataFormat = select(
      'Widget data format:',
      {
        number: 'number',
        datetime: 'datetime',
        duration: 'duration',
      },
      'number'
    );

    let digits = -1;
    let timeZone = '';
    let timeFormat = '';
    let durationFormat = 'default';

    switch (widgetDataFormat) {
      case 'number':
        digits = number('Pocet desatinnych miest: ', -1, {});
        break;
      case 'datetime':
        timeZone = text('Timezone:', 'Europe/Prague');
        timeFormat = text('Datetime format:', 'yyyy-MM-dd hh:mm:ss.ms');
        break;
      case 'duration':
        durationFormat = select(
          'Duration format:',
          {
            long: 'long',
            short: 'short',
            days: 'days',
            hours: 'hours',
            minutes: 'minutes',
            seconds: 'seconds',
            milliseconds: 'milliseconds',
          },
          'short'
        );
        break;
      default:
        digits = number('Pocet desatinnych miest: ', -1, {});
        break;
    }

    return (
      <BrowserRouter basename={'/'}>
        <StyledChartStoryWrapper height={height}>
          <KpiChart
            type={'KpiChart'}
            data={KpiChartMockData}
            title={title}
            width={width}
            height={height}
            widgetStyle={widgetDataFormat}
            prefix={prefix}
            suffix={suffix}
            format={{
              digits: digits,
              timeZone: timeZone,
              timeFormat: timeFormat,
              durationFormat: durationFormat,
            }}
            overviewModule={'DEVI'}
          />
        </StyledChartStoryWrapper>
      </BrowserRouter>
    );
  });
