import { mergeDeepRight } from 'ramda';

import { JsonPathEntityMappingType, isMappingObject } from '@dg3/schema';
import { extractSingleValue } from './extractSingleValue';
import { JsonPathEntityExtractorFunctionType } from './jsonPathEntityExtractor';

export const extractObjectEntity = (
  mappings: Array<JsonPathEntityMappingType>,
  data: object,
  onComplexMapping: JsonPathEntityExtractorFunctionType
) =>
  mappings.reduce((result, mapping) => {
    if (isMappingObject(mapping)) {
      return mergeDeepRight(result, extractSingleValue(mapping, data));
    } else {
      return mergeDeepRight(result, onComplexMapping([mapping], data));
    }
  }, {});
