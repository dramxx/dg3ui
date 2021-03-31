import jp from 'jsonpath/jsonpath.min';

import { GqlWidgetConfig } from '@dg3/schema';
import { jsonPathEntityExtractor } from '../jsonPath/jsonPathEntityExtractor';

export const createScatterSeriesChartData = (
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

      // TODO: convert onto proper type
      // @ts-ignore
      return {
        // @ts-ignore
        id: extractedData.seriesObject.id,
        // @ts-ignore
        data: extractedData.seriesData.map((item) => {
          return [
            item.x,
            item.y,
            item.value,
            item.label,
            // @ts-ignore
            extractedData.seriesObject.id,
          ];
        }),
      };
    }
  });
};
