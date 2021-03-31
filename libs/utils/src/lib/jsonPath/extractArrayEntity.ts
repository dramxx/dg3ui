import { mergeDeepRight } from 'ramda';

import { JsonPathEntityMappingType, isMappingObject } from '@dg3/schema';
import { extractMultipleValues } from './extractMultipleValues';
import { JsonPathEntityExtractorFunctionType } from './jsonPathEntityExtractor';

export const extractArrayEntity = (
  mappings: Array<JsonPathEntityMappingType>,
  data: object,
  onComplexMapping: JsonPathEntityExtractorFunctionType
) => {
  let extractedData = {};

  // result object for conversion
  mappings.forEach((mapping) => {
    if (isMappingObject(mapping)) {
      extractedData = mergeDeepRight(
        extractedData,
        extractMultipleValues(mapping, data)
      );
    } else {
      const extractedMapping = onComplexMapping([mapping], data);
      extractedData[mapping.key] = extractedMapping[mapping.key];
    }
  });

  //TODO below data distribution function could possibly break other charts that use type array

  // distribute data from extractedData format to needed format, f.e.: {id: ['abc', 'def']} => [{id: 'abc'}, {id: 'def'}]
  const distributedData = extractedData[mappings[0].key].map((item, index) => {
    const objectItem = {};
    Object.keys(extractedData).forEach(
      (key) =>
        (objectItem[key] =
          key === 'children' ? extractedData[key] : extractedData[key][index])
    );
    return objectItem;
  });

  return distributedData;
};
