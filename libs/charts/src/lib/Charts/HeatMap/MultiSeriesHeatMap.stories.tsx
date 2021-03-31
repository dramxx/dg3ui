import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import React, { useMemo } from 'react';

import { StyledChartStoryWrapper } from '../General/StyledChartStoryWrapper';
import { COLORS, generateMultipleSeries, parseDate } from './HeatMapMockData';
import { MultiSeriesHeatMap } from './MultiSeriesHeatMap';

export default {
  title: 'Charts|MultiSeriesHeatMap',
  components: MultiSeriesHeatMap,
  decorators: [withKnobs],
};

const useData = (series: string[], start: string, end: string) =>
  useMemo(
    () => generateMultipleSeries(series, parseDate(start), parseDate(end)),
    [series, start, end]
  );

export const Default = () => {
  const data = useData(
    ['PA_1209', 'SD_5432', 'AL_3434', 'PA_0923', 'LK_4443', 'PA_0922'],
    '2019-11-27',
    '2019-12-9'
  );
  return (
    <StyledChartStoryWrapper height={number('height', 460)}>
      <MultiSeriesHeatMap
        data={data}
        type="MultiSeriesHeatMap"
        overviewModule="DEVI"
        colors={COLORS}
        legendShow={boolean('Show legend', true)}
        enableLegendHiding={true}
        enableDataSelection={true}
        enableDataLabels={true}
        enableTooltip={boolean('Show tooltip', true)}
        widgetStyle=""
        showBorder={true}
      />
    </StyledChartStoryWrapper>
  );
};
