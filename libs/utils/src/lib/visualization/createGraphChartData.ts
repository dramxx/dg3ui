import jp from 'jsonpath/jsonpath.min';

import { GqlWidgetConfig } from '@dg3/schema';
import { GraphChartLinkObject, GraphChartNodeObject } from '@dg3/types';
import { jsonPathEntityExtractor } from '../jsonPath/jsonPathEntityExtractor';

type VgaGraphData = {
  rootNode?: GraphChartNodeObject;
  cp_jun_links: Array<GraphChartLinkObject>;
  links: Array<GraphChartLinkObject>;
  nodes: Array<GraphChartNodeObject>;
};

export const createGraphChartData = (gql: GqlWidgetConfig, data: object) => {
  const sourceArray: Array<any> = jp.query(data, gql.rootPath);

  if (!sourceArray) {
    return {
      nodes: [],
      links: [],
    };
  }

  const extractedData = jsonPathEntityExtractor(
    gql.jsonPathMapping,
    sourceArray[0]
  ) as VgaGraphData;

  if (extractedData.rootNode) {
    extractedData.nodes.unshift(extractedData.rootNode);
  }

  extractedData.cp_jun_links.forEach((link) => {
    if (link.target) {
      extractedData.links.unshift({
        id: link.id + '_' + link.target,
        name: link.id + '_' + link.target,
        target: link.target,
        source: link.id,
      });
    }
  });

  return extractedData;
};
