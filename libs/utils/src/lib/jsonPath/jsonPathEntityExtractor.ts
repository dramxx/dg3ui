import { mergeDeepRight } from 'ramda';

import { JsonPathEntityMappingNodeType } from '@dg3/schema';
import { extractArrayEntity } from './extractArrayEntity';
import { extractObjectEntity } from './extractObjectEntity';

export type JsonPathEntityExtractorFunctionType = (
  jsonPathMapping: JsonPathEntityMappingNodeType[],
  data: object
) => object;

export const jsonPathEntityExtractor = (
  jsonPathMapping: JsonPathEntityMappingNodeType[],
  data: object
) => {
  let mappedValues = {};

  if (!data) {
    return mappedValues;
  }
  jsonPathMapping.forEach((mapping) => {
    switch (mapping.type) {
      case 'array':
        mappedValues = mergeDeepRight(mappedValues, {
          [mapping.key]: extractArrayEntity(
            mapping.values,
            data,
            jsonPathEntityExtractor
          ),
        });

        break;
      case 'object':
        mappedValues = mergeDeepRight(mappedValues, {
          [mapping.key]: extractObjectEntity(
            mapping.values,
            data,
            jsonPathEntityExtractor
          ),
        });
        break;
    }
  });

  return mappedValues;
};
