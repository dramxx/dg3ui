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
import { GraphChart } from './GraphChart';
import {
  GraphChartMockColors,
  GraphChartMockLinks,
  GraphChartMockNodes,
} from './GraphChartMockData';

export default {
  title: 'Charts|GraphChart',
  component: GraphChart,
  decorators: [withKnobs],
};

export const Default = () => (
  <BrowserRouter basename={'/'}>
    <StyledChartStoryWrapper height={number('Height', 400)}>
      <GraphChart
        type={'GraphChart'}
        data={{
          nodes: GraphChartMockNodes,
          links: GraphChartMockLinks,
        }}
        colors={GraphChartMockColors}
        title={text('Title', 'GraphChart')}
        legendShow={boolean('Show legend', true)}
        enableLegendHiding={boolean('Enable legend hiding', true)}
        enableTooltip={boolean('Enable tooltip', true)}
        enableDataSelection={boolean('Enable dataselection', false)}
        enableDataLabels={boolean('Enable DataLabels', false)}
        widgetStyle={''}
        overviewModule={'DEVI'}
        layout={select('Layout', ['none', 'circular'], 'none')}
        enableRoam={select(
          'Enable roam (move and scale)',
          // @ts-ignore
          [true, false, 'move', 'scale'],
          true
        )}
        showBorder={true}
      />
    </StyledChartStoryWrapper>
  </BrowserRouter>
);
