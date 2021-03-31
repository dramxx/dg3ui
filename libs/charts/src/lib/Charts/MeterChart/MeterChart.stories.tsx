import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StyledChartStoryWrapper } from '../General/StyledChartStoryWrapper';
import { MeterChart } from './MeterChart';
import { MeterChartMockData } from './MeterChartMockData';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('MeterChart', () => {
    const title = text('Title:', 'Meter Chart');
    const height = number('Height:', 460, {});
    const prefix = text('Prefix:', '');
    const suffix = text('Suffix:', '');

    const widgetStyle = select(
      'Widget style:',
      {
        arc: 'arc',
        progress: 'progress',
        metric: 'metric',
      },
      'progress'
    );

    const widgetDataFormat = select(
      'Widget data format:',
      {
        number: 'number',
        duration: 'duration',
        datetime: 'datetime',
      },
      'number'
    );

    let digits = -1;
    let timeZone = '';
    let timeFormat = '';
    let durationFormat = 'short';

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
          <MeterChart
            type={'MeterChart'}
            data={MeterChartMockData}
            title={title}
            widgetStyle={widgetStyle}
            prefix={prefix}
            suffix={suffix}
            kpiFormat={{
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
