import { MappingObject } from '@dg3/schema';
import jp from 'jsonpath/jsonpath.min';
import { isJsonPathValue } from './isJsonPathValue';

/* this function returns all values parsed from JsonPath */
export const extractMultipleValues = (mapping: MappingObject, data: object) => {
  const key = isJsonPathValue(mapping.key)
    ? jp.query(data, mapping.key)[0]
    : mapping.key;

  const value = isJsonPathValue(mapping.value)
    ? jp.query(data, mapping.value)
    : mapping.value;

  return { [key]: value };
};
