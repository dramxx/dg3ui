import { SimpleFilterDefinition } from '@dg3/types';

export const PLACE_SIMPLE_FILTER: SimpleFilterDefinition = {
  PLACE: {
    id: 'PLACE',
    attrs: [
      {
        id: 'kind',
      },
      {
        id: 'information:attribute.ean',
      },
      {
        id: 'information:attribute.sjz',
      },
      {
        id: 'information:attribute.anlage',
      },
      {
        id: 'information:attribute.house',
      },
      {
        id: 'information:attribute.tariftype',
      },
      {
        id: 'information:attribute.oj',
      },
      {
        id: 'information:attribute.city1',
      },
      {
        id: 'information:attribute.city2',
      },
      {
        id: 'information:attribute.street',
      },
      {
        id: 'information:attribute.house_num1',
      },
      {
        id: 'information:attribute.anlart',
      },
      {
        id: 'information:attribute.typ_mereni',
      },
      {
        id: 'information:attribute.mr_source',
      },
      {
        id: 'information:attribute.place_maintenance_status',
      },
      {
        id: 'information:attribute.devloc',
      },
    ],
  },
};
