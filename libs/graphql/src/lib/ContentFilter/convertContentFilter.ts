import { isEmpty } from 'ramda';

import {
  CONTENT_FILTER_TYPE,
  CORE_ELEMENT_KEYS,
  FILTER_CONDITIONS_KEYS,
  FilterChip,
  SimpleFilter,
} from '@dg3/types';
import { kindAttribute, nodeAttribute, nodeKind } from '@dg3/utils';
import {
  DEVICE_CONNECTED_PLACES_TRAVERSAL,
  DEVICE_INSTALLATION_PLACE_TRAVERSAL,
  DEVICE_MEDIATOR_DTS_TRAVERSAL,
  DEVICE_MEDIATOR_TRAVERSAL,
} from '../Traversals/Traversals';

export const getCoreElContentFilterByKey = (
  chips: Array<FilterChip>
): { AND: Array<object> } => {
  if (isEmpty(chips)) return { AND: [] };
  return {
    AND: chips.map((chip) => {
      switch (chip.type) {
        case CONTENT_FILTER_TYPE.SIMPLE:
          return simpleFilterToGraphql(JSON.parse(chip.value));
        case CONTENT_FILTER_TYPE.EXPERT:
          return JSON.parse(chip.value);
      }
    }),
  };
};

export const deviceAttrToGraphql = (filter: SimpleFilter): object => {
  switch (filter.attributeSelection) {
    case 'kind':
      return nodeKind(filter.values.map((item) => item.id));

    case 'information:attribute.ckod':
    case 'information:attribute.model':
    case 'information:attribute.device_lifecycle_phase':
    case 'information:attribute.device_maintenance_status':
    case 'information:attribute.shdo_role':
    case 'information:attribute.hdo_group_id':
      return nodeAttribute(
        filter.attributeSelection,
        filter.values.map((item) => item.id)
      );

    case 'information:attribute.matnr':
    case 'information:attribute.vyrobce':
    case 'information:attribute.konstrukcni_typ':
    case 'information:attribute.ptb_skupina':
      return kindAttribute(
        filter.attributeSelection,
        filter.values.map((item) => item.id)
      );

    default:
      return {};
  }
};

export const placeAttrToGraphql = (filter: SimpleFilter): object => {
  switch (filter.attributeSelection) {
    case 'kind':
      return nodeKind(filter.values.map((item) => item.id));

    case 'information:attribute.ean':
    case 'information:attribute.sjz':
    case 'information:attribute.anlage':
    case 'information:attribute.place_no':
    case 'information:attribute.house':
    case 'information:attribute.tariftype':
    case 'information:attribute.oj':
    case 'information:attribute.city1':
    case 'information:attribute.city2':
    case 'information:attribute.street':
    case 'information:attribute.house_num1':
    case 'information:attribute.anlart':
    case 'information:attribute.typ_mereni':
    case 'information:attribute.mr_source':
    case 'information:attribute.place_maintenance_status':
    case 'information:attribute.devloc':
      return nodeAttribute(
        filter.attributeSelection,
        filter.values.map((item) => item.id)
      );

    default:
      return {};
  }
};

export const informationAttrToGraphql = (filter: SimpleFilter): object => {
  switch (filter.attributeSelection) {
    case 'id':
      return {
        didFilter: { ids: [filter.values[0].id] },
      };
    case 'validity':
      return {
        validityFilter: {
          includeValid: filter.values[0].id ? 'VALID' : 'INVALID',
        },
      };
    case 'duplicity':
      return {
        validityFilter: {
          includeDuplicated: filter.values[0].id ? 'DUPLICATE' : 'UNIQUE',
        },
      };
    default:
      return {};
  }
};

export const dtsAttrToGraphql = (filter: SimpleFilter): object => {
  const value =
    filter.values.length === 1
      ? {
          valueRegex: filter.values[0].id,
        }
      : { valueExact: filter.values.map((item) => item.id) };
  switch (filter.attributeSelection) {
    case 'information:attribute.sjz':
      return {
        rels: {
          traversal: DEVICE_CONNECTED_PLACES_TRAVERSAL,
          toPlace: {
            node: {
              kindId: ['place:place.secondary_substation'],
              attributeValue: {
                did: filter.attributeSelection,
                ...value,
              },
            },
          },
        },
      };

    case 'sjz_mediator_dts':
      return {
        rels: {
          traversal: DEVICE_MEDIATOR_DTS_TRAVERSAL,
          toPlace: {
            node: {
              kindId: ['place.secondary_substation'],
              attributeValue: {
                did: 'information:attribute.sjz',
                ...value,
              },
            },
          },
        },
      };

    default:
      return {};
  }
};

export const consumptionPointAttrToGraphql = (filter: SimpleFilter): object => {
  switch (filter.attributeSelection) {
    case 'attribute.anlage':
    case 'attribute.city1':
      return nodeAttribute(
        filter.attributeSelection,
        filter.values.map((item) => item.id)
      );

    default:
      return {};
  }
};

const taskAttributeToGraphql = (filter: SimpleFilter): object => {
  switch (filter.attributeSelection) {
    case 'id':
      return {
        templateId: filter.values.map((item) => item.id),
      };
    case 'state':
      return {
        plan: {
          state: filter.values.map((item) => item.id),
        },
      };
    default:
      return {};
  }
};

export const simpleFilterToGraphql = (filter: SimpleFilter): object => {
  const filterValueGQL = simpleFilterValueToGraphql(filter);
  return filter.relationalOperator !== FILTER_CONDITIONS_KEYS.NOT_EQUAL
    ? filterValueGQL
    : { NOT: filterValueGQL };
};

const simpleFilterValueToGraphql = (filter: SimpleFilter): object => {
  switch (filter.entitySelection) {
    case CORE_ELEMENT_KEYS.PLACE:
      return placeAttrToGraphql(filter);

    case CORE_ELEMENT_KEYS.DEVICE:
      return deviceAttrToGraphql(filter);

    case CORE_ELEMENT_KEYS.INFORMATION:
      return informationAttrToGraphql(filter);

    case 'MEDIATOR':
      return {
        rels: {
          traversal: DEVICE_MEDIATOR_TRAVERSAL,
          toDevice: deviceAttrToGraphql(filter),
        },
      };

    case 'DTS':
      return dtsAttrToGraphql(filter);

    case 'INSTALLATION_PLACE':
      const value =
        filter.values.length === 1
          ? {
              valueRegex: filter.values[0].id,
            }
          : { valueExact: filter.values.map((item) => item.id) };
      return {
        rels: {
          traversal: DEVICE_INSTALLATION_PLACE_TRAVERSAL,
          toPlace: {
            node: {
              attributeValue: {
                did: filter.attributeSelection,
                ...value,
              },
            },
          },
        },
      };

    case CORE_ELEMENT_KEYS.TASK:
      return taskAttributeToGraphql(filter);

    default:
      return {};
  }
};
