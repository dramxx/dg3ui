import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import jq from 'jq-web';
import { isNil } from 'ramda';
import * as React from 'react';

import {
  BarChart,
  CalendarHeatMap,
  GraphChart,
  KpiChart,
  LineChart,
  MeterChart,
  MultiSeriesHeatMap,
  PieChart,
  ScatterPlotChart,
  SunburstChart,
  TableWidget,
} from '@dg3/charts';
import { ErrorLabel, LoadingSpinner, withErrorBoundary } from '@dg3/components';
import { useFilter } from '@dg3/graphql';
import {
  AnyObject,
  BarChartSeriesObject,
  HeatMapData,
  HeatMapSeries,
  KpiChartObject,
  OutputVisualisationWidgetConfig,
  OutputVisualisationWidgetSchema,
  PieChartSeriesObject,
  VisualizationConfig,
} from '@dg3/schema';
import {
  BarChartProps,
  CalendarHeatMapProps,
  ColumnConf,
  GraphChartDataObject,
  GraphChartProps,
  KpiChartProps,
  LineChartProps,
  LineChartSeriesObject,
  MeterChartDataObject,
  MeterChartProps,
  MultiSeriesHeatMapProps,
  PieChartProps,
  ScatterPlotChartProps,
  ScatterPlotSeriesObject,
  SunburstChartProps,
  SunburstChartSeriesObject,
  TableDataObject,
  TableWidgetProps,
} from '@dg3/types';
import { convertGraphqlIntoChartData, noop } from '@dg3/utils';

const convertData = (data: object, config: VisualizationConfig) => {
  if (isNil(data)) {
    console.warn('received empty input data', config);
    return null;
  }
  switch (config.language) {
    case 'jsonpath': {
      const convertedData = convertGraphqlIntoChartData(
        config.type,
        config,
        data
      );
      return {
        ...config,
        data: convertedData,
      };
    }
    case 'jq': {
      const convertedData = AnyObject.check(
        jq.json(data, config.transformation)
      );

      return {
        ...config,
        ...convertedData,
      };
    }
  }
};

interface Props {
  config: VisualizationConfig;
}

export const VisualizationRender = withErrorBoundary((props: Props) => {
  const { config } = props;

  // TODO: check performance of use custom hooks for multiple queries composition vs multiple single queries
  const useFilterVariables = useFilter(config.includedFilters, noop);

  const { data, loading, error, refetch } = useQuery(gql(config.query), {
    variables: {
      ...useFilterVariables,
    },
    // TODO: investigate how to use cache for large filters
    fetchPolicy: 'cache-and-network',
  });

  if (error) return <ErrorLabel>{error.message}</ErrorLabel>;
  if (loading && !data) return <LoadingSpinner />;

  const convertedConfig: OutputVisualisationWidgetConfig = OutputVisualisationWidgetSchema.check(
    convertData(data, config)
  );

  switch (config.type) {
    case 'LineChart': {
      const lineProps = convertedConfig.chartProps as LineChartProps;
      const lineData = convertedConfig.data as Array<LineChartSeriesObject>;
      return (
        <LineChart
          {...lineProps}
          data={lineData}
          overviewModule={config.overviewModule}
          includedFilters={convertedConfig.includedFilters}
        />
      );
    }
    case 'PieChart': {
      const pieProps = convertedConfig.chartProps as PieChartProps;
      const pieData = convertedConfig.data as Array<PieChartSeriesObject>;
      return (
        <PieChart
          {...pieProps}
          data={pieData}
          overviewModule={config.overviewModule}
          includedFilters={convertedConfig.includedFilters}
        />
      );
    }
    case 'BarChart': {
      const barProps = convertedConfig.chartProps as BarChartProps;
      const barData = convertedConfig.data as Array<BarChartSeriesObject>;

      return (
        <BarChart
          {...barProps}
          data={barData}
          overviewModule={config.overviewModule}
          includedFilters={convertedConfig.includedFilters}
        />
      );
    }
    case 'KpiChart': {
      const kpiProps = convertedConfig.chartProps as KpiChartProps;
      const kpiData = convertedConfig.data as KpiChartObject;

      return (
        <KpiChart
          {...kpiProps}
          data={kpiData}
          overviewModule={config.overviewModule}
          includedFilters={convertedConfig.includedFilters}
        />
      );
    }
    case 'MeterChart': {
      const meterProps = convertedConfig.chartProps as MeterChartProps;
      const meterData = convertedConfig.data as MeterChartDataObject;
      return (
        <MeterChart
          {...meterProps}
          data={meterData}
          overviewModule={config.overviewModule}
          includedFilters={convertedConfig.includedFilters}
        />
      );
    }
    case 'TableWidget': {
      // @ts-ignore
      const columnsConf: Array<ColumnConf> = config.config.columns;
      const tableProps = convertedConfig.chartProps as TableWidgetProps;
      const tableData = convertedConfig.data as Array<TableDataObject>;

      return (
        <TableWidget
          {...tableProps}
          data={tableData}
          columnsConf={columnsConf}
          overviewModule={config.overviewModule}
          overviewId={config.overviewId}
          includedFilters={convertedConfig.includedFilters}
          refetchQuery={refetch}
        />
      );
    }
    case 'ScatterPlot': {
      const scatterProps = convertedConfig.chartProps as ScatterPlotChartProps;
      const scatterData = convertedConfig.data as Array<
        ScatterPlotSeriesObject
      >;
      return (
        <ScatterPlotChart
          {...scatterProps}
          data={scatterData}
          overviewModule={config.overviewModule}
          includedFilters={convertedConfig.includedFilters}
        />
      );
    }
    case 'GraphChart': {
      const graphProps = convertedConfig.chartProps as GraphChartProps;
      const graphData = convertedConfig.data as GraphChartDataObject;
      return (
        <GraphChart
          {...graphProps}
          data={graphData}
          overviewModule={config.overviewModule}
          includedFilters={convertedConfig.includedFilters}
        />
      );
    }
    case 'CalendarHeatMap': {
      const calHeatProps = convertedConfig.chartProps as CalendarHeatMapProps;
      const calHeatData = convertedConfig.data as HeatMapData;
      return (
        <CalendarHeatMap
          {...calHeatProps}
          data={calHeatData}
          overviewModule={config.overviewModule}
          includedFilters={convertedConfig.includedFilters}
        />
      );
    }

    case 'MultiSeriesHeatMap': {
      const multiHeatProps = convertedConfig.chartProps as MultiSeriesHeatMapProps;
      const multiHeatData = convertedConfig.data as HeatMapSeries;
      return (
        <MultiSeriesHeatMap
          {...multiHeatProps}
          data={multiHeatData}
          overviewModule={config.overviewModule}
          includedFilters={convertedConfig.includedFilters}
        />
      );
    }

    case 'SunburstChart': {
      const sunburstProps = convertedConfig.chartProps as SunburstChartProps;
      const sunburstData = convertedConfig.data as Array<
        SunburstChartSeriesObject
      >;
      return (
        <SunburstChart
          {...sunburstProps}
          data={sunburstData}
          overviewModule={config.overviewModule}
          includedFilters={convertedConfig.includedFilters}
        />
      );
    }
    default:
      return null;
  }
});
