import {
  Array,
  Lazy,
  Literal,
  Record,
  Runtype,
  Static,
  String,
  Union,
} from 'runtypes';

import { ObjectType } from '../runtypes';


export const JsonMappingTypesSchema = Union(
  Literal('object'),
  Literal('array')
);

/* TODO: Extension of this schema by optional attributes will require future review
 * but we need to first decide how to work with filters and other components
 */
export const MappingObjectSchema = ObjectType(
  {
    key: String,
    value: String,
  },
  {
    /* keyId is used for real GQL identification of mapping keys
     *  for example om from place table could be value of anlage or sjz in one column so
     *  keyId is used to decide what value should be used  by content filter.
     */
    keyId: String,
    /* intId is used for unique instance identification
     *   for example intId is required in table link for GUI that is able decide
     *   what kind instance detail based on its coreElemennt should be displayed
     */
    intId: String,
    /* valueId is used for internal value unique identification
     * for example this is used when GUI working with kind, kind values are represented in visualisations by
     * localized name for example. "LV Feeder", but GQL requires kind internal id
     * which is in this case "place.lv_feeder"
     */
    valueId: String,
  }
);

export type JsonMappingTypes = Static<typeof JsonMappingTypesSchema>;

export type MappingObject = Static<typeof MappingObjectSchema>;

export type JsonPathEntityMappingType =
  | MappingObject
  | JsonPathEntityMappingNodeType;

export type JsonPathEntityMappingNodeType = {
  key: string;
  type: JsonMappingTypes;
  values: JsonPathEntityMappingType[];
};

export const JsonPathEntityMapping: Runtype<JsonPathEntityMappingType> = Union(
  MappingObjectSchema,
  Record({
    key: String,
    type: JsonMappingTypesSchema,
    values: Array(Lazy(() => JsonPathEntityMapping)),
  })
);

// helps TS decide whether the object is MappingObject type or recursive JsonPathEntityMapping type
export const isMappingObject = (
  mapping: MappingObject | JsonPathEntityMappingType
): mapping is MappingObject => (mapping as MappingObject).value !== undefined;

export const JsonPathMappingSchema = Array(
  Record({
    key: String,
    type: JsonMappingTypesSchema,
    values: Array(JsonPathEntityMapping),
  })
);

export type JsonPathMapping = Static<typeof JsonPathMappingSchema>;
