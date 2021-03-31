import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StyledChartStoryWrapper } from '../General/StyledChartStoryWrapper';
import { ScatterPlotChart } from './ScatterPlotChart';
import {
  ScatterPlotChartMockData,
  ScatterPlotMockColors,
} from './ScatterPlotChartMockData';

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('ScatterPlot', () => {
    const title = text('Title', 'Scatter Plot');
    const height = number('Height', 400);

    const enableDataSelection = boolean('Enable data selection', true);
    const legendShow = boolean('Show legend', true);
    const enableLegendHiding = boolean('Enable legend hiding', true);
    const axisXLabel = text('X label title', 'GDP');
    const axisYLabel = text('Y label title', 'Life expectancy');
    const valueLabel = text('Label of value', 'Value');
    const enableDataLabels = boolean('Enable data label', true);
    const enableTooltip = boolean('Enable tooltip', false);
    const enableXZoom = boolean('Enable zoom', true);

    return (
      <BrowserRouter basename={'/'}>
        <StyledChartStoryWrapper height={height}>
          <ScatterPlotChart
            type={'ScatterPlot'}
            data={ScatterPlotChartMockData}
            colors={ScatterPlotMockColors}
            title={title}
            legendShow={legendShow}
            enableLegendHiding={enableLegendHiding}
            enableDataSelection={enableDataSelection}
            enableDataLabels={enableDataLabels}
            enableTooltip={enableTooltip}
            axisXLabel={axisXLabel}
            axisYLabel={axisYLabel}
            valueLabel={valueLabel}
            enableXZoom={enableXZoom}
            overviewModule={'DEVI'}
            minSymbolSize={5}
            maxSymbolSize={50}
          />
        </StyledChartStoryWrapper>
      </BrowserRouter>
    );
  });
