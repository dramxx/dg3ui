import jp from 'jsonpath/jsonpath.min';

import { GqlWidgetConfig } from '@dg3/schema';
import { jsonPathEntityExtractor } from '../jsonPath/jsonPathEntityExtractor';

export const createLineSeriesChartData = (
  gql: GqlWidgetConfig,
  data: object
) => {
  const sourceArray: Array<any> = jp.query(data, gql.rootPath);

  if (!sourceArray) {
    return [];
  }

  return sourceArray.map((item) => {
    if (item) {
      const extractedData = jsonPathEntityExtractor(gql.jsonPathMapping, item);

      return {
        // @ts-ignore
        id: extractedData.seriesObject.id,
        // @ts-ignore
        data: extractedData.seriesData,
      };
    }
  });
};
