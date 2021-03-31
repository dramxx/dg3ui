import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import React, { useMemo } from 'react';

import { HeatMapData } from '@dg3/schema';
import { StyledChartStoryWrapper } from '../General/StyledChartStoryWrapper';
import { CalendarHeatMap } from './CalendarHeatMap';
import { generateSeries, parseDate } from './HeatMapMockData';

export default {
  title: 'Charts|CalendarHeatMap',
  component: CalendarHeatMap,
  decorators: [withKnobs],
};

const useData = (start: string, end: string): HeatMapData =>
  useMemo(() => generateSeries(parseDate(start), parseDate(end)), [start, end]);

export const SingleYear = () => {
  const data = useData('2020-02-03', '2020-11-25');
  return (
    <StyledChartStoryWrapper height={number('height', 460)}>
      <CalendarHeatMap
        colors={[]}
        data={data}
        enableDataLabels={true}
        enableDataSelection={true}
        enableLegendHiding={true}
        enableTooltip={boolean('Enable tooltip', true)}
        legendShow={boolean('Show legend', true)}
        overviewModule="DEVI"
        showBorder={true}
        type="CalendarHeatMap"
        widgetStyle=""
        title="2020"
        cellSize={number('Cell size', 20)}
      />
    </StyledChartStoryWrapper>
  );
};

export const MultipleYears = () => {
  const data = useData('2018-08-29', '2020-05-24');
  return (
    <StyledChartStoryWrapper height={number('height', 460)}>
      <CalendarHeatMap
        data={data}
        type="CalendarHeatMap"
        overviewModule="DEVI"
        colors={[]}
        legendShow={boolean('Show legend', true)}
        enableLegendHiding={true}
        enableDataSelection={true}
        enableDataLabels={true}
        enableTooltip={boolean('Enable tooltip', true)}
        widgetStyle=""
        showBorder={true}
        title="2018-2020"
        cellSize={number('Cell size', 20)}
      />
    </StyledChartStoryWrapper>
  );
};
