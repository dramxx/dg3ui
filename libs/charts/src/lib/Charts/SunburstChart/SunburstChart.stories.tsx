import {
  boolean,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { StyledChartStoryWrapper } from '../General/StyledChartStoryWrapper';
import { SunburstChart } from './SunburstChart';
import {
  SunburstChartMockColors,
  SunburstChartMockData,
  SunburstChartMockData1,
} from './SunburstChartMockData';

export default {
  title: 'Charts|SunburstChart',
  component: SunburstChart,
  decorators: [withKnobs],
};

export const UndividedData = () => (
  <BrowserRouter basename={'/'}>
    <StyledChartStoryWrapper height={number('height', 450)}>
      <SunburstChart
        type={'SunburstChart'}
        data={SunburstChartMockData1}
        colors={SunburstChartMockColors}
        title={text('Title', 'Sunburst Chart')}
        legendShow={boolean('Show legend', false)}
        enableLegendHiding={boolean('enable legend series hiding', false)}
        enableDataSelection={boolean('Enable data selection', false)}
        enableDataLabels={boolean('Enable data labels', true)}
        enableTooltip={boolean('Enable tooltip', false)}
        widgetStyle={''}
        showBorder={boolean('Show border', true)}
        enableLabelRotation={select(
          'Label rotation',
          [0, 'tangential', 'radial'],
          0
        )}
        overviewModule={'DEVI'}
      />
    </StyledChartStoryWrapper>
  </BrowserRouter>
);

export const PartialData = () => (
  <BrowserRouter basename={'/'}>
    <StyledChartStoryWrapper height={number('height', 450)}>
      <SunburstChart
        type={'SunburstChart'}
        data={SunburstChartMockData}
        colors={SunburstChartMockColors}
        title={text('Title', 'Sunburst Chart')}
        legendShow={boolean('Show legend', false)}
        enableLegendHiding={boolean('enable legend series hiding', false)}
        enableDataSelection={boolean('Enable data selection', false)}
        enableDataLabels={boolean('Enable data labels', true)}
        enableTooltip={boolean('Enable tooltip', false)}
        widgetStyle={''}
        showBorder={boolean('Show border', true)}
        enableLabelRotation={select(
          'Label rotation',
          [0, 'tangential', 'radial'],
          0
        )}
        overviewModule={'DEVI'}
      />
    </StyledChartStoryWrapper>
  </BrowserRouter>
);
