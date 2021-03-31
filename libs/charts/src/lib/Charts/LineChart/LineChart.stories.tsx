import {
  boolean,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StyledChartStoryWrapper } from '../General/StyledChartStoryWrapper';
import { LineChart } from './LineChart';
import { LineChartMockColors, LineChartMockData } from './LineChartMockData';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('LineChart', () => {
    const title = text('Title', 'Line Chart');
    const height = number('Height', 400);
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
    const axisXLabel = text('X label title', 'country');
    const axisYLabel = text('Y label title', 'food');
    const enableDataLabels = boolean('Enable data label', true);
    const enableTooltip = boolean('Enable tooltip', true);
    const enableLineTooltip = boolean('Enable line tooltip', true);
    const enableXZoom = boolean('Enable zoom', true);
    const enableArea = boolean('Enable area', false);

    return (
      <BrowserRouter basename={'/'}>
        <StyledChartStoryWrapper height={height}>
          <LineChart
            showBorder={true}
            type={'LineChart'}
            data={LineChartMockData}
            colors={LineChartMockColors}
            title={title}
            legendShow={legendShow}
            enableLegendHiding={enableLegendHiding}
            enableDataSelection={enableDataSelection}
            enableDataLabels={enableDataLabels}
            enableTooltip={enableTooltip}
            widgetStyle={widgetStyle}
            enableLineTooltip={enableLineTooltip}
            enableArea={enableArea}
            axisXLabel={axisXLabel}
            axisYLabel={axisYLabel}
            enableXZoom={enableXZoom}
            layoutDirection={layoutDirection}
            overviewModule={'DEVI'}
          />
        </StyledChartStoryWrapper>
      </BrowserRouter>
    );
  });
