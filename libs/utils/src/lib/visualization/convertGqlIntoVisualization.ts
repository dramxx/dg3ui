import { GqlWidgetConfig } from '@dg3/schema';
import { ChartType } from '@dg3/types';
import { createDetailCardsData } from './createDetailCardsData';
import { createGraphChartData } from './createGraphChartData';
import { createKpiChartData } from './createKpiChartData';
import { createLineSeriesChartData } from './createLineSeriesChartData';
import { createObjectSeriesChartData } from './createObjectSeriesChartData';
import { createScatterSeriesChartData } from './createScatterSeriesChartData';
import { createSunburstChartData } from './createSunburstChartData';

/* TODO: Idea maybe should be better to remove this switch and call convert
 ** function directly in visualization render chart with fixed type
 */
export const convertGraphqlIntoChartData = (
  type: ChartType,
  gql: GqlWidgetConfig,
  data: object
) => {
  switch (type) {
    case 'KpiChart':
    case 'JsonWidget':
      return createKpiChartData(gql, data);

    case 'DetailCards':
      return createDetailCardsData(gql, data);

    case 'BarChart':
    case 'PieChart':
    case 'TableWidget':
      return createObjectSeriesChartData(gql, data);

    case 'CalendarHeatMap':
    case 'MultiSeriesHeatMap':
    case 'LineChart':
      return createLineSeriesChartData(gql, data);

    case 'ScatterPlot':
      return createScatterSeriesChartData(gql, data);

    case 'GraphChart':
      return createGraphChartData(gql, data);

    case 'SunburstChart':
      return createSunburstChartData(gql, data);

    case 'MeterChart':
      break;
  }
};
