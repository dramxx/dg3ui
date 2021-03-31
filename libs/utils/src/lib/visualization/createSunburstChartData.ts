import jp from 'jsonpath/jsonpath.min';
import { isNil } from 'ramda';

import { GqlWidgetConfig } from '@dg3/schema';
import { jsonPathEntityExtractor } from '../jsonPath/jsonPathEntityExtractor';

export const createSunburstChartData = (gql: GqlWidgetConfig, data: object) => {
  const sourceArray: Array<any> = jp.query(data, gql.rootPath);

  if (!sourceArray) {
    return [];
  }

  return sourceArray
    .filter((item) => !isNil(item))
    .map((item) => jsonPathEntityExtractor(gql.jsonPathMapping, item))
    .map((item) => item[gql.jsonPathMapping[0].key][0]);
};
