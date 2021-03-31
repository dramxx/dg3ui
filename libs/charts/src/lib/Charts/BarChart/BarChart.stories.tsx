import {
  boolean,
  number,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StyledChartStoryWrapper } from '../General/StyledChartStoryWrapper';
import { BarChart } from './BarChart';
import { BarChartMockColors, BarChartMockData } from './BarChartMockData';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('BarChart', () => {
    const title = text('Title', 'Bar Chart');
    const height = number('Height', 510);
    const widgetStyle = select(
      'Widget style',
      {
        stacked: 'stacked',
        grouped: 'grouped',
      },
      'stacked'
    );
    const layoutDirection = select(
      'Layout Direction',
      {
        vertical: 'vertical',
        horizontal: 'horizontal',
      },
      'vertical'
    );

    const enableDataSelection = boolean('Enable data selection', true);
    const legendShow = boolean('Show legend', true);
    const enableLegendHiding = boolean('Enable legend hiding', true);
    const xAxis = object('X label title', { label: 'country' });
    const yAxis = object('Y label title', { label: 'food' });
    const enableDataLabels = boolean('Enable data label', true);
    const enableTooltip = boolean('Enable tooltip', true);
    const enableXZoom = boolean('Enable zoom', true);

    return (
      <BrowserRouter basename={'/'}>
        <StyledChartStoryWrapper height={height}>
          <BarChart
            showBorder={true}
            type={'BarChart'}
            data={BarChartMockData}
            colors={BarChartMockColors}
            title={title}
            legendShow={legendShow}
            enableLegendHiding={enableLegendHiding}
            enableDataSelection={enableDataSelection}
            enableDataLabels={enableDataLabels}
            enableTooltip={enableTooltip}
            widgetStyle={widgetStyle}
            xAxis={xAxis}
            yAxis={yAxis}
            enableXZoom={enableXZoom}
            layoutDirection={layoutDirection}
            overviewModule={'DEVI'}
          />
        </StyledChartStoryWrapper>
      </BrowserRouter>
    );
  });
