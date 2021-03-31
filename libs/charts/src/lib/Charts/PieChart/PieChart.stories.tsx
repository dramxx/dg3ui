import {
  boolean,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StyledChartStoryWrapper } from '../General/StyledChartStoryWrapper';
import { PieChart } from './PieChart';
import { PieChartMockColors, PieChartMockData } from './PieChartMockData';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('PieChart', () => {
    const title = text('Title', 'Pie Chart');
    const height = number('Height', 300, {});

    const legendShow = boolean('Show legend', true);
    const enableLegendHiding = boolean('enable legend series hiding', true);
    const enableDataLabels = boolean('Enable data labels', false);
    const enableRadialLabels = boolean('Enable radial labels', false);
    const enableDataSelection = boolean('Enable data selection', true);
    const enableTooltip = boolean('Enable tooltip', true);

    const widgetStyle = select(
      'Widget style',
      {
        donut: 'donut',
        pie: 'pie',
      },
      'pie'
    );

    return (
      <BrowserRouter basename={'/'}>
        <StyledChartStoryWrapper height={height}>
          <PieChart
            showBorder={true}
            type={'PieChart'}
            data={PieChartMockData}
            colors={PieChartMockColors}
            title={title}
            legendShow={legendShow}
            enableLegendHiding={enableLegendHiding}
            enableDataSelection={enableDataSelection}
            enableDataLabels={enableDataLabels}
            enableTooltip={enableTooltip}
            widgetStyle={widgetStyle}
            enableRadialLabels={enableRadialLabels}
            overviewModule={'DEVI'}
          />
        </StyledChartStoryWrapper>
      </BrowserRouter>
    );
  });
