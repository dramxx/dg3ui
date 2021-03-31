import { IntlShape } from 'react-intl';

import { JsonPathMapping, MappingObject, TableColumn } from '@dg3/schema';
import { FilterChip } from './ContentFilter';
import { DetailProvider } from './Detail';
import { FilterTypeIndicatorKeys } from './FilterProps';
import { OrderDirectionType } from './Table';

export type ReportPage = {
  id: string;
  type: 'REPORT';
  name: string;
  config: string;
  author: string;
  module: string;
  description: string;
};

export interface JspOverviewDataConfig {
  language: 'jsonpath';
  query: string;
  rootPath: string;
  jsonPathMapping: JsonPathMapping;
  columns: TableColumn[];
  defaultOrdering?: DefaultOrdering;
}

export interface JqOverviewDataConfig {
  language: 'jq';
  query: string;
  transformation: string;
  columns: TableColumn[];
  defaultOrdering?: DefaultOrdering;
}

export type OverviewDataConfig = JspOverviewDataConfig | JqOverviewDataConfig;

export type OverviewPageType = {
  id: string;
  type: 'OVERVIEW';
  tableName: string;
  name: string;
  overview: OverviewDataConfig;
  onColumnFilter?: (
    columnId: string,
    value: MappingObject,
    intl: IntlShape
  ) => FilterChip;
  module: string;
  enableImport?: boolean;
  detail: DetailProvider;
  includedFilters: FilterTypeIndicatorKeys[];
};

export type PageConfig = ReportPage | OverviewPageType;

export type DefaultOrdering = {
  order: OrderDirectionType;
  key: string;
};
