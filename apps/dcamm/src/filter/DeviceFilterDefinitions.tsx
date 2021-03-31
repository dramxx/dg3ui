import { SimpleFilterDefinition } from '@dg3/types';

export const DEVICE_SIMPLE_FILTER: SimpleFilterDefinition = {
  DEVICE: {
    id: 'DEVICE',
    attrs: [
      {
        id: 'kind',
      },
      {
        id: 'information:attribute.ckod',
      },
      {
        id: 'information:attribute.ptb_skupina',
      },
      {
        id: 'information:attribute.matnr',
      },
      {
        id: 'information:attribute.model',
      },
      {
        id: 'information:attribute.vyrobce',
      },
      {
        id: 'information:attribute.konstrukcni_typ',
      },
      {
        id: 'information:attribute.device_lifecycle_phase',
      },
      {
        id: 'information:attribute.device_maintenance_status',
      },
      {
        id: 'information:attribute.shdo_role',
      },
      {
        id: 'information:attribute.hdo_group_id',
      },
    ],
  },
  MEDIATOR: {
    id: 'MEDIATOR',
    attrs: [
      {
        id: 'kind',
      },
      {
        id: 'information:attribute.ckod',
      },
      {
        id: 'information:attribute.matnr',
      },
      {
        id: 'information:attribute.model',
      },
      {
        id: 'information:attribute.vyrobce',
      },
    ],
  },
  DTS: {
    id: 'DTS',
    attrs: [
      {
        id: 'sjz_mediator_dts',
      },
      {
        id: 'information:attribute.sjz',
      },
    ],
  },
  INSTALLATION_PLACE: {
    id: 'INSTALLATION_PLACE',
    attrs: [
      {
        id: 'information:attribute.sjz',
      },
      {
        id: 'information:attribute.anlage',
      },
      {
        id: 'information:attribute.city1',
      },
      {
        id: 'phase',
      },
      {
        id: 'information:attribute.oj',
      },
      {
        id: 'hv_feeder_sjz',
      },
      {
        id: 'primary_substation_sjz',
      },
    ],
  },
};
