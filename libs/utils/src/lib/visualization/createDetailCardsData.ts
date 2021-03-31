import jp from 'jsonpath/jsonpath.min';

import { GqlWidgetConfig } from '@dg3/schema';
import { jsonPathEntityExtractor } from '../jsonPath/jsonPathEntityExtractor';

export const createDetailCardsData = (gql: GqlWidgetConfig, data: object) => {
  const sourceArray: Array<any> = jp.query(data, gql.rootPath);

  if (!sourceArray) {
    return {};
  }

  const resultObject = jsonPathEntityExtractor(
    gql.jsonPathMapping,
    sourceArray[0]
  );

  // TODO: how to get correct object from result || update expected KPI chart props
  return resultObject[Object.keys(resultObject)[0]];
};
