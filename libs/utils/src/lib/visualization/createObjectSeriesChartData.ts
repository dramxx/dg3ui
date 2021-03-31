import jp from 'jsonpath/jsonpath.min';
import { isEmpty } from 'ramda';

import { GqlWidgetConfig } from '@dg3/schema';
import { jsonPathEntityExtractor } from '../jsonPath/jsonPathEntityExtractor';

export const createObjectSeriesChartData = (
  gql: GqlWidgetConfig,
  data: object
) => {
  const sourceArray: Array<any> = jp.query(data, gql.rootPath);

  // for each is broken with empty array
  if (!sourceArray || isEmpty(sourceArray)) {
    return [];
  }

  const resultArray = [];

  sourceArray.forEach((item) => {
    if (item) {
      const resultObject = jsonPathEntityExtractor(gql.jsonPathMapping, item);
      Object.keys(resultObject).map((key) => {
        resultArray.push(resultObject[key]);
      });
    }
  });

  return resultArray;
};
