import { MappingObject } from '@dg3/schema';
import jp from 'jsonpath/jsonpath.min';
import { mergeDeepRight } from 'ramda';
import { isJsonPathValue } from './isJsonPathValue';

/* this function returns only first parsed value from JsonPath */
export const extractSingleValue = (mapping: MappingObject, data: object) => {
  let resultObject = {};

  // TODO make improvements here after usage is reviewed
  if (Object.keys(mapping).length === 2) {
    const keys = isJsonPathValue(mapping.key)
      ? jp.query(data, mapping.key)
      : [mapping.key];

    const values = isJsonPathValue(mapping.value)
      ? jp.query(data, mapping.value)
      : [mapping.value];

    keys.forEach((key, index) => {
      resultObject = mergeDeepRight(resultObject, { [key]: values[index] });
    });
  } else {
    const keys = isJsonPathValue(mapping.key)
      ? jp.query(data, mapping.key)
      : [mapping.key];

    const keysId = isJsonPathValue(mapping.keyId)
      ? jp.query(data, mapping.keyId)
      : [mapping.keyId];

    const intIds = isJsonPathValue(mapping.intId)
      ? jp.query(data, mapping.intId)
      : [mapping.intId];

    const valuesIds = isJsonPathValue(mapping.valueId)
      ? jp.query(data, mapping.valueId)
      : [mapping.valueId];

    const values = isJsonPathValue(mapping.value)
      ? jp.query(data, mapping.value)
      : [mapping.value];

    keys.forEach((key, index) => {
      resultObject = mergeDeepRight(resultObject, {
        [key]: {
          keyId: keysId[index],
          intId: intIds[index],
          valueId: valuesIds[index],
          value: values[index],
        },
      });
    });
  }

  return resultObject;
};
